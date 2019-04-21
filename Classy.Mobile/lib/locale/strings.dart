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
  String get unknownClass => 'Unknown class';

  String get export => 'Export';
  String get save => 'Save';
  String get saveAndExport => 'Save & Export';
  String get goToSaved => 'Go to saved';

  String get exported => 'Exported';
  String get savedAndExported => 'Saved & Exported';
  String get saved => 'Saved';

  String get classifyingImages => 'Classifying images';

  String get noSavedClassifiedImages => 'No saved classified images :(';

  String get enterNewClass => 'Enter new class';

  String get changeClass => 'Change class';
  String get deleteClassification => 'Delete classification';

  String get noClassesClassifyMore => 'No classes! Classify more images and they will appear here!';
  String get newClassHint => 'Enter class name';
  String get createNewClass => 'Create new class';
  String get andSetToImage => 'and set to image';
}
