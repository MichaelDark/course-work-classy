// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'local_image.dart';

// **************************************************************************
// BeanGenerator
// **************************************************************************

abstract class _LocalImageBean implements Bean<LocalImage> {
  final imagePath = StrField('image_path');
  final imageClass = StrField('image_class');
  Map<String, Field> _fields;
  Map<String, Field> get fields => _fields ??= {
        imagePath.name: imagePath,
        imageClass.name: imageClass,
      };
  LocalImage fromMap(Map map) {
    LocalImage model = LocalImage(
      imagePath: adapter.parseValue(map['image_path']),
      imageClass: adapter.parseValue(map['image_class']),
    );

    return model;
  }

  List<SetColumn> toSetColumns(LocalImage model,
      {bool update = false, Set<String> only, bool onlyNonNull = false}) {
    List<SetColumn> ret = [];

    if (only == null && !onlyNonNull) {
      ret.add(imagePath.set(model.imagePath));
      ret.add(imageClass.set(model.imageClass));
    } else if (only != null) {
      if (only.contains(imagePath.name))
        ret.add(imagePath.set(model.imagePath));
      if (only.contains(imageClass.name))
        ret.add(imageClass.set(model.imageClass));
    } else /* if (onlyNonNull) */ {
      if (model.imagePath != null) {
        ret.add(imagePath.set(model.imagePath));
      }
      if (model.imageClass != null) {
        ret.add(imageClass.set(model.imageClass));
      }
    }

    return ret;
  }

  Future<void> createTable({bool ifNotExists = false}) async {
    final st = Sql.create(tableName, ifNotExists: ifNotExists);
    st.addStr(imagePath.name, primary: true, isNullable: false);
    st.addStr(imageClass.name, isNullable: false);
    return adapter.createTable(st);
  }

  Future<dynamic> insert(LocalImage model,
      {bool cascade = false,
      bool onlyNonNull = false,
      Set<String> only}) async {
    final Insert insert = inserter
        .setMany(toSetColumns(model, only: only, onlyNonNull: onlyNonNull));
    return adapter.insert(insert);
  }

  Future<void> insertMany(List<LocalImage> models,
      {bool onlyNonNull = false, Set<String> only}) async {
    final List<List<SetColumn>> data = models
        .map((model) =>
            toSetColumns(model, only: only, onlyNonNull: onlyNonNull))
        .toList();
    final InsertMany insert = inserters.addAll(data);
    await adapter.insertMany(insert);
    return;
  }

  Future<dynamic> upsert(LocalImage model,
      {bool cascade = false,
      Set<String> only,
      bool onlyNonNull = false}) async {
    final Upsert upsert = upserter
        .setMany(toSetColumns(model, only: only, onlyNonNull: onlyNonNull));
    return adapter.upsert(upsert);
  }

  Future<void> upsertMany(List<LocalImage> models,
      {bool onlyNonNull = false, Set<String> only}) async {
    final List<List<SetColumn>> data = [];
    for (var i = 0; i < models.length; ++i) {
      var model = models[i];
      data.add(
          toSetColumns(model, only: only, onlyNonNull: onlyNonNull).toList());
    }
    final UpsertMany upsert = upserters.addAll(data);
    await adapter.upsertMany(upsert);
    return;
  }

  Future<int> update(LocalImage model,
      {bool cascade = false,
      bool associate = false,
      Set<String> only,
      bool onlyNonNull = false}) async {
    final Update update = updater
        .where(this.imagePath.eq(model.imagePath))
        .setMany(toSetColumns(model, only: only, onlyNonNull: onlyNonNull));
    return adapter.update(update);
  }

  Future<void> updateMany(List<LocalImage> models,
      {bool onlyNonNull = false, Set<String> only}) async {
    final List<List<SetColumn>> data = [];
    final List<Expression> where = [];
    for (var i = 0; i < models.length; ++i) {
      var model = models[i];
      data.add(
          toSetColumns(model, only: only, onlyNonNull: onlyNonNull).toList());
      where.add(this.imagePath.eq(model.imagePath));
    }
    final UpdateMany update = updaters.addAll(data, where);
    await adapter.updateMany(update);
    return;
  }

  Future<LocalImage> find(String imagePath,
      {bool preload = false, bool cascade = false}) async {
    final Find find = finder.where(this.imagePath.eq(imagePath));
    return await findOne(find);
  }

  Future<int> remove(String imagePath) async {
    final Remove remove = remover.where(this.imagePath.eq(imagePath));
    return adapter.remove(remove);
  }

  Future<int> removeMany(List<LocalImage> models) async {
// Return if models is empty. If this is not done, all records will be removed!
    if (models == null || models.isEmpty) return 0;
    final Remove remove = remover;
    for (final model in models) {
      remove.or(this.imagePath.eq(model.imagePath));
    }
    return adapter.remove(remove);
  }
}
