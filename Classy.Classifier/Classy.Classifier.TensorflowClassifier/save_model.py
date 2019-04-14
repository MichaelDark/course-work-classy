#from keras.applications.inception_v3 import InceptionV3
#from keras.layers import Input
#
#inception_model = InceptionV3(weights='imagenet', input_tensor=Input(shape=(224, 224, 3)))
#inception_model.save('inception.h5')
import tensorflow as tf
from tensorflow.keras.applications.inception_v3 import InceptionV3
from tensorflow.keras.layers import Input, Lambda, Layer


class FromB64Layer(Layer):

    def __init__(self, output_dim, **kwargs):
        self.output_dim = output_dim
        super(FromB64Layer, self).__init__(**kwargs)

    def process_img(self, x):
        print(x)
        img = tf.io.decode_base64(x)
        img = tf.image.decode_jpeg(img, channels=3)
        img = tf.image.resize_images(img, (224, 224), method=tf.image.ResizeMethod.BILINEAR, align_corners=False)
        img = tf.math.divide(img, tf.constant(255, dtype='float'))
        # if you need to squeeze your input range to [0,1] or [-1,1] do it here
        return img

    def get_config(self):
        return {'output_dim': self.output_dim}

    def call(self, x, **kwargs):
        x = tf.squeeze(x)
        return tf.map_fn(lambda im: self.process_img(im), x, dtype='float32')
        
    def compute_output_shape(self, input_shape):
        return input_shape[0], self.output_dim


#InputLayer = Input(shape=(1,), dtype="string")
#OutputLayer = FromB64Layer((224,224,3), dtype="float32")(InputLayer)
#base64_model = tf.keras.Model(InputLayer, OutputLayer)

inception_model = InceptionV3(weights='imagenet', input_tensor=Input(shape=(224, 224, 3)))

#base64_input = base64_model.input
#final_output = inception_model(base64_model.output)
#new_model = tf.keras.Model(base64_input, final_output)
inception_model.save('inception.h5')

