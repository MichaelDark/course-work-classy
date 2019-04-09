import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/views/image_card.dart';
import 'package:classy_mobile/views/main_drawer.dart';

class ChoosePhotosPage extends StatefulWidget {
  @override
  _ChoosePhotosPageState createState() => _ChoosePhotosPageState();
}

class _ChoosePhotosPageState extends State<ChoosePhotosPage> {
  List<LocalImage> _images = [];

  Future getImage() async {
    File image = await ImagePicker.pickImage(source: ImageSource.gallery);

    if (image != null) {
      setState(() {
        _images.add(LocalImage(imagePath: image.path));
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(Strings.of(context).choosePhoto)),
      drawer: MainDrawer(CurrentPage.ChoosePhotos),
      body: _buildList(context),
      floatingActionButton: FloatingActionButton(
        onPressed: getImage,
        tooltip: Strings.of(context).pickImage,
        child: Icon(Icons.add_photo_alternate),
      ),
    );
  }

  Widget _buildList(BuildContext context) {
    if (_images.isEmpty) return Center(child: Text(Strings.of(context).choosePhoto));

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
