import 'dart:io';

class LocalImage {
  final String imagePath;
  final String imageClass;

  LocalImage({this.imagePath, this.imageClass});

  File get imageFile => File(imagePath);

  String get imageName {
    List<String> pathElements = imagePath.split('/');
    pathElements = pathElements.reversed.toList();
    return '${pathElements[0]}';
  }
}
