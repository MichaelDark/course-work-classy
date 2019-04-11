import 'package:flutter/material.dart';

class Strings {
  final BuildContext context;
  Strings.of(this.context);

  String get appName => 'Classy';
  String get classText => 'Class';

  String get donateForCoffee => 'Donate for Coffee';
  String get classifyPhotos => 'Classify Photos';
  String get savedClassifies => 'Saved Classifies';

  String get choosePhoto => 'Choose Photos';
  String get clickOnFloatingButton => 'Click on floating button to pick your images';
  String get pickImage => 'Pick Image';
  String get classify => 'Classify';
  String get pictureAlreadyPicked => 'Picture is already picked';

  String get classificationResults => 'Classification Results';
  String get noClasses => 'No Classes';
}
