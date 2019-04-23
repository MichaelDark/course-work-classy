import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/pages/local/preview.dart';
import 'package:classy_mobile/views/image_contracts.dart';
import 'package:flutter/material.dart';

const double cardMargin = 10;
const double cardHeight = 125;
const double cardFullHeight = 125 + cardMargin * 2;

class LocalImageCard extends StatelessWidget {
  final LocalImage image;
  final bool isNew;
  final ImageRemover imageRemover;
  final ImageReclassifier imageReclassifier;

  const LocalImageCard({
    @required this.image,
    this.isNew,
    this.imageRemover,
    this.imageReclassifier,
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
        child: Text(
          '${image.imageClass}',
          maxLines: 2,
          textAlign: TextAlign.center,
        ),
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
              color: isNew ?? false ? Colors.green.shade800 : Colors.grey.shade400,
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
                child: _buildImage(context),
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
                            child: _buildImageMeta(),
                          ),
                          imageClass,
                        ],
                      ),
                    ),
                    _buildImageAction(context),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildImage(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context).push(MaterialPageRoute(builder: (_) => PreviewPage(image: image)));
      },
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
          child: Image(
            image: image.imageFile,
            filterQuality: FilterQuality.low,
            height: cardHeight,
            width: width,
            fit: BoxFit.cover,
          ),
        );
      }),
    );
  }

  Widget _buildImageMeta() {
    return Padding(
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
    );
  }

  Widget _buildImageAction(BuildContext context) {
    if (imageRemover != null && imageReclassifier != null) {
      return PopupMenuButton<void Function(LocalImage)>(
        onSelected: (func) {
          func(image);
        },
        itemBuilder: (BuildContext context) {
          return [
            PopupMenuItem(
              value: imageReclassifier.onReclassify,
              child: Padding(
                padding: EdgeInsets.all(5),
                child: Text(Strings.of(context).changeClass),
              ),
            ),
            PopupMenuItem(
              value: imageRemover.onRemove,
              child: Padding(
                padding: EdgeInsets.all(5),
                child: Text(Strings.of(context).deleteClassification),
              ),
            ),
          ];
        },
      );
    }
    if (imageRemover != null && imageReclassifier == null) {
      return IconButton(
        icon: Icon(Icons.clear),
        onPressed: () => imageRemover.onRemove(image),
      );
    }
    return Container();
  }
}
