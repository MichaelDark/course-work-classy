import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/pages/classification/choose_photos.dart';
import 'package:classy_mobile/pages/local/saved_images.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

enum CurrentPage { ChoosePhotos, SavedClassifies }

class MainDrawer extends StatelessWidget {
  final CurrentPage currentPage;

  const MainDrawer(this.currentPage);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Column(
              children: <Widget>[
                SizedBox(
                  height: 150,
                  child: CircleAvatar(
                    radius: 50,
                    child: Image.asset(
                      'assets/logo.png',
                    ),
                  ),
                ),
                Container(height: 1, color: Colors.grey.shade300),
                ListTile(
                  leading: Icon(
                    Icons.burst_mode,
                    color: Colors.black,
                  ),
                  title: Text(Strings.of(context).classifyPhotos),
                  onTap: () {
                    Navigator.of(context).pop();
                    if (currentPage != CurrentPage.ChoosePhotos) {
                      Navigator.of(context).pushAndRemoveUntil(
                        MaterialPageRoute(builder: (_) => ChoosePhotosPage()),
                        (_) => false,
                      );
                    }
                  },
                ),
                Container(height: 1, color: Colors.grey.shade300),
                ListTile(
                  leading: Icon(
                    Icons.archive,
                    color: Colors.black,
                  ),
                  title: Text(Strings.of(context).savedClassifies),
                  onTap: () {
                    Navigator.of(context).pop();
                    if (currentPage != CurrentPage.SavedClassifies) {
                      Navigator.of(context).pushAndRemoveUntil(
                        MaterialPageRoute(builder: (_) => SavedImagesPage()),
                        (_) => false,
                      );
                    }
                  },
                ),
                Container(height: 1, color: Colors.grey.shade300),
              ],
            ),
            Column(
              children: <Widget>[
                Container(height: 1, color: Colors.grey.shade300),
                ListTile(
                  leading: Icon(
                    Icons.monetization_on,
                    color: Colors.black,
                  ),
                  title: Text(Strings.of(context).donateForCoffee),
                  onTap: () {
                    launch('https://bit.ly/IqT6zt');
                  },
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
