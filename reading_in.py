import json

combinations = json.load(open("/home/chantal/PycharmProjects/foodprint/src/ingredient_sets.txt"))
foods = json.load(open("/home/chantal/PycharmProjects/foodprint/src/GWP.txt"))
print(len(combinations))
counts = dict()

for combination in combinations:
    for food in combination:
        counts[food] = counts.get(food, 0) + 1

import operator
sorted_x = sorted(counts.items(), key=operator.itemgetter(1), reverse=True)

for key, value in foods.items():
    if key not in combination:
        print(key)

print(sorted_x)
print(len(sorted_x))
print(len(foods))
print(len(foods)-len(sorted_x))

more = open("/home/chantal/PycharmProjects/foodprint/src/more_ingredients.txt", "r")
for line in more:
    words = line.split(",")
    if len(words)>1:
        result = []
        for word in words:
            clean = word.strip("\n").lower()
            if clean in foods:
                result.append(clean)
        if len(result)>1:
            combinations.append(result)