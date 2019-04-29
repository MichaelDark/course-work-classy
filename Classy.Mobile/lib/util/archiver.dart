import 'dart:io';

import 'package:archive/archive_io.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:meta/meta.dart';
import 'package:path/path.dart' as path;

class Archiver {
  final String downloadsDirPath;
  final String documentsDirPath;
  final List<LocalImage> images;

  Archiver({
    @required this.images,
    @required this.downloadsDirPath,
    @required this.documentsDirPath,
  });

  Future<void> saveZip() async {
    final imagesMap = _mapImages();
    final imagesDir = await _createImagesDir();

    await _copyToDocuments(imagesDir, imagesMap);
    await _zipDir(imagesDir);
    await imagesDir.delete(recursive: true);
  }

  Map<String, List<LocalImage>> _mapImages() {
    Map<String, List<LocalImage>> imagesMap = {};

    for (LocalImage image in images) {
      String className = image.imageClass ?? 'No class';

      if (imagesMap[className] == null) {
        imagesMap[className] = [image];
      } else {
        imagesMap[className].add(image);
      }
    }

    return imagesMap;
  }

  Future<Directory> _createImagesDir() async {
    Directory appDocumentsDir = Directory(documentsDirPath);
    String imagesDirPath = path.join(appDocumentsDir.path, 'classy');
    return await Directory(imagesDirPath).create(recursive: true);
  }

  Future<void> _copyToDocuments(Directory imagesDir, Map<String, List<LocalImage>> imagesMap) async {
    String imagesDirPath = imagesDir.path;

    for (String imageClass in imagesMap.keys) {
      String classDirPath = path.join(imagesDirPath, imageClass);
      Directory classDir = await Directory(classDirPath).create(recursive: true);
      List<LocalImage> classImages = imagesMap[imageClass];
      for (LocalImage image in classImages) {
        String newFilePath = path.join(classDir.path, image.imageName);
        await image.file.copy(newFilePath);
      }
    }
  }

  Future<void> _zipDir(Directory imagesDir) async {
    Directory downloadsDirectory = Directory(downloadsDirPath);

    DateTime now = DateTime.now();
    String archiveTime =
        '${now.year}.${now.month}.${now.day}_${now.hour}_${now.minute}_${now.second}_${now.millisecond}';

    ZipFileEncoder()
      ..create(path.join(downloadsDirectory.path, 'classy_$archiveTime.zip'))
      ..addDirectory(imagesDir, includeDirName: true)
      ..close();
  }
}
