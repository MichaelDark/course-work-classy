import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/pages/choose_photos.dart';
import 'package:classy_mobile/pages/saved_classifies.dart';
import 'package:flutter/material.dart';

enum CurrentPage { ChoosePhotos, SavedClassifies }

class MainDrawer extends StatelessWidget {
  final CurrentPage currentPage;

  const MainDrawer(this.currentPage);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SafeArea(
        child: Column(
          children: <Widget>[
            ListTile(
              title: Text(Strings.of(context).choosePhoto),
              onTap: () {
                if (currentPage != CurrentPage.ChoosePhotos) {
                  Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(builder: (_) => ChoosePhotosPage()),
                    (_) => false,
                  );
                } else {
                  Navigator.of(context).pop();
                }
              },
            ),
            ListTile(
              title: Text(Strings.of(context).savedClassifies),
              onTap: () {
                if (currentPage != CurrentPage.SavedClassifies) {
                  Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(builder: (_) => SavedClassifiesPage()),
                    (_) => false,
                  );
                } else {
                  Navigator.of(context).pop();
                }
              },
            )
          ],
        ),
      ),
    );
  }
}
