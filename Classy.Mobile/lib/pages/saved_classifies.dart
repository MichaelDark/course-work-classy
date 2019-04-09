import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/views/image_card.dart';
import 'package:classy_mobile/views/main_drawer.dart';

class SavedClassifiesPage extends StatefulWidget {
  @override
  _SavedClassifiesPageState createState() => _SavedClassifiesPageState();
}

class _SavedClassifiesPageState extends State<SavedClassifiesPage> {
  List<LocalImage> _images = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(Strings.of(context).savedClassifies)),
      drawer: MainDrawer(CurrentPage.SavedClassifies),
      body: _buildList(context),
    );
  }

  Widget _buildList(BuildContext context) {
    if (_images.isEmpty) return Center(child: Text(Strings.of(context).savedClassifies));

    return ListView.builder(
      itemCount: _images.length,
      itemBuilder: (BuildContext context, int index) {
        return ImageCard(
          image: _images[index],
        );
      },
    );
  }
}
