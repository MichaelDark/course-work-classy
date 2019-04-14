import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/scoped_models/photo_model.dart';
import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';

class SaveButton extends StatefulWidget {
  final List<LocalImage> images;

  const SaveButton({@required this.images});

  @override
  _SaveButtonState createState() => _SaveButtonState();
}

class _SaveButtonState extends State<SaveButton> {
  bool isSaved = false;

  @override
  Widget build(BuildContext context) {
    if (isSaved == null) {
      return Center(child: CircularProgressIndicator());
    } else {
      String caption;
      if (isSaved) {
        caption = Strings.of(context).saved;
      } else {
        caption = Strings.of(context).save;
      }

      return FlatButton(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.all(8),
              child: Icon(Icons.save),
            ),
            Padding(
              padding: EdgeInsets.all(8),
              child: Text(caption),
            ),
          ],
        ),
        onPressed: isSaved
            ? null
            : () async {
                setState(() {
                  isSaved = null;
                });
                await ScopedModel.of<PhotoModel>(context).saveLocalImages(widget.images);
                setState(() {
                  isSaved = true;
                });
              },
      );
    }
  }
}
