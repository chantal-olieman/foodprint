# foodprint
Hack Zurich 2018 project to reduce food waste

## What is your FoodPrint?
Earth Overshoot Day, previously known as Ecological Debt Day, is the calculated illustrative calendar date on which humanity’s resource consumption for the year exceeds. In 2018 this day took place on the 1st of August. Right now, we have already consumed more than we will be able to provide this whole year. To fix this huge issue, it is important to raise awareness and help people evaluate how their daily choices influence the environment.

## Great, tell me more
Our website and app enable you to enter your recipes and to evaluate the impact of your meal. We use machine learning to provide different ingredients that fit with your recipe but significantly lower the environmental impact. You can keep track of your influence over the past months, save your recipes and share your results with friends!

## The tech
Our front-end is build in react native and bootstrap to provide both an app and web-app. Our backend is build in python, we used recipes from multiple sources to find out the relationship between certain types of food. This relationship is further extracted using Tensorflow and word2vec algorithm using word embedding to extract the meaning form these ingredients. With these relationships we can provide substitution ingredients that are close to the original ingredients and thus worthy substitutions.
