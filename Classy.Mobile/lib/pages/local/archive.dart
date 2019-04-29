import 'dart:isolate';

import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/util/archiver.dart';
import 'package:downloads_path_provider/downloads_path_provider.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';

class ArchivePage extends StatefulWidget {
  final List<LocalImage> images;

  const ArchivePage({
    @required this.images,
  });

  @override
  _ArchivePageState createState() => _ArchivePageState();
}

class IsolateEntity {
  final String downloadsDirPath;
  final String documentsDirPath;
  final SendPort port;
  final List<LocalImage> images;

  IsolateEntity({
    @required this.downloadsDirPath,
    @required this.documentsDirPath,
    @required this.port,
    @required this.images,
  });
}

class _ArchivePageState extends State<ArchivePage> {
  bool finished = false;

  void tryFinish() {
    if (finished) {
      if (mounted) {
        Navigator.of(context).pop();
      }
    }
  }

  Future<void> saveZip() async {
    tryFinish();

    ReceivePort receivePort = ReceivePort();
    IsolateEntity isolateEntity = IsolateEntity(
      downloadsDirPath: (await DownloadsPathProvider.downloadsDirectory).path,
      documentsDirPath: (await getApplicationDocumentsDirectory()).path,
      port: receivePort.sendPort,
      images: widget.images,
    );

    await Isolate.spawn(callback, isolateEntity);

    receivePort.listen((_) {
      finished = true;
      tryFinish();
    });
  }

  static void callback(IsolateEntity isolateEntity) async {
    await Archiver(
      downloadsDirPath: isolateEntity.downloadsDirPath,
      documentsDirPath: isolateEntity.documentsDirPath,
      images: isolateEntity.images,
    ).saveZip();
    isolateEntity.port.send('finished');
  }

  @override
  Widget build(BuildContext context) {
    saveZip();

    return Scaffold(
      body: WillPopScope(
        onWillPop: () => Future.value(false),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.all(10),
                child: Text(
                  Strings.of(context).waitUntilPicturesAreSaving,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.all(10),
                child: Text(
                  Strings.of(context).imagesArchiveWillBeSavedToDownloadsDirectory,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              CircularProgressIndicator(),
            ],
          ),
        ),
      ),
    );
  }
}
