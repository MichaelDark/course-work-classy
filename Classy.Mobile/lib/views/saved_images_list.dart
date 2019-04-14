import 'package:classy_mobile/scoped_models/photo_model.dart';
import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/views/local_image_card.dart';
import 'package:scoped_model/scoped_model.dart';

class SavedImagesList extends StatefulWidget {
  final List<LocalImage> images;

  const SavedImagesList({@required this.images});

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
    return FutureBuilder<List<LocalImage>>(
        future: ScopedModel.of<PhotoModel>(context).getAllImages(),
        builder: (BuildContext context, AsyncSnapshot<List<LocalImage>> snapshot) {
          if (snapshot.hasData) {
            return _buildList(snapshot.data.reversed.toList(), context);
          }
          if (snapshot.hasError) {
            return Center(child: Text('error'));
          }
          return Center(child: CircularProgressIndicator());
        });
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
      itemCount: images.length,
      itemBuilder: (BuildContext context, int index) {
        return LocalImageCard(
          image: images[index],
          onRemove: onRemove,
        );
      },
    );
  }
}
