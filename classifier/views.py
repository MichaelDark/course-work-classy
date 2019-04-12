import base64
from io import BytesIO

import numpy as np
from PIL import Image
from django.conf.urls import url
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render

# Create your views here.
from django.urls import include, path
from django.views.decorators.http import require_http_methods
from googleapiclient import discovery
from keras.applications import inception_v3
from rest_framework.decorators import api_view

service = discovery.build('ml', 'v1')
name = 'projects/{}/models/{}'.format("gleaming-kit-237217", "classy_classifier")


@api_view(['GET'])
def test5(request):
    """
    arg0 -- A first parameter, int
    :param: arg0 - nigga
    """
    return HttpResponse(int(request.GET['arg0']) + 5)


@api_view(['POST'])
def classify_single(request):
    image_file = request.FILES.get('image', None)
    if image_file is None:
        return HttpResponseBadRequest("<image> field not found in form.")
    img = Image.open(image_file)
    try:
        img.verify()
    except Exception:
        response = HttpResponse(image_file.name)
        response.status_code = 422
        return response
    else:
        # need to reopen after .verify() (according to PIL)
        img = Image.open(image_file)

    img = img.resize((224, 224))
    buffered = BytesIO()
    img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode('ascii')
    try:
        classes_proba = _send_inference_request({image_file.name: img_str})
    except (RuntimeError, AssertionError):
        response = HttpResponse()
        response.status_code = 502
        return response
    classes = _infer_classes(classes_proba)
    return JsonResponse(classes)


def _send_inference_request(filesb64: dict):
    filenames = list(filesb64.keys())
    files = list(filesb64.values())

    assert sum(len(x) for x in files) < 1_570_000, "Too many images to classify!"

    instances = [{"b64": img_str} for img_str in files]
    response = service.projects().predict(
        name=name,
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
    return class_name.split(',')[0].split(' ')[-1]
