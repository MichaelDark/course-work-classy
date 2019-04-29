import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/class_list.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/repos/local_repo.dart';
import 'package:flutter/material.dart';

class ReclassifyPage extends StatefulWidget {
  final LocalImage image;

  const ReclassifyPage({
    @required this.image,
  });

  @override
  _ReclassifyPageState createState() => _ReclassifyPageState();
}

class _ReclassifyPageState extends State<ReclassifyPage> {
  Widget page;

  void loadImages() async {
    if (page != null) return;

    List<LocalImage> images = await LocalRepo().getAllImages();
    if (images == null) {
      page = _ReclassifyPage(image: widget.image);
    } else {
      List<String> classes = images.map((LocalImage image) => image.imageClass).toSet().toList();
      page = _ReclassifyPage(image: widget.image, classes: classes);
    }
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    loadImages();

    if (page == null) {
      return _ReclassifyPreloadPage();
    } else {
      return page;
    }
  }
}

class _ReclassifyPreloadPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(Strings.of(context).enterNewClass),
      ),
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}

class _ReclassifyPage extends StatefulWidget {
  final LocalImage image;
  final List<String> classes;

  const _ReclassifyPage({
    @required this.image,
    this.classes,
  });

  @override
  __ReclassifyPageState createState() => __ReclassifyPageState();
}

class __ReclassifyPageState extends State<_ReclassifyPage> {
  TextEditingController controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    controller = TextEditingController(text: widget.image.imageClass);
  }

  List<String> filterClasses() {
    String filter = controller.text;
    List<String> classes = classList..addAll(widget.classes);

    List<String> filteredClasses = classes
        .where((String imageClass) {
          if (imageClass == null || filter == null) return false;
          return imageClass.toLowerCase().startsWith(filter.toLowerCase());
        })
        .toSet()
        .toList();

    filteredClasses.sort();
    return filteredClasses;
  }

  @override
  Widget build(BuildContext context) {
    List<String> filteredClasses = filterClasses();

    return Scaffold(
      appBar: AppBar(
        title: Text(Strings.of(context).enterNewClass),
      ),
      body: Column(
        children: <Widget>[
          TextField(
            controller: controller,
            autofocus: true,
            style: TextStyle(
              fontSize: 20,
            ),
            decoration: InputDecoration(
              hintText: Strings.of(context).newClassHint,
              contentPadding: EdgeInsets.all(20),
              prefixIcon: Icon(Icons.burst_mode),
              suffixIcon: IconButton(
                icon: Icon(Icons.close),
                onPressed: () {
                  setState(() {
                    controller.text = '';
                  });
                },
              ),
            ),
            onChanged: (String newFilter) {
              setState(() {});
            },
          ),
          _buildCreateClassButton(filteredClasses),
          Expanded(
            child: ListView.separated(
              separatorBuilder: (BuildContext context, _) => Container(height: 1, color: Colors.grey.shade100),
              itemCount: filteredClasses.length,
              itemBuilder: (BuildContext context, int index) {
                String imageClass = filteredClasses[index];

                return InkWell(
                  onTap: () => Navigator.pop(context, imageClass),
                  child: Container(
                    padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                    child: Text(
                      imageClass,
                      style: TextStyle(
                        fontSize: 20,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCreateClassButton(List<String> filteredClasses) {
    if (controller.text.isEmpty) return Container();
    if (filteredClasses.contains(controller.text)) return Container();

    return Row(
      children: <Widget>[
        Expanded(
          child: Container(
            padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
            decoration: BoxDecoration(
              color: Colors.lightGreen.shade100,
            ),
            child: GestureDetector(
              onTap: () => Navigator.pop(context, controller.text),
              child: RichText(
                text: TextSpan(
                  style: TextStyle(
                    color: Colors.green.shade600,
                    fontSize: 20,
                    fontStyle: FontStyle.italic,
                  ),
                  children: <TextSpan>[
                    TextSpan(text: Strings.of(context).createNewClass),
                    TextSpan(
                      text: ' ${controller.text} ',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TextSpan(text: Strings.of(context).andSetToImage),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
