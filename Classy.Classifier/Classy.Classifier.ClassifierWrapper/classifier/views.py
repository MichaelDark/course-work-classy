from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from rest_framework.decorators import api_view

from classifier.logic import process_and_classify, IMAGE_SIZE


@api_view(['GET'])
def test5(request):
    """
    # Endpoint description:

    ## Params:

    `arg0::int`

    ## Returns:
    `arg0 + 5::int`
    """
    return HttpResponse(int(request.GET['arg0']) + 5)


@api_view(['GET'])
def get_image_size(request):
    """
    # Endpoint description:

    ## Params:

    ## Returns:
    JSON containing image spatial characteristics. Only important for `classify_multiple` with `scale == false(0)`.
    **content-type**: application/json
    **example**:
    ```
    {
        "width": 224,
        "height": 224,
        "channels": 3
    }
    ```
    """
    return JsonResponse({
        "width": IMAGE_SIZE[0],
        "height": IMAGE_SIZE[1],
        "channels": 3
    })


@api_view(['POST'])
def classify_multiple(request):
    """
    # Endpoint description:

    ## Params:
    `scale::Union[bool, int]`: Should be either `true/1` or `false/0` (case-insensitive). If `true/1`,
    indicates that the images sent for classification are already of needed size and server should not resize them.

    ## Request Body:
    Receives multiple image files in form-data. Keys are not important.
    **content-type**: multipart/form-data

    ## Returns:
    JSON containing a class predicted for each image.
    **content-type**: application/json
    **special status codes**:
    - 422: Uprocessable entity, image file is corrupted/cannot be read. Returns the filename of the image file.

    **example**:
    ```
    {
        "cat_picture.jpg": "Cat',
        "bicycle_picture.jpg": "Mountain bike"
    }
    ```
    """
    scale_arg = request.GET.get('scale', "True").lower()
    if scale_arg in ("true", "1"):
        should_scale = True
    elif scale_arg in ("false", "0"):
        should_scale = False
    else:
        return HttpResponseBadRequest("scale should be one of [true, 1, false, 0] (case-insensitive)\n"
                                      + "Yours was {}".format(scale_arg))

    image_files = request.FILES.values()
    response = process_and_classify(image_files, should_scale)

    return response


@api_view(['POST'])
def classify_single(request):
    """
    # Endpoint description:

    ## Params:

    ## Request Body:
    Receives a single image file in form-data with the key `"image"`.
    **content-type**: multipart/form-data

    ## Returns:
    JSON containing a class predicted for the image.
    **content-type**: application/json
    **special status codes**:
    - 422: Uprocessable entity, image file is corrupted/cannot be read. Returns the filename of the image file.

    **example**:
    ```
    {
        "dog_picture.jpg": "Dog',
    }
    ```
    """
    image_file = request.FILES.get('image', None)
    if image_file is None:
        return HttpResponseBadRequest("<image> field not found in form.")

    response = process_and_classify([image_file], True)

    return response
