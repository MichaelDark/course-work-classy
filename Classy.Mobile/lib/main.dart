import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/pages/classification/choose_photos.dart';
import 'package:classy_mobile/repos/local_repo.dart';
import 'package:flutter/material.dart';

void main() async {
  final LocalRepo repo = LocalRepo();
  await repo.initialize();

  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp();

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: Strings.of(context).appName,
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
        scaffoldBackgroundColor: Colors.white,
      ),
      home: ChoosePhotosPage(),
    );
  }
}
