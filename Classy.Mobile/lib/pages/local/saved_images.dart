import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/pages/classification/choose_photos.dart';
import 'package:classy_mobile/pages/local/archive.dart';
import 'package:classy_mobile/repos/local_repo.dart';
import 'package:classy_mobile/views/main_drawer.dart';
import 'package:classy_mobile/views/saved_images_grid.dart';
import 'package:classy_mobile/views/saved_images_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

enum Mode { List, Grid }

class SavedImagesPage extends StatefulWidget {
  final List<LocalImage> newImages;

  const SavedImagesPage({this.newImages});

  @override
  _SavedImagesPageState createState() => _SavedImagesPageState();
}

class _SavedImagesPageState extends State<SavedImagesPage> with SingleTickerProviderStateMixin {
  Mode _mode = Mode.Grid;
  ScrollController _scrollController = ScrollController();
  Animation<double> animation;
  AnimationController controller;

  IconData get modeIcon {
    switch (_mode) {
      case Mode.List:
        return Icons.grid_on;
      default:
        return Icons.list;
    }
  }

  @override
  void initState() {
    super.initState();
    controller = AnimationController(duration: const Duration(milliseconds: 50), vsync: this);
    animation = Tween<double>(begin: 0, end: 1).animate(controller);
    _scrollController.addListener(() {
      if (_scrollController.position.userScrollDirection == ScrollDirection.reverse) {
        controller.reverse();
      }
      if (_scrollController.position.userScrollDirection == ScrollDirection.forward) {
        controller.forward();
      }
    });
    controller.forward();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  void onRemoveAll() async {
    bool deleteConfirmed = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          backgroundColor: Colors.transparent,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(24),
            child: Container(
              color: Colors.white,
              child: Padding(
                padding: EdgeInsets.all(10),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: 10, horizontal: 10),
                      child: Text(
                        Strings.of(context).sureYouWantDeleteAll,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: 10, horizontal: 10),
                      child: Text(
                        Strings.of(context).imageWontBeDeletedFromDevice,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.grey.shade400,
                          fontSize: 16,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        FlatButton(
                          child: Text(Strings.of(context).cancel.toUpperCase()),
                          onPressed: () => Navigator.of(context).pop(),
                        ),
                        FlatButton(
                          child: Text(Strings.of(context).delete.toUpperCase()),
                          onPressed: () => Navigator.of(context).pop(true),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );

    if (deleteConfirmed != null && deleteConfirmed) {
      await LocalRepo().removeAll();
      if (mounted) {
        setState(() {});
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(Strings.of(context).savedClassifiesTitle),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.delete_forever),
            onPressed: onRemoveAll,
          ),
          IconButton(
            icon: Icon(Icons.save),
            onPressed: () async {
              List<LocalImage> images = await LocalRepo().getAllImages();
              Navigator.of(context).push(MaterialPageRoute(builder: (_) => ArchivePage(images: images)));
            },
          ),
          IconButton(
            icon: Icon(modeIcon),
            onPressed: () {
              setState(() {
                if (_mode == Mode.List) {
                  _mode = Mode.Grid;
                } else if (_mode == Mode.Grid) {
                  _mode = Mode.List;
                }
              });
            },
          )
        ],
      ),
      drawer: MainDrawer(CurrentPage.SavedClassifies),
      body: Stack(
        children: <Widget>[
          FutureBuilder<List<LocalImage>>(
            future: LocalRepo().getAllImages(),
            builder: (BuildContext context, AsyncSnapshot<List<LocalImage>> snapshot) {
              if (snapshot.hasData) {
                List<LocalImage> images = snapshot.data;
                images.sort((LocalImage im1, LocalImage im2) {
                  if (im1.saveDate == null) {
                    return 1;
                  }
                  if (im2.saveDate == null) {
                    return -1;
                  }
                  return im2.saveDate.compareTo(im1.saveDate);
                });

                if (_mode == Mode.List) {
                  return SavedImagesList.withActions(
                    controller: _scrollController,
                    images: images,
                    newImages: widget.newImages,
                  );
                } else {
                  return SavedImagesGrid.withActions(
                    controller: _scrollController,
                    images: images,
                    newImages: widget.newImages,
                  );
                }
              }
              if (snapshot.hasError) {
                return Center(child: Text('error'));
              }
              return Center(child: CircularProgressIndicator());
            },
          ),
          Positioned(
            bottom: 0,
            right: 0,
            child: SizeTransition(
              sizeFactor: animation,
              child: Padding(
                padding: EdgeInsets.all(10),
                child: FloatingActionButton.extended(
                  isExtended: true,
                  label: Text('Classify more'),
                  icon: Icon(Icons.burst_mode),
                  onPressed: () {
                    Navigator.of(context).pushAndRemoveUntil(
                      MaterialPageRoute(builder: (_) => ChoosePhotosPage()),
                      (_) => false,
                    );
                  },
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
