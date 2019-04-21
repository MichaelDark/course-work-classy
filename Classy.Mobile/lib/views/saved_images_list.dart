import 'package:classy_mobile/scoped_models/photo_model.dart';
import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/views/local_image_card.dart';
import 'package:scoped_model/scoped_model.dart';

class SavedImagesList extends StatefulWidget {
  final ScrollController controller;
  final List<LocalImage> images;
  final List<LocalImage> newImages;
  final bool showRemoveIcon;

  const SavedImagesList({
    this.controller,
    @required this.images,
    @required this.showRemoveIcon,
    this.newImages,
  });

  @override
  _SavedImagesListState createState() => _SavedImagesListState();
}

class _SavedImagesListState extends State<SavedImagesList> {
  void onRemove(LocalImage removedImage) {
    setState(() {
      widget.images.removeWhere((LocalImage image) => image.imagePath == removedImage.imagePath);
    });
    ScopedModel.of<PhotoModel>(context).removeLocalImage(removedImage.imagePath);
  }

  @override
  Widget build(BuildContext context) {
    return _buildList(widget.images, context);
  }

  Widget _buildList(List<LocalImage> images, BuildContext context) {
    if (images.isEmpty)
      return Center(
        child: Text(
          Strings.of(context).noSavedClassifiedImages,
          textAlign: TextAlign.center,
          style: TextStyle(
            color: Colors.grey,
            fontSize: 18,
            fontWeight: FontWeight.w500,
          ),
        ),
      );

    return ListView.builder(
      controller: widget.controller,
      itemCount: images.length,
      itemBuilder: (BuildContext context, int index) {
        LocalImage image = images[index];
        bool isNew = false;

        if (widget.newImages != null) {
          newCheckLoop:
          for (LocalImage newImage in widget.newImages) {
            if (image.imagePath == newImage.imagePath) {
              isNew = true;
              break newCheckLoop;
            }
          }
        }

        return LocalImageCard(
          image: image,
          isNew: isNew,
          onRemove: widget.showRemoveIcon ?? false ? onRemove : null,
        );
      },
    );
  }
}
