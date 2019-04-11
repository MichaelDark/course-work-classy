import 'package:classy_mobile/views/local_image_card.dart';
import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';
import 'package:classy_mobile/views/main_drawer.dart';

class ResultsClassPage extends StatefulWidget {
  final String imageClass;
  final List<LocalImage> images;

  const ResultsClassPage({
    @required this.imageClass,
    @required this.images,
  });

  @override
  _ResultsClassPageState createState() => _ResultsClassPageState();
}

class _ResultsClassPageState extends State<ResultsClassPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('${Strings.of(context).classText}: ${widget.imageClass}')),
      body: _buildList(context),
    );
  }

  Widget _buildList(BuildContext context) {
    if (widget.images.isEmpty) return Center(child: Text(Strings.of(context).choosePhoto));

    return ListView.builder(
      itemCount: widget.images.length,
      itemBuilder: (BuildContext context, int index) {
        return LocalImageCard(image: widget.images[index]);
      },
    );
  }
}
