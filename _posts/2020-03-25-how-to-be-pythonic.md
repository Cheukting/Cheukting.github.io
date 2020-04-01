---
layout: post
title: "How to be Pythonic? Design a Query Language in Python"
date: 2020-03-20
description: "I gave a talk at PyAmsterdam to find out how to be Pythonic"
image: /assets/images/cover_of_how_to_be_pythonic.png
author: Cheuk Ting Ho
tags:
  - Talk
  - Python
  - Query Language
  - TerminusDB

---

I gave a talk at [PyAmsterdam](https://py.amsterdam/2020/03/25/virtual-pyamsterdam-from-home-stayathome.html) today and it was a lovely community. I get the chance to answer some questions that have been puzzling me for a while. I ask people to vote for me on [DirectPoll](https://directpoll.com/) (first time trying it) so I know what the community thinks.

## Is Pythonic a thing?

It is a questions that I have been thinking since I was a naive Python Data Scientist. "Why I can't just do it in a for loop?" came through my mind all the time. Why we have to follow certain convention in coding? Is Pythonic a thing or just peer pressure.

![Poll of Is Pythonic a Thing](/assets/images/is_pythonic_a_thing.png)

Almost 90% of you things that it really is a thing. (35 votes)

## Who like SQL?

For me, I am not a fan of SQL. Date back to my first data science job I was furious about writing thousand links of SQL just to get some aggregated results. Joining tables are not fun as mistakes can be made easily. As we are designing a new query language in TerminusDB, I want to know what people things about SQL.

![Poll of Who like SQL](/assets/images/who_like_sql.png)

I am surprised that 70% of you like SQL! Hmmmmm... (38 votes)

## Which one do you prefer?

During the time I was translating WOQLjs to [WOQLpy](http://blog.terminusdb.com/2020/01/20/design-a-query-language-client-for-pythonistas-and-data-scientists/) I wonder what how shall I make the query building more "Pythonic". What would Pythonistas prefer? Chainable calls like `WOQLQuery().doctype("journey").label("Journey)` or Pandas DataFrame style, multi-parameters calls like `WOQLQuery().doctype(id="journey, label="Journey")`. (I failed to show the result in the talk so here you go!)

![Poll of Which one do you prefer](/assets/images/which_one_do_you_prefer.png)

Since Pandas, the most popular data manipulation library in Python uses the multi-parameters calls, I am not surprised that 80% of you would prefer that. (25 votes)

---

If you have missed the talk, you can now watch it [here](/videos/hl7xl7kurkg/). If you want to catch me streaming live, follow me on [Twitch](https://www.twitch.tv/cheukting_ho).
