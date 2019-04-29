import 'package:classy_mobile/pages/local/archive.dart';
import 'package:classy_mobile/pages/local/saved_images.dart';
import 'package:classy_mobile/repos/local_repo.dart';
import 'package:classy_mobile/views/saved_images_grid.dart';
import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';

class ResultsPage extends StatefulWidget {
  final List<LocalImage> images;

  const ResultsPage({@required this.images});

  @override
  _ResultsPageState createState() => _ResultsPageState();
}

class _ResultsPageState extends State<ResultsPage> {
  bool isExported = false;

  List<LocalImage> get images => widget.images;

  Future<List<LocalImage>> getSavedImages() async {
    List<LocalImage> savedImages = await LocalRepo().getAllImages();
    List<LocalImage> classifiedImages = [];

    for (LocalImage image in images) {
      for (LocalImage savedImage in savedImages) {
        if (image.imagePath == savedImage.imagePath) {
          classifiedImages.add(savedImage);
        }
      }
    }

    return classifiedImages;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(Strings.of(context).classificationResults)),
      body: FutureBuilder<List<LocalImage>>(
        future: getSavedImages(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return SavedImagesGrid.withActions(images: snapshot.data, newImages: []);
          }
          return Center(child: CircularProgressIndicator());
        },
      ),
      bottomNavigationBar: _buildBottomBar(),
    );
  }

  Widget _buildBottomBar() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey,
            blurRadius: 5,
          )
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          FlatButton(
            child: Text(isExported ? Strings.of(context).exported : Strings.of(context).export),
            onPressed: () async {
              List<LocalImage> archiveImages = await getSavedImages();
              Navigator.of(context).push(MaterialPageRoute(builder: (_) => ArchivePage(images: archiveImages)));
            },
          ),
          FlatButton(
            child: Text(Strings.of(context).goToSaved),
            onPressed: () {
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(builder: (_) => SavedImagesPage(newImages: images)),
                (_) => false,
              );
            },
          ),
        ],
      ),
    );
  }
}
