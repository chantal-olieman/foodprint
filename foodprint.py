import os
import json
import csv
from flask import Flask
from flask import request


source_root = f'{os.getcwd()}/PycharmProjects/foodprint'
app = Flask(__name__)
foodprint_storage = dict()
food_classes = []


def fill_foodprint_storage():
        foodprints = open(f"{os.getcwd()}/src/environmental-data.csv", "rt")
        for row in foodprints:
            items = row.split(',')
            if items[0] is not '':
                foodprint_storage[items[0].lower()] = float(items[1])
        foods = json.load(open(f"{os.getcwd()}/src/GWP.txt"))
        foodprint_storage.update(foods)
        json.dump(foodprint_storage, open("/home/chantal/PycharmProjects/foodprint/src/GWP.txt", 'w'))

def get_closest_alternatives(food, weight):
    food_group = []
    for ingredient_group in food_classes:
        if food in ingredient_group:
            food_group = ingredient_group
            break
    food_vals = {food: foodprint_storage[food] for food in food_group}
    if len(food_vals)<2:
        return {}
    s = [(k, food_vals[k]) for k in sorted(food_vals, key=food_vals.get)]
    alternatives = {s[0][0]: round(s[0][1]*weight,3), s[1][0]: round(s[1][1]*weight,3)}
    if food in alternatives:
        alternatives.pop(food)
    ingredient_info = {"alternatives": alternatives}
    min = s[0][1]
    max = s[-1][1]
    return ingredient_info


def calculate_foodprint(foods:dict):
    foodprint = 0
    ingredient_val = {}
    for food, amount in foods.items():
        food = food.lower()
        if food in foodprint_storage:
            foodprint += foodprint_storage.get(food)*amount
            ingredient_val[food] = {"value": round(foodprint_storage.get(food)*amount,3), "alternatives": get_closest_alternatives(food, amount)}
        else:
            print("item not in storage")
    foodprint = {"value":round(foodprint, 3), "ingredient_info":ingredient_val}
    return foodprint





@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/foodprint', methods=['GET', 'POST'])
def foodprint():
    if request.method == 'GET':
        return "Please post a some ingredients"
    data = request.json
    foodprint = calculate_foodprint(data)
    return json.dumps({"foodprint": foodprint})


@app.route('/ingredients', methods=['GET', 'POST'])
def ingredients():
    keys = [key for key, value in foodprint_storage.items()]
    return json.dumps({"ingredients":keys})


if __name__ == '__main__':
    foodprint_storage = json.load(open(f"{os.getcwd()}/src/GWP.txt"))
    food_classes = json.load(open(f"{os.getcwd()}/src/ingredient_classes.txt"))
    app.run()
