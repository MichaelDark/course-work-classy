import 'package:classy_mobile/api/api_client.dart';
import 'package:classy_mobile/pages/classification/results.dart';
import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';

const double previewImagesCount = 3;
const double previewMargin = 10;

class SendPage extends StatefulWidget {
  final List<LocalImage> images;

  const SendPage({@required this.images});

  @override
  _SendPageState createState() => _SendPageState();
}

class _SendPageState extends State<SendPage> {
  bool isSaved = false;
  bool isExported = false;
  int proceedCount = 0;
  List<LocalImage> classifiedImages = [];

  List<LocalImage> get images => widget.images;
  int get imagesCount => images.length;

  @override
  void initState() {
    super.initState();
    sendImages();
  }

  Future<void> sendImages() async {
    for (LocalImage rawImage in images) {
      LocalImage classifiedImage;
      try {
        classifiedImage = await sendImage(rawImage);
      } catch (_) {}

      if (mounted) {
        setState(() {
          proceedCount++;
          if (classifiedImage != null) {
            classifiedImages.add(classifiedImage);
          } else {
            classifiedImages.add(rawImage);
          }
        });
      } else {
        break;
      }
    }
    if (mounted) {
      Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => ResultsPage(images: classifiedImages)));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(Strings.of(context).classificationResults)),
      body: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Container(
                  margin: EdgeInsets.all(15),
                  child: _buildProgress(),
                ),
                Container(
                  margin: EdgeInsets.all(15),
                  child: Text(
                    Strings.of(context).classifyingImages,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                Container(
                  margin: EdgeInsets.all(15),
                  child: Text(
                    '$proceedCount / $imagesCount',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.grey,
                      fontSize: 22,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProgress() {
    return Stack(
      alignment: Alignment.center,
      children: <Widget>[
        Theme(
          data: Theme.of(context).copyWith(accentColor: Colors.grey.shade200),
          child: SizedBox(
            height: 100,
            width: 100,
            child: CircularProgressIndicator(
              strokeWidth: 15,
            ),
          ),
        ),
        SizedBox(
          height: 100,
          width: 100,
          child: CircularProgressIndicator(
            value: proceedCount / imagesCount,
            strokeWidth: 15,
          ),
        ),
      ],
    );
  }
}
