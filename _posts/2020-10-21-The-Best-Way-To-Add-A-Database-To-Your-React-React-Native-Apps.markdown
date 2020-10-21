---
layout: blog
title:  The Best Way to Add a Database to Your React & React Native Apps	
date:   2020-09-20 10:39:03 -0400
categories: about
title_image: https://miro.medium.com/max/1540/0*GLIaE22XTwF0lc5J
tags: Home Blog EasyBase
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=600&h=600&ixid=eyJhcHBfaWQiOjF9&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.85
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for EasyBase. He has previously written and contributed to various tech-related publications.
sidebar_video: https://www.youtube-nocookie.com/embed/VslCVu7T9iw
meta_description: EasyBase is a fantastic solution for React & React Native developers. The 'easybasejs' npm module makes it extremely easy to integrate your free cloud database!
---
### React and React Native are extremely popular front-end frameworks that are great for developing websites and applications.

<br />

Cloud databases are all-the-rage nowadays, especially with this new wave of wildly popular front-end frameworks including [Vue](https://vuejs.org/), [Angular](https://angular.io/), and [React](https://reactjs.org/).

These modules have allowed beginners and exports turn their ideas into reality. Furthermore, they can deploy their applications on all kinds of devices.

<br />
<hr />
<br />

**A database is an integral part of almost all production applications and services. At some point, a developer is going to need to be able to asynchronously access their data from a fast & reliable source.**

[Easybase](https://easybase.io) is a service that makes developer's lives easier and more time-efficient. **The free tier covers almost all use cases.** In essence, Easybase is a cloud database that is great for apps and website. It's easy to implement into iPhone and Android apps as well!

The service features a visual query builder and self-building API. Forget complicated DBMS query syntax and difficult microservices. With just a few clicks, your database will be ready to serve thousands of records to your apps for free!

Here's a video demonstrating how EasyBase can be integrated into a React project:

<iframe style="width: 100%; height: 355px;" class="lazyload" data-src="https://www.youtube-nocookie.com/embed/VslCVu7T9iw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

The only dependency to your React project is the 'easybasejs' npm module. To install that, simply do:
```python
npm i easybasejs
```

<br />

After you create a table and a GET integration. You can retreived your data with the following Javascript:

```javascript
var { get } = require("easybasejs");
// ...
get("3ZL0JNhDVkuCf-c5"/* Extra options... */)
```

<br />

This integration might return something like: 
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

<br />

This function returns a react-ready JSON array that can be used and manipulated by your application. For more information on the `easybasejs` package, feel free to [read the documentation here](https://github.com/easybase/easybasejs).

<br />
<hr />
<br />

#### Easybase is easily extensible and features integrations to GET, POST, UPDATE, and DELETE your data. There are also visual integrations for HTML tables. [Learn more about EasyBase's mission here](/about).
