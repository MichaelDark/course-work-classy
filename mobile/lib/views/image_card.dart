import 'package:classy_mobile/models/local_image.dart';
import 'package:flutter/material.dart';

class ImageCard extends StatelessWidget {
  final LocalImage image;

  const ImageCard({Key key, @required this.image}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(10),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.shade400,
              blurRadius: 5,
            ),
          ],
        ),
        child: SizedBox(
          height: 125,
          child: Row(
            mainAxisSize: MainAxisSize.max,
            children: <Widget>[
              Expanded(
                flex: 1,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.shade400,
                        blurRadius: 5,
                      ),
                    ],
                    image: DecorationImage(
                      image: FileImage(image.imageFile),
                      fit: BoxFit.cover,
                    ),
                  ),
                  padding: EdgeInsets.all(10),
                ),
              ),
              Expanded(
                flex: 2,
                child: Column(
                  children: <Widget>[
                    Padding(
                      padding: EdgeInsets.all(10),
                      child: Text(
                        image.imageName,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
