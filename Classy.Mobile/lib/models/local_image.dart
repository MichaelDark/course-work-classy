import 'dart:io';

import 'package:jaguar_orm/jaguar_orm.dart';

part 'local_image.jorm.dart';

class LocalImage {
  @PrimaryKey()
  final String imagePath;

  @Column(isNullable: true)
  final String imageClass;

  @Column(isNullable: true)
  final DateTime saveDate;

  LocalImage({this.imagePath, this.imageClass, this.saveDate});

  LocalImage.copyWithClass(LocalImage image, String imageClass)
      : this(
          imagePath: image.imagePath,
          imageClass: imageClass,
          saveDate: image.saveDate,
        );

  LocalImage.copyWithDate(LocalImage image, DateTime saveDate)
      : this(
          imagePath: image.imagePath,
          imageClass: image.imageClass,
          saveDate: saveDate,
        );

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

@GenBean()
class LocalImageBean extends Bean<LocalImage> with _LocalImageBean {
  LocalImageBean(Adapter adapter) : super(adapter);

  @override
  String get tableName => 'localImages';
}
