import 'package:classy_mobile/models/local_image.dart';
import 'package:flutter/material.dart';

const double cardMargin = 10;
const double cardHeight = 125;
const double cardFullHeight = 125 + cardMargin * 2;

class LocalImageCard extends StatelessWidget {
  final LocalImage image;
  final void Function(LocalImage) onRemove;

  const LocalImageCard({
    @required this.image,
    this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    Widget imageClass = Container();

    if (image.imageClass != null) {
      imageClass = Container(
        margin: EdgeInsets.all(10),
        padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(50),
          border: Border.all(color: Colors.black),
        ),
        child: Text('${image.imageClass}'),
      );
    }

    return Container(
      margin: EdgeInsets.all(cardMargin),
      child: Container(
        height: cardHeight,
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
        child: ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Row(
            mainAxisSize: MainAxisSize.max,
            children: <Widget>[
              Expanded(
                flex: 1,
                child: LayoutBuilder(builder: (context, constraints) {
                  double width = constraints.maxWidth;

                  return Container(
                    decoration: BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.shade400,
                          blurRadius: 5,
                        ),
                      ],
                    ),
                    child: Image.file(
                      image.imageFile,
                      height: cardHeight,
                      width: width,
                      fit: BoxFit.cover,
                    ),
                  );
                }),
              ),
              Expanded(
                flex: 2,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Expanded(
                            child: Padding(
                              padding: EdgeInsets.all(10),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: <Widget>[
                                  Text(
                                    image.imageName,
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      fontSize: 15,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                  SizedBox(height: 4),
                                  Text(
                                    image.imagePathEnding,
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w300,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          imageClass,
                        ],
                      ),
                    ),
                    onRemove != null
                        ? IconButton(icon: Icon(Icons.clear), onPressed: () => onRemove(image))
                        : Container(),
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
