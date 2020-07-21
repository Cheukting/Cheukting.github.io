---
layout: post
title: "Shiny App in Python? Bokeh + Jupyter notebook"
date: 2020-03-20
description: "How to build an interactive plot with Bokeh and Jupyter notebook"
image: /assets/images/line_reg.gif
author: Cheuk Ting Ho
tags:
  - Python
  - Data Science
  - JavaScript
  - Jupyter notebook

---

While I am preparing my Data Science tutorial today, I suddenly have an idea of making an interactive plot with Bokeh and Jupyter notebook. I have a feeling that it's possible because I was looking at the Bokeh widgets last week and I know that you can link up a Bokeh widget with a plot to change its appearance. It was a brave idea and I am happy with the result.

By doing so, I learn a thing or two about Bokeh and to be honest, this actually reminds me about Shiny in R. A few years ago, my friend and I had a conversation about how useful Shiny is and we wish there is something similar in Python. Here you go! It's not exactly the same but, in my opinion, after coding in Python full time for a few years, it is better than a Shiny app.

## What is Bokeh

For those who do not know Bokeh, it's an interactive visualisation library for modern web browsers. It allows you to create an interactive graph with just Python (of cause if you can code in JS you will get some bonus control over it). You can render your interactive graph as an html or embedded it in the Jupyter notebook.

