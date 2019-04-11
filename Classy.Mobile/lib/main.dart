import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/pages/classification/choose_photos.dart';
import 'package:classy_mobile/scoped_models/photo_model.dart';
import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';

void main() async {
  final LocalRepo repo = LocalRepo();
  await repo.initialize();
  final PhotoModel photoModel = PhotoModel(repo);

  runApp(MyApp(photoModel));
}

class MyApp extends StatefulWidget {
  final PhotoModel photoModel;

  const MyApp(this.photoModel);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return ScopedModel<PhotoModel>(
      model: widget.photoModel,
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: Strings.of(context).appName,
        theme: ThemeData(
          primarySwatch: Colors.blue,
          scaffoldBackgroundColor: Colors.white,
        ),
        home: ChoosePhotosPage(),
      ),
    );
  }
}
