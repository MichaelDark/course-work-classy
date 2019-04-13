from django.urls import path
from rest_framework_swagger.views import get_swagger_view

from classifier import views

schema_view = get_swagger_view(title='Classy classifier API')

urlpatterns = [
    # path('', schema_view, ''),
    path(r'test5', views.test5, name='test5'),
    path(r'classify_single', views.classify_single, name='inference_single'),
    path(r'classify_multiple', views.classify_multiple, name='inference_multiple'),
    path(r'get_image_size', views.get_image_size, name='get_size'),
]
