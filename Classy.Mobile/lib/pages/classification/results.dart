import 'package:classy_mobile/pages/local/saved_images.dart';
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(Strings.of(context).classificationResults)),
      body: SavedImagesGrid(
        images: images,
        showRemoveIcon: false,
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
            onPressed: null,
          ),
          FlatButton(
            child: Text(Strings.of(context).goToSaved),
            onPressed: () {
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(
                  builder: (_) {
                    return SavedImagesPage(
                      newImages: images,
                    );
                  },
                ),
                (_) => false,
              );
            },
          ),
        ],
      ),
    );
  }
}
