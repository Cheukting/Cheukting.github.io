---
layout: post
title: "I Have to Confess I Still Love Pandas 🐼"
date: 2022-09-12
description: "About my love hate relationship with Pandas"
image: /assets/images/trojan-horse.png
author: Cheuk Ting Ho
tags:
  - Python
  - OSS
  - DataScience

---

A few year ago, I was still a Data Scientist, Pandas was a tool that I have to use everyday. Soon time passes and I have used Pandas without googling and seems to forget the struggle I had when I was using Pandas for the first time.

I hope someone can tell me a little bit more when I start using Pandas so I can have a better understanding of it. So here are few things that I will tell my previous self and those of you who are starting to use Pandas.

## What about Large Datasets

We all know that Pandas (and Python) is using in memory, and handeling large amount of data is not what it does best. To minimise the problem, we can try a few tricks.

- If you know the type of the csv, try using `dtype` optionl:

```python
pd.read_csv(os.path.join(self.path_movies),
            usecols=['movieId', 'title'],
            dtype={'movieId': 'int32', 'title': 'str'})
```

Because we don't need `float64` or `int64` (which are the defaults) all the time. This can also minimise the guessing and errors that may follow if the type of the column is input wrongly.

- If it possible, processing in chunks:

```python
chunksize = 10 ** 6
with pd.read_csv(filename, chunksize=chunksize) as reader:
    for chunk in reader:
        process(chunk)
```

This can make the io to databases and/or disk better. If you need speed, this can also be converted as concurrent operations, but we are not diving into details here.

## What about APIs that are similar or do the exact same things?

One thing about APIs in Pandas is that, there are multiple ways of doing things, like:

- Getting a column: `df.user` vs `df['user']`
- Sum, min, max etc: `sum(df)` vs `df.sum()`
- Missing values: `isnull` vs `isna`

The questions is: Which one is better? which one should I use?

Here is my answer (and it is a personal opnion) - For the cases above, I will choose the later over the former. Why? There are reasons:

- Using square brackets (`[]`) to reference a column because there are column names that have spaces in it and it will not work for the `.`
- using the numpy defined operation function orver the general Python build in fuction because it is optimise for that task

- using the more commonly used method instead of the less popular ones (or old one) to advoid funciton being depricated

This requires some understanding of the ecosystem of Pandas to make the decision.

## What about the nested indexes

Nested indexes is a double edge sward in Pandas in my opnion. In some cases it is good that we can have multiple layers of index and columns but most of the time it just make data science operations more complicated.

As for beginners, some time they maybe taken by supprise that after some operations (like groupby, aggrations and pivot_table etc) will end up with nested columns.

One key thing to remember is, use `reset_index()` after those operations. Then nested structures will be flattened and columns will be renamed with the...

## How about quick data manipulation

Pandas offers ways to use SQL queries to manipulate the DataFrame, which can be very handy for those who are used to SQL queries and this can also be used to preview what you will get if you have a small sample of a huge data in database as a DataFrame.

Here is my presentation slides:

<iframe src="https://slides.com/cheukting_ho/trojan-source/embed?style=transparent&share=hidden" width="576" height="420" title="Trojan Source" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
