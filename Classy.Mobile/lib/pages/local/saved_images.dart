import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/scoped_models/photo_model.dart';
import 'package:classy_mobile/views/main_drawer.dart';
import 'package:classy_mobile/views/saved_images_list.dart';
import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';

class SavedImagesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(Strings.of(context).savedClassifies)),
      drawer: MainDrawer(CurrentPage.SavedClassifies),
      body: FutureBuilder<List<LocalImage>>(
        future: ScopedModel.of<PhotoModel>(context).getAllImages(),
        builder: (BuildContext context, AsyncSnapshot<List<LocalImage>> snapshot) {
          if (snapshot.hasData) {
            return SavedImagesList(
              images: snapshot.data.reversed.toList(),
            );
          }
          if (snapshot.hasError) {
            return Center(child: Text('error'));
          }
          return Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
