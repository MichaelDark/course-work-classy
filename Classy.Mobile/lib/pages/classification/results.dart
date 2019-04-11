import 'package:classy_mobile/pages/classification/results_class.dart';
import 'package:classy_mobile/scoped_models/photo_model.dart';
import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:scoped_model/scoped_model.dart';

const double previewImagesCount = 3;
const double previewMargin = 10;

class ResultsPage extends StatefulWidget {
  final List<LocalImage> images;

  const ResultsPage({@required this.images});

  @override
  _ResultsPageState createState() => _ResultsPageState();
}

class _ResultsPageState extends State<ResultsPage> {
  bool isSaved = false;
  bool isExported = false;

  List<LocalImage> get images => widget.images;

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
    return Scaffold(
      appBar: AppBar(title: Text(Strings.of(context).classificationResults)),
      body: _buildGrid(context),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.grey,
              blurRadius: 5,
            )
          ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            Expanded(
              flex: 1,
              child: FlatButton(
                child: Text(isExported ? Strings.of(context).exported : Strings.of(context).export),
                onPressed: isExported
                    ? null
                    : () {
                        //TODO export
                        setState(() {
                          isExported = true;
                        });
                      },
              ),
            ),
            Expanded(
              flex: 2,
              child: FlatButton(
                child: Text(
                  isSaved || isExported ? '' : Strings.of(context).saveAndExport,
                ),
                onPressed: isSaved || isExported
                    ? null
                    : () {
                        // TODO
                        setState(() {
                          isExported = true;
                          isSaved = true;
                        });
                      },
              ),
            ),
            Expanded(
              flex: 1,
              child: FlatButton(
                child: Text(isSaved ? Strings.of(context).saved : Strings.of(context).save),
                onPressed: isSaved
                    ? null
                    : () {
                        ScopedModel.of<PhotoModel>(context).saveLocalImages(images);
                        setState(() {
                          isSaved = true;
                        });
                      },
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildGrid(BuildContext context) {
    List<String> classes = mapClasses();

    if (classes.isEmpty) return Center(child: Text(Strings.of(context).noClasses));

    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, childAspectRatio: 1),
      itemCount: classes.length,
      itemBuilder: (BuildContext context, int index) {
        String currentClass = classes[index];
        List<LocalImage> classImages = images.where((LocalImage image) => image.imageClass == currentClass).toList();

        List<LocalImage> previews = classImages.take(3).toList();
        List<Positioned> imageWidgets = [];
        for (int i = 0; i < previews.length; i++) {
          double bigMargin = 5 + previews.length * previewMargin - i * previewMargin;
          double smallMargin = 5 + previewMargin + i * previewMargin;

          imageWidgets.add(Positioned(
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
              child: Image.file(
                previews[i].imageFile,
                fit: BoxFit.cover,
              ),
            ),
          ));
        }

        return GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: () {
            Navigator.of(context).push(MaterialPageRoute(builder: (_) {
              return ResultsClassPage(imageClass: currentClass, images: classImages);
            }));
          },
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Container(
              margin: EdgeInsets.all(10),
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
              child: Column(
                children: <Widget>[
                  Expanded(
                    child: Stack(
                      children: imageWidgets.reversed.toList(),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.all(5),
                    child: Text(currentClass),
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
