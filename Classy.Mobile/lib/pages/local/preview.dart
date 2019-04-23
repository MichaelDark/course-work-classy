import 'package:flutter/material.dart';
import 'package:photo_view/photo_view.dart';
import 'package:classy_mobile/models/local_image.dart';

class PreviewPage extends StatelessWidget {
  final LocalImage image;

  const PreviewPage({@required this.image});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: <Widget>[
            Container(
              child: PhotoView(
                imageProvider: FileImage(image.file),
              ),
            ),
            Positioned(
              top: 0,
              left: 0,
              child: Padding(
                padding: EdgeInsets.all(10),
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey,
                        blurRadius: 5,
                      )
                    ],
                  ),
                  child: IconButton(
                    icon: Icon(Icons.keyboard_backspace),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
