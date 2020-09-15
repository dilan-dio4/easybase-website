---
layout: blog
title:  "Customizing Query Values"
date:   2020-09-15 01:39:03 -0400
categories: about
tags: Home Blog EasyBase
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=600&h=600&ixid=eyJhcHBfaWQiOjF9&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.85
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for EasyBase. He has previously written and contributed to various tech-related publications.
sidebar_video: https://www.youtube.com/embed/S1o24hvcNNs
---
### Customizing query values is a powerful way to combine EasyBase's Visual Query Building with production code.
<br />
Assume that you have a **"GET"** integration with the following query:

*image*

Calling this integration with Python:
```python
get("askldjfh", None)
```
Result:
```json
{hello: true}
```

This integration will by default filter your data through the query with the static values (). 

**But what if you want to use custom query values on-demand?**

This is where custom query values come into play. An object can be passed into your integration to overwrite the given valus in your integration query.

In python, this would look like:
```python
get("aosadifj", None, { "age": 25 })
```

Result:
```json
```

Remember, you can always use the integration popup to design your integration in your preferred language.

*image*

#### **Note: the format of the values in the custom query object is quite flexible. More information can be found [here](/about/2020/09/15/EasyBase-data-types/)**