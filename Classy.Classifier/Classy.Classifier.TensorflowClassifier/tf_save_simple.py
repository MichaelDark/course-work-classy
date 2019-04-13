import tensorflow as tf
# from save_model import FromB64Layeri

tf.keras.backend.set_learning_phase(0)  # Ignore dropout at inference
model = tf.keras.models.load_model('./inception.h5')
export_path = './exported_models/2'


# Fetch the Keras session and save the model
# The signature definition is defined by the input and output tensors
# And stored with the default serving key
with tf.keras.backend.get_session() as sess:
    image = tf.placeholder(shape=[None], dtype=tf.string)
    decoded = tf.map_fn(tf.image.decode_jpeg, image, dtype='uint8')
    print(decoded)
    tensors = tf.math.divide(tf.cast(decoded, 'float32'), tf.constant(255.))
    # scores = model(tf.expand_dims(tensors, 0)
    scores = model(tensors)

    tf.saved_model.simple_save(
        sess,
        export_path,
        inputs={'image_bytes': image},
        outputs={'scores': scores})
