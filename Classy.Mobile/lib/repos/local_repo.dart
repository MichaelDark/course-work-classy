import 'package:classy_mobile/models/local_image.dart';
import 'package:jaguar_query_sqflite/jaguar_query_sqflite.dart';

class LocalRepo {
  static const String _dbName = 'database';
  static const int _dbVersion = 1;

  static LocalRepo _instance = LocalRepo._();
  LocalRepo._();
  factory LocalRepo() => _instance;

  SqfliteAdapter _adapter;

  Future<void> initialize() async {
    _adapter = SqfliteAdapter(_dbName, version: _dbVersion);

    if (_adapter.connection == null || !_adapter.connection.isOpen) await _adapter.connect();

    await _createAllTables();
  }

  Future<void> _createAllTables() => LocalImageBean(_adapter).createTable(ifNotExists: true);

  Future<void> cleanDatabase() => LocalImageBean(_adapter).removeAll();

  Future<List<LocalImage>> getAllImages() => LocalImageBean(_adapter).getAll();

  Future<void> saveLocalImages(List<LocalImage> images) => LocalImageBean(_adapter).upsertMany(images);

  Future<void> removeLocalImage(String imagePath) => LocalImageBean(_adapter).remove(imagePath);

  Future<void> changeLocalImageClass(String imagePath, String newClass) async {
    LocalImage image = await LocalImageBean(_adapter).find(imagePath);

    if (image == null) return;

    LocalImage reclasifiedImage = LocalImage.copyWithClass(image, newClass);
    LocalImage updatedImage = LocalImage.copyWithDate(reclasifiedImage, DateTime.now());

    await saveLocalImages([updatedImage]);
  }
}
