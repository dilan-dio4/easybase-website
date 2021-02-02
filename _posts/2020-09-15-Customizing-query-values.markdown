---
layout: blog
title:  Customizing Query Values Programmatically With Easybase
date:   2020-09-15 01:39:03 -0400
categories: about
tags: Home Blog Easybase
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=193&h=193&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.75
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase.
---
#### Customizing query values is a powerful way to combine Easybase's Visual Query Building with production code.
<br />
After creating an integration with a static query, developers will often want to be able to customize the values in that query. These variables will often be determined at runtime. Custom queries can be passed into integration requests to satisfy this requirement.

Consider the collection 'Students':
<img data-src="/assets/images/posts_images/customize_1.png" alt="Customizing Easybase Query Values 1" width="100%" data-jslghtbx class="custom-lightbox lazyload" />

A developer has an application that features two text boxes and wants to be able to query collection by age and name, based on what users enter into the text boxes.

Assume that you have a **"GET"** integration with the following query:

<img data-src="/assets/images/posts_images/customize_2.png" alt="Customizing Easybase Query Values 2" width="100%" data-jslghtbx class="custom-lightbox lazyload" />
<br />
<br />
<img data-src="/assets/images/posts_images/customize_3.png" alt="Customizing Easybase Query Values 3" width="100%" data-jslghtbx class="custom-lightbox lazyload" />

Calling this integration with Python:
```python
get("69BOMHaM4e23kVK9", None)
```

Result:
```json
[
    { "first_name": "Terry", "age": 21 },
    { "first_name": "Neil", "age": 19 },
    { "first_name": "Robert", "age": 19 },
    { "first_name": "Amelia", "age": 19 },
    { "first_name": "Casey", "age": 20 },
    { "first_name": "Kevin", "age": 21 }
]
```

This integration will by default filter your data through your query with the static value of _22_. 

**But what if you want to use custom query values on-demand?**

This is where custom query values come into play. An object can be passed into your integration to overwrite the given values in your query. The structure of the object is as follows; **map the column names [that are used in the query] to new values that you want to be passed into your query** 

If we wanted to query for ages < 25 rather than < 22 we would use an object like `{ "age": 25 }`

In python, this would look like:
```python
get("69BOMHaM4e23kVK9", customQuery={ "age": 25 })
```

Result:
```json
[
    { "first_name": "Terry", "age": 21 },
    { "first_name": "Ryan", "age": 22 },
    { "first_name": "Neil", "age": 19 },
    { "first_name": "Robert", "age": 19 },
    { "first_name": "Ava", "age": 23 },
    { "first_name": "Dian", "age": 24 },
    { "first_name": "Amelia", "age": 19 },
    { "first_name": "Casey", "age": 20 },
    { "first_name": "Kevin", "age": 21 }
]
```

We can see that, even though our visual query looks for ages less than 22, we can overwrite that value to any other number. In this case, we used 25 to demonstrate that the query changed with our `customQuery` object.

Custom query parameters are supported by any integration that supports static queries.

**Remember, you can always use the integration popup to design your integration, including custom queries, in your preferred language.**

<img data-src="/assets/images/posts_images/customize_4.png" alt="Customizing Easybase Query Values 3" width="100%" data-jslghtbx class="custom-lightbox lazyload" />
<br />
<br />
<br />
<br />

#### **Note: the format of the values in the custom query object is quite flexible. More information can be found [here](/about/2020/09/15/Easybase-data-types/)**