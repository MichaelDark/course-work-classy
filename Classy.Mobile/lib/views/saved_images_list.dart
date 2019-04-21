import 'package:classy_mobile/pages/local/reclassify.dart';
import 'package:classy_mobile/repos/local_repo.dart';
import 'package:classy_mobile/views/image_contracts.dart';
import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/views/local_image_card.dart';

class SavedImagesList extends StatefulWidget {
  final ScrollController controller;
  final List<LocalImage> images;
  final List<LocalImage> newImages;
  final bool showActions;

  const SavedImagesList.noActions({
    this.controller,
    @required this.images,
  })  : newImages = null,
        showActions = false;

  const SavedImagesList.withActions({
    this.controller,
    @required this.images,
    @required this.newImages,
  }) : showActions = true;

  @override
  _SavedImagesListState createState() => _SavedImagesListState();
}

class _SavedImagesListState extends State<SavedImagesList> implements ImageRemover, ImageReclassifier {
  @override
  void onRemove(LocalImage requestedImage) {
    setState(() {
      widget.images.removeWhere((LocalImage image) => image.imagePath == requestedImage.imagePath);
    });
    LocalRepo().removeLocalImage(requestedImage.imagePath);
  }

  @override
  void onReclassify(LocalImage requestedImage) async {
    String newClass =
        await Navigator.of(context).push(MaterialPageRoute(builder: (_) => ReclassifyPage(image: requestedImage)));
    print(newClass);
    if (mounted && newClass != null && newClass != requestedImage.imageClass) {
      setState(() {
        widget.images.removeWhere((LocalImage image) => image.imagePath == requestedImage.imagePath);
      });
      LocalRepo().changeLocalImageClass(requestedImage.imagePath, newClass);
    }
  }

  @override
  Widget build(BuildContext context) {
    return _buildList(widget.images, context);
  }

  Widget _buildList(List<LocalImage> images, BuildContext context) {
    if (images.isEmpty) {
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
    }

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
          imageRemover: widget.showActions ?? false ? this : null,
          imageReclassifier: widget.showActions ?? false ? this : null,
        );
      },
    );
  }
}
