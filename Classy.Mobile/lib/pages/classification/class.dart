import 'package:classy_mobile/views/saved_images_list.dart';
import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';

class ClassPage extends StatefulWidget {
  final String imageClass;
  final List<LocalImage> images;
  final List<LocalImage> newImages;
  final bool showRemoveIcon;

  const ClassPage({
    @required this.imageClass,
    @required this.images,
    @required this.showRemoveIcon,
    this.newImages,
  });

  @override
  _ClassPageState createState() => _ClassPageState();
}

class _ClassPageState extends State<ClassPage> {
  @override
  Widget build(BuildContext context) {
    String className = widget.imageClass ?? Strings.of(context).unknownClass;

    return Scaffold(
      appBar: AppBar(title: Text('${Strings.of(context).classText}: $className')),
      body: SavedImagesList(
        images: widget.images,
        newImages: widget.newImages,
        showRemoveIcon: widget.showRemoveIcon,
      ),
    );
  }
}