**If you want to learn more about Bokeh, you can watch [my tutorial](https://cheuk.dev/videos/cj_qru_4jj4)**

## Prerequisite

To create something like I did - an interactive plot with Bokeh, you will have to be able to code in basic Python. Have some idea about Bokeh (the [documentation](https://docs.bokeh.org/en/latest/index.html) is your best friend here).

On top of that, you will have to be able/ happy to write a bit of JavaScript. But don't worry, you will only need to write some small code snippets of it and it is highly similar to Python.


## Let's get started

In this example, we will create an app that the user can use 2 slider bars to control a line trying to fit the data with the least sum of error square. I call it a linear regression simulator. The sum of error square is re-calculated whenever any of the slider bars are moved. Like this:

<iframe width="400" height="800" src="/assets/html/line_reg.html" frameborder="0"></iframe>

So I think the best way is to show you the code then I will explain what we did in the code. Remember I will assume you have some basic idea about using Bokeh here. If you want to learn Bokeh, you can watch [my tutorial here](https://cheuk.dev/videos/cj_qru_4jj4). I would also assume you know how to use Jupyter notebook and put the code in the cells and run them.

First, let's prepare our data:

```python
b = 0.425
A = 0.785

def sum_error_eq(x,y,b,A):
    sum_error_sq = 0
    for i in range(len(x)):
        sum_error_sq += ((b*x[i]+A) -  y[i])**2
    return sum_error_sq

data = {'X': [1,2,3,4,5], 'Y': [1,2,1.3,3.75,2.25]}
data['b'] = [b] * len(data['X'])
data['A'] = [A] * len(data['X'])
data['Y pred'] = list(map(lambda X: X * b + A, data['X']))
```
Here we have a preset value of `b` and `A`, these are the slope and the intercept of the line that we are going to create in the graph. We also have a function `sum_error_eq` to calculate the sum of error square. Unfortunately, we cannot reuse this function in our JS code snippets and will have to implement the same in JS.

Then we have a dictionary that is the data. Originally in [my notebook](https://github.com/Cheukting/legend_data/blob/master/linear-reg.ipynb) I use pandas, but I think I will take away another prerequisite by just using a  dictionary here. Note that we have 'Y', which is for the actual points that we are going to plot with `circle` in Bokeh and 'Y pred' which is the "predicted" Y form the line equation:

**Y' = Xb + A**

this will be used in the interactive line plot in Bokeh.

Next, we want to make the plot:

```python
from bokeh.layouts import column
from bokeh.models import ColumnDataSource, CustomJS, Slider, Div
from bokeh.plotting import figure, output_notebook, show

output_notebook()

source = ColumnDataSource(data)

plot = figure(plot_width=400, plot_height=200, x_range=[0,6], y_range=[0,5])
plot.line(x='X', y='Y pred', source=source, line_width=3, line_alpha=0.6)
plot.circle(x='X', y='Y', source=source, size=10, color="green", alpha=0.5)

callback_b = CustomJS(args=dict(source=source), code="""
        var data = source.data;
        var b_val = cb_obj.value
        var b = data['b']
        var A = data['A']
        var x = data['X']
        var y = data['Y pred']
        for (var i = 0; i < x.length; i++) {
            b[i] = b_val
            y[i] = b[i] * x[i] + A[i]
        }
        source.change.emit();
    """)

callback_A = CustomJS(args=dict(source=source), code="""
        var data = source.data;
        var A_val = cb_obj.value
        var b = data['b']
        var A = data['A']
        var x = data['X']
        var y = data['Y pred']
        for (var i = 0; i < x.length; i++) {
            A[i] = A_val
            y[i] = b[i] * x[i] + A[i]
        }
        source.change.emit();
    """)

div = Div(text="Sum of error sq: "+ str(sum_error_eq(data['X'],data['Y'], b, A)))

change_text = CustomJS(args=dict(div=div, source=source), code="""
                var data = source.data;
                var y_pred = data['Y pred'];
                var y = data['Y'];
                var result = 0;
                for (var i = 0; i < y.length; i++) {
                    var diff = y_pred[i] - y[i]
                    result = result + diff * diff
                }
                div.text = "Sum of error sq: " + result;
             """       
    )

slider_b = Slider(start=0, end=4, value=b, step=.1, title="value of b")
slider_b.js_on_change('value', callback_b, change_text)
slider_A = Slider(start=0, end=4, value=A, step=.1, title="value of A")
slider_A.js_on_change('value', callback_A, change_text)

layout = column(slider_b, slider_A, plot, div)

show(layout)
```
Okay, that's quite a big chunk of code here, let's crack it down bit by bit:

```python
output_notebook()
```

This lets you output your "app" inline in the Jupyter notebook, If you want to export it as an html and embedded in your blog (like I did above) you can use `output_file` instead.

```python
source = ColumnDataSource(data)
```

This creates a source with the data that we have, a source created with `ColumnDataSource` can let you pass this data to the Bokeh plots and JS Callbacks (that we will explain later).

```python
plot = figure(plot_width=400, plot_height=200, x_range=[0,6], y_range=[0,5])
plot.line(x='X', y='Y pred', source=source, line_width=3, line_alpha=0.6)
plot.circle(x='X', y='Y', source=source, size=10, color="green", alpha=0.5)
```

Here we are creating the plot, with the interactive line and the circle. Note that the line here is not interactive yet but we will use the JS callback to change the data in the source so it will change with the slider when we hook up the callbacks with the slider bars.

```python
callback_b = CustomJS(args=dict(source=source), code="""
        var data = source.data;
        var b_val = cb_obj.value
        var b = data['b']
        var A = data['A']
        var x = data['X']
        var y = data['Y pred']
        for (var i = 0; i < x.length; i++) {
            b[i] = b_val
            y[i] = b[i] * x[i] + A[i]
        }
        source.change.emit();
    """)

callback_A = CustomJS(args=dict(source=source), code="""
        var data = source.data;
        var A_val = cb_obj.value
        var b = data['b']
        var A = data['A']
        var x = data['X']
        var y = data['Y pred']
        for (var i = 0; i < x.length; i++) {
            A[i] = A_val
            y[i] = b[i] * x[i] + A[i]
        }
        source.change.emit();
    """)
```

These are the callbacks that we will be hooking up the slider bars. There is one for each. You can see that we pass the source in the JS code snippets and we change it according to the the value that we received in the slider bar. The snippets above are when `b` slider bar’s value has been changed and the one below is for `A`

```python
div = Div(text="Sum of error sq: "+ str(sum_error_eq(data['X'],data['Y'], b, A)))

change_text = CustomJS(args=dict(div=div, source=source), code="""
                var data = source.data;
                var y_pred = data['Y pred'];
                var y = data['Y'];
                var result = 0;
                for (var i = 0; i < y.length; i++) {
                    var diff = y_pred[i] - y[i]
                    result = result + diff * diff
                }
                div.text = "Sum of error sq: " + result;
             """       
    )
```

Here we created a `Div` object, it is just like a `<div>` session in your html. The `text` will actually be interpreted as html. We also created another callback, this one is actually for changing the `text` in the `div`. Note that in the for-loop here we are doing exactly the same thing as `sum_error_eq` but in JS.

```python
slider_b = Slider(start=0, end=4, value=b, step=.1, title="value of b")
slider_b.js_on_change('value', callback_b, change_text)
slider_A = Slider(start=0, end=4, value=A, step=.1, title="value of A")
slider_A.js_on_change('value', callback_A, change_text)
```

Now we can create the `Slider` bars and hook them up with `js_on_change`

```python
layout = column(slider_b, slider_A, plot, div)

show(layout)
```

Finally, we create the layout will all our components inside and `show` it.

## How can I make a dark one like the gif?

Yes, there’s two things that I have done to make it “dark theme”. First, I use [Jupyter Themes](https://github.com/dunovank/jupyter-themes) to give my Jupyter a new look. The theme that I used is `monokai`. Then I use the `night_sky` [theme from Bokeh](https://docs.bokeh.org/en/latest/docs/reference/themes.html?highlight=themes#module-bokeh.themes) (by the way, I made this theme).

---

I hope you had fun and will keep on exploring this cool functionality of Bokeh. If you have my tutorials, you can now watch them [here](https://www.youtube.com/channel/UCie_J9IohYO4hSsz4O2mDfQ). If you want to catch me streaming live, follow me on [Twitch](https://www.twitch.tv/cheukting_ho).
