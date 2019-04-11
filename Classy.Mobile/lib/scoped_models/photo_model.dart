import 'package:classy_mobile/models/local_image.dart';
import 'package:jaguar_query_sqflite/jaguar_query_sqflite.dart';
import 'package:scoped_model/scoped_model.dart';

class PhotoModel extends Model {
  final LocalRepo repo;

  PhotoModel(this.repo);

  Future<List<LocalImage>> getAllImages() => repo.getAllImages();

  Future<void> saveLocalImages(List<LocalImage> images) => repo.saveLocalImages(images);

  Future<void> removeLocalImage(String imagePath) => repo.removeLocalImage(imagePath);
}

class LocalRepo {
  static const String _dbName = 'database';
  static const int _dbVersion = 1;

  SqfliteAdapter _adapter;
  LocalRepo();

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
}
