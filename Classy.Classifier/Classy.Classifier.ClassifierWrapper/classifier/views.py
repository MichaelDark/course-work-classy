from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from rest_framework.decorators import api_view

from classifier.logic import _process_and_classify, IMAGE_SIZE


@api_view(['GET'])
def test5(request):
    """
    arg0 -- A first parameter, int
    :param: arg0 - nigga
    """
    return HttpResponse(int(request.GET['arg0']) + 5)


@api_view(['GET'])
def get_image_size(request):
    return JsonResponse({
        "width": IMAGE_SIZE[0],
        "height": IMAGE_SIZE[1],
        "channels": 3
    })


@api_view(['POST'])
def classify_multiple(request):
    scale_arg = request.GET.get('scale', "True").lower()
    if scale_arg in ("true", "1"):
        should_scale = True
    elif scale_arg in ("false", "0"):
        should_scale = False
    else:
        return HttpResponseBadRequest("scale should be one of [true, 1, false, 0] (case-insensitive)\n"
                                      + "Yours was {}".format(scale_arg))

    image_files = request.FILES.values()
    response = _process_and_classify(image_files, should_scale)

    return response


@api_view(['POST'])
def classify_single(request):
    image_file = request.FILES.get('image', None)
    if image_file is None:
        return HttpResponseBadRequest("<image> field not found in form.")

    response = _process_and_classify([image_file], True)

    return response
