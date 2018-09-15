import numpy as np
import json
import tensorflow as tf


food_classes = json.load(open("/home/chantal/PycharmProjects/foodprint/src/ingredient_sets.txt"))
food2int = dict()
int2food = dict()
count = 0
for group in food_classes:
    for food in group:
        if food not in food2int:
            food2int[food] = count
            int2food[count] = food
            count += 1
print(count)

training_data = []
for group in food_classes:
    for food in group:
        for other_food in group:
            if food != other_food:
                training_data.append([food, other_food])


def to_one_hot(word_index):
    vec = np.zeros(count)
    vec[word_index] = 1
    return vec


training_x = []
training_y = []


for instance in training_data:
    training_x.append(to_one_hot(food2int[instance[0]]))
    training_y.append(to_one_hot(food2int[instance[1]]))

training_x = np.asarray(training_x)
training_y = np.asarray(training_y)

x = tf.placeholder(tf.float32, shape=(None, count))
y_label = tf.placeholder(tf.float32, shape=(None, count))

EMBEDDING_DIM = 6 # you can choose your own number
W1 = tf.Variable(tf.random_normal([count, EMBEDDING_DIM]))
b1 = tf.Variable(tf.random_normal([EMBEDDING_DIM])) #bias
hidden_representation = tf.add(tf.matmul(x,W1), b1)

W2 = tf.Variable(tf.random_normal([EMBEDDING_DIM, count]))
b2 = tf.Variable(tf.random_normal([count]))
prediction = tf.nn.softmax(tf.add( tf.matmul(hidden_representation, W2), b2))

sess = tf.Session()
init = tf.global_variables_initializer()
sess.run(init) #make sure you do this!
# define the loss function:
cross_entropy_loss = tf.reduce_mean(-tf.reduce_sum(y_label * tf.log(prediction), reduction_indices=[1]))
# define the training step:
train_step = tf.train.GradientDescentOptimizer(0.1).minimize(cross_entropy_loss)
n_iters = 10000
# train for n_iter iterations
for itt in range(n_iters):
    sess.run(train_step, feed_dict={x: training_x, y_label: training_y})
    if itt%30 == 0:
        print('loss is : ', sess.run(cross_entropy_loss, feed_dict={x: training_x, y_label: training_y}))

vectors = sess.run(W1 + b1)


def euclidean_dist(vec1, vec2):
    return np.sqrt(np.sum((vec1-vec2)**2))


def find_closest(word_index, vectors):
    min_dist = 10000 # to act like positive infinity
    min_index = -1
    query_vector = vectors[word_index]
    for index, vector in enumerate(vectors):
        if euclidean_dist(vector, query_vector) < min_dist and not np.array_equal(vector, query_vector):
            min_dist = euclidean_dist(vector, query_vector)
            min_index = index
    return min_index

for key, value in int2food.items():
    closest = find_closest(key, vectors)
    print(f"{value} is closest to {int2food[closest]}")

from sklearn.decomposition import PCA

model = PCA(n_components=2)
vectors = model.fit_transform(vectors)

#model = PCA(n_components=2, random_state=0)
#np.set_printoptions(suppress=True)
#vectors = model.fit_transform(vectors)

from sklearn import preprocessing
normalizer = preprocessing.Normalizer()
vectors = normalizer.fit_transform(vectors, 'l2')

import matplotlib.pyplot as plt
fig, ax = plt.subplots()
for word, _ in food2int.items():
    print(word, vectors[food2int[word]][1])
    ax.annotate(word, (vectors[food2int[word]][0],vectors[food2int[word]][1] ))
plt.show()