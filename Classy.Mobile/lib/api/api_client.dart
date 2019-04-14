import 'dart:convert';

import 'package:classy_mobile/models/local_image.dart';
import 'package:http/http.dart' as http;

const String hostname = 'https://classy-classifier.herokuapp.com/classifier';
const String singleClassify = '$hostname/classify_single';

Future<LocalImage> sendImage(LocalImage image) async {
  Uri uri = Uri.parse(singleClassify);
  http.MultipartFile multipartFile = await http.MultipartFile.fromPath(
    'image',
    image.imagePath,
  );

  http.MultipartRequest request = http.MultipartRequest("POST", uri)..files.add(multipartFile);

  var response = await request.send();

  String responseText = await response.stream.transform(utf8.decoder).firstWhere((String item) => true);
  Map<String, dynamic> responseMap = json.decode(responseText);

  return LocalImage.copyWithClass(image, responseMap[image.imageName].toString());
}
