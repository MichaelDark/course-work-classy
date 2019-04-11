import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/pages/classification/choose_photos.dart';
import 'package:classy_mobile/scoped_models/photo_model.dart';
import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final PhotoModel photoModel = PhotoModel();

  @override
  Widget build(BuildContext context) {
    return ScopedModel<PhotoModel>(
      model: photoModel,
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: Strings.of(context).appName,
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: ChoosePhotosPage(),
      ),
    );
  }
}
