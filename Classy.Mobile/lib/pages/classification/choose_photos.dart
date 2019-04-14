import 'dart:io';
import 'dart:math';

import 'package:classy_mobile/pages/classification/results.dart';
import 'package:classy_mobile/pages/classification/send.dart';
import 'package:classy_mobile/views/local_image_card.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/views/main_drawer.dart';

List<String> classes = [
  'Bear',
  'Beach',
  'Cat',
  'Dog',
];

class ChoosePhotosPage extends StatefulWidget {
  @override
  _ChoosePhotosPageState createState() => _ChoosePhotosPageState();
}

class _ChoosePhotosPageState extends State<ChoosePhotosPage> {
  List<LocalImage> _images = [];

  Future<void> getImage() async {
    File imageFile = await ImagePicker.pickImage(source: ImageSource.gallery);
    LocalImage pickedImage = LocalImage(imagePath: imageFile.path);

    bool isPicked = _images.firstWhere(
          (LocalImage image) => image.imagePath == pickedImage.imagePath,
          orElse: () => null,
        ) !=
        null;
    if (isPicked) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return Dialog(
            backgroundColor: Colors.transparent,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Container(
                color: Colors.white,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Image.asset(
                      'assets/warning.png',
                      height: 200,
                      width: 150,
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: 40, horizontal: 10),
                      child: Text(
                        Strings.of(context).pictureAlreadyPicked,
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      );
      return;
    }
    if (pickedImage != null) {
      setState(() {
        _images.insert(0, pickedImage);
      });
    }
  }

  void onRemove(LocalImage removedImage) {
    setState(() {
      _images.removeWhere((LocalImage image) => image.imagePath == removedImage.imagePath);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(Strings.of(context).choosePhoto),
        actions: <Widget>[
          _images.isNotEmpty
              ? FlatButton(
                  child: Row(
                    children: <Widget>[
                      Text(
                        Strings.of(context).classify,
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                  onPressed: () {
                    Navigator.of(context).push(MaterialPageRoute(builder: (_) => SendPage(images: _images)));
                  },
                )
              : Container(),
        ],
      ),
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
    if (_images.isEmpty)
      return Center(
        child: Padding(
          padding: EdgeInsets.all(50),
          child: Text(
            Strings.of(context).clickOnFloatingButton,
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.grey,
              fontSize: 18,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      );

    return ListView.builder(
      itemCount: _images.length,
      itemBuilder: (BuildContext context, int index) {
        return LocalImageCard(
          image: _images[index],
          onRemove: onRemove,
        );
      },
    );
  }
}
