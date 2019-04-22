import 'package:classy_mobile/models/local_image.dart';

abstract class ImageRemover {
  void onRemove(LocalImage imageToRemove);
}

abstract class ImageReclassifier {
  void onReclassify(LocalImage imageToRemove);
}
