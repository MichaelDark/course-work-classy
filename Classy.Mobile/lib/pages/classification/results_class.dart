import 'package:classy_mobile/views/local_image_card.dart';
import 'package:flutter/material.dart';
import 'package:classy_mobile/locale/strings.dart';
import 'package:classy_mobile/models/local_image.dart';

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
    String className = widget.imageClass ?? Strings.of(context).unknownClass;

    return Scaffold(
      appBar: AppBar(title: Text('${Strings.of(context).classText}: $className')),
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
