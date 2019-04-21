import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/pages/classification/class.dart';
import 'package:flutter/material.dart';

const double previewImagesCount = 3;
const double previewMargin = 10;

class SavedImagesGrid extends StatelessWidget {
  final ScrollController controller;
  final List<LocalImage> images;
  final List<LocalImage> newImages;
  final bool showActions;

  const SavedImagesGrid.noActions({
    this.controller,
    @required this.images,
  })  : newImages = null,
        showActions = false;

  const SavedImagesGrid.withActions({
    this.controller,
    @required this.images,
    @required this.newImages,
  }) : showActions = true;

  List<String> mapClasses() {
    return images.fold(<String>[], (List<String> classes, LocalImage currentImage) {
      if (classes.firstWhere(
            (String imageClass) => imageClass == currentImage.imageClass,
            orElse: () => null,
          ) ==
          null) {
        classes.add(currentImage.imageClass);
      }
      return classes;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    List<String> classes = mapClasses();

    if (classes.isEmpty) {
      return Center(
        child: Padding(
          padding: EdgeInsets.all(40),
          child: Text(
            Strings.of(context).noClassesClassifyMore,
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.grey,
              fontSize: 18,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      );
    }

    return GridView.builder(
      controller: controller,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, childAspectRatio: 1),
      itemCount: classes.length,
      itemBuilder: (BuildContext context, int index) {
        bool hasNew = false;

        String currentClass = classes[index];
        List<LocalImage> classImages = images.where((LocalImage image) => image.imageClass == currentClass).toList();

        if (newImages != null) {
          newCheckLoop:
          for (LocalImage image in classImages) {
            for (LocalImage newImage in newImages) {
              if (image.imagePath == newImage.imagePath) {
                hasNew = true;
                break newCheckLoop;
              }
            }
          }
        }

        List<LocalImage> previews = classImages.take(3).toList();
        List<Positioned> imageWidgets = [];
        for (int i = 0; i < previews.length; i++) {
          double bigMargin = 5 + previews.length * previewMargin - i * previewMargin;
          double smallMargin = 5 + previewMargin + i * previewMargin;

          imageWidgets.add(
            Positioned(
              top: bigMargin,
              right: bigMargin,
              bottom: smallMargin,
              left: smallMargin,
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey,
                      blurRadius: 5,
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: Image.file(
                    previews[i].imageFile,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ),
          );
        }

        return GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: () {
            Navigator.of(context).push(MaterialPageRoute(builder: (_) {
              return ClassPage(
                imageClass: currentClass,
                images: classImages,
                newImages: newImages,
                showActions: showActions,
              );
            }));
          },
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Container(
              margin: EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: currentClass != null ? Colors.white : Colors.blueGrey.shade50,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [
                  BoxShadow(
                    color: hasNew ? Colors.green.shade800 : Colors.grey.shade400,
                    blurRadius: 5,
                  ),
                ],
              ),
              child: Column(
                children: <Widget>[
                  Expanded(
                    child: Stack(
                      children: imageWidgets.reversed.toList(),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.all(5),
                    child: Text(
                      currentClass ?? Strings.of(context).unknownClass,
                      maxLines: 2,
                      textAlign: TextAlign.center,
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
