import 'dart:io';

class LocalImage {
  final String imagePath;
  final String imageClass;

  LocalImage({this.imagePath, this.imageClass});

  LocalImage.copyWithClass(LocalImage image, String imageClass)
      : this(imagePath: image.imagePath, imageClass: imageClass);

  File get imageFile => File(imagePath);

  String get imageName {
    List<String> pathElements = imagePath.split('/');
    pathElements = pathElements.reversed.toList();
    return '${pathElements[0]}';
  }

  String get imagePathEnding {
    List<String> pathElements = imagePath.split('/');
    pathElements = pathElements.reversed.toList();
    return '${pathElements[2]}/${pathElements[1]}';
  }

  @override
  String toString() => '{ $imagePath, $imageClass }';
}
