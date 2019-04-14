import base64
from io import BytesIO

import numpy as np
from PIL import Image
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse

# Create your views here.
from googleapiclient import discovery
from keras.applications import inception_v3

# SETTINGS

service = discovery.build('ml', 'v1')
service_name = 'projects/{}/models/{}'.format("gleaming-kit-237217", "classy_classifier")

IMAGE_SIZE = (224, 224)


# END SETTINGS

def process_and_classify(image_files, should_scale):
    try:
        images = _load_and_verify_multipart_images(image_files)
    except ValueError as e:
        response = HttpResponse(str(e))
        response.status_code = 422
        return response
    # images = (Image.open(image_file) for image_file in image_files)
    fnames = (img.filename for img in images)
    if should_scale:
        images = map(_scale_image, images)
    else:
        try:
            _verify_correct_images_size(images)
        except ValueError as e:
            image = next(filter(lambda img: img.filename == str(e), images))
            return HttpResponseBadRequest("Wrong image {} size: {} instead of {}".format(e, image.size, IMAGE_SIZE))
    image_strs = map(_image_to_b64, images)
    try:
        classes_proba = _send_inference_request(dict(zip(fnames, image_strs)))
    except AssertionError:
        return HttpResponseBadRequest("Too many files!")
    except RuntimeError:
        response = HttpResponse()
        response.status_code = 502
        return response
    classes = _infer_classes(classes_proba)
    return JsonResponse(classes)


def _verify_correct_images_size(images):
    for image in images:
        if image.size != IMAGE_SIZE:
            raise ValueError(image.filename)


def _scale_image(image):
    return image.resize((224, 224))


def _image_to_b64(image):
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    image_str = base64.b64encode(buffered.getvalue()).decode('ascii')
    return image_str


def _load_and_verify_multipart_images(image_files):
    images = []
    for image_file in image_files:
        image = Image.open(image_file)
        image.filename = image_file.name
        try:
            image.load()
        except Exception:
            raise ValueError(image_file.name)
        images.append(image)

    return images


def _send_inference_request(filesb64: dict):
    filenames = list(filesb64.keys())
    files = list(filesb64.values())

    assert sum(len(x) for x in files) < 1_570_000, "Too many images to classify!"

    instances = [{"b64": image_str} for image_str in files]
    response = service.projects().predict(
        name=service_name,
        body={'instances': instances}
    ).execute()

    if 'error' in response:
        raise RuntimeError(response['error'])

    preds = response['predictions']

    return {fname: pred['scores'] for fname, pred in zip(filenames, preds)}


def _infer_classes(files_classes_proba: dict):
    files_classes = {}
    for fname, classes_proba in files_classes_proba.items():
        proba_arr = np.expand_dims(np.array(classes_proba), 0)
        class_pred = inception_v3.decode_predictions(proba_arr, top=1)[0][0]  # 1 for batch, 1 for top-n
        class_name = class_pred[1]  # we drop id and probability
        class_name = _shorten_class_name(class_name)
        files_classes[fname] = class_name

    return files_classes


def _shorten_class_name(class_name):
    first_name = class_name.split(',')[0].split(' ')[-1]
    first_name = first_name[0].upper() + first_name[1:]
    final_name = first_name.replace('_', ' ')

    return final_name
