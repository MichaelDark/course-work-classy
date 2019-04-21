import 'package:classy_mobile/views/saved_images_list.dart';
import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';

class ClassPage extends StatelessWidget {
  final String imageClass;
  final List<LocalImage> images;
  final List<LocalImage> newImages;
  final bool showActions;

  const ClassPage({
    @required this.imageClass,
    @required this.images,
    @required this.showActions,
    this.newImages,
  });

  @override
  Widget build(BuildContext context) {
    String className = imageClass ?? Strings.of(context).unknownClass;

    return Scaffold(
      appBar: AppBar(title: Text('${Strings.of(context).classText}: $className')),
      body: showActions
          ? SavedImagesList.withActions(images: images, newImages: newImages)
          : SavedImagesList.noActions(images: images),
    );
  }
}
