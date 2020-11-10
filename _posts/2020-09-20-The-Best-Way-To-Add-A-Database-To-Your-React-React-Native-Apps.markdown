---
layout: blog
title:  The Best Way to Add a Database to Your React & React Native Apps	
date:   2020-09-20 10:39:03 -0400
categories: react
title_image: https://miro.medium.com/max/1540/0*GLIaE22XTwF0lc5J
tags: Home React EasyBase
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=600&h=600&ixid=eyJhcHBfaWQiOjF9&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.85
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for EasyBase. He has previously written and contributed to various tech-related publications.
sidebar_video: https://www.youtube-nocookie.com/embed/-CbruClAFMY
meta_description: EasyBase is a fantastic serverless solution for React & React Native developers. The 'easybase-react' npm module makes it extremely easy to integrate your free cloud database!
---

*Update 11/2/2020: easybase-react was recently upgraded to version 1.1.9 which brings performance and usability improvements*

<hr />

Cloud databases are all-the-rage nowadays, especially with this new wave of wildly popular front-end frameworks including [Vue](https://vuejs.org/), [Angular](https://angular.io/), and [React](https://reactjs.org/). These modules have allowed beginners and exports turn their ideas into reality. Furthermore, they can deploy their applications on all kinds of devices.

Furthermore, serverless computing have empowered developers with the ability to be extremely agile in their technology stack. These services make it easy to deploy cloud-native applications in a scalable and cost-effective manner. 

Let's take a look at Easybase's React library which creates a stateful and editable 'database array' in your React projects. This package works on both React and React Native.

<hr />

**1. Create a new REACT integration in your Easybase table**

<img data-src="/assets/images/posts_images/react-integration-3.gif" alt="easybase create React integration" width="100%" data-jslghtbx class="custom-lightbox lazyload" />

Sign into your [Easybase](https://app.easybase.io) account, navigate to the 'query' view, and create this integration. If you do not have an Easybase account, go create one. **The free tier covers almost all use cases**.

The service features a visual query builder and self-building API. Forget complicated DBMS query syntax and difficult microservices. With just a few clicks, your database will be ready to serve thousands of records to your apps for free!

<br />

**2. Install NPM library**

The only extra dependency is the 'easybase-react' npm module. To install that, navigate to your React project and do:
```cs
npm i easybase-react
```

<br />

**3. Place ebconfig.json in project root**

Open up your newly created REACT integration and navigate to the 'React Token' section of the drawer. 

<img data-src="/assets/images/posts_images/token.png" alt="easybase create React integration" data-jslghtbx class="custom-lightbox lazyload" />

Download the file and place it in the root of your react project, next to App.js.

*Note: Within the integration drawer be sure to enable read and write. While developing your application on localhost enable testing within the drawer as well. Before deploying, whitelist IPs and web addresses that that are allowed to access the database.*

<br />

**4. Wrap root component in EasybaseProvider**

```jsx
import React, { useEffect } from "react";
import { EasybaseProvider, useEasybase } from "easybase-react";
import ebconfig from "./ebconfig.json";

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Container />
    </EasybaseProvider>
  );
}
```

<br />

The EasybaseProvider gives all child elements valid access the useEasybase() hook. This hook contains all the stateful functions that are used to interface with your data.

<br />

**5. Map elements from Frame()**

In our 'Container' component, we want to take our **Frame()** and map it to React elements. These elements can feature controls that, when manipulated, directly edit the object. When an object is directly edited, call **sync()** to synchronize your changes to the could database and re-render your component.

```jsx
function Container() {
  const {
    Frame,
    useFrameEffect,
    configureFrame,
    sync
  } = useEasybase();

  useEffect(() => {
    configureFrame({ limit: 10, offset: 0 });
    sync();
  }, []);

  useFrameEffect(() => {
    console.log("Frame data changed!");
  });

  const onChange = (index, column, newValue) => {
      Frame(index)[column] = newValue;
      sync();
  }

  return (
    <div>
      {Frame().map(ele => <Card frameEle={ele} onChange={onChange} index={index}  />)}
    </div>
  )

}
```

<br />

So let's walkthrough what is going on here. When our components first mounts in **useEffect()**, we configure our Frame size to be of length 10. This is the limit of documents that will be retrieved from your database. *limit* and *offset* are useful for adding pagination to your React project.

In our return statement. We are mapping **Frame()** to some custom component called 'Card'. Remember, **Frame()** returns an array of objects, while **Frame(index)** will return a single object at that index. After manipulating any of the objects in your frame, calling **sync()** will push your changes to the cloud and pull down any changes from other sources.

*Note: If sync() sees you have made changes locally OR have changes in your database that are not local, Frame() gets set to normalized array [with the proper configuration from configureFrame()] and then runs useFrameEffect() to notify the component that the Frame has changed.*

Next, we pass the callback **onChange()** to our Card component. When a user wants to edit the elements attributes via the Card, the change get passed back to this container with the index, column name, and new value. We use these parameters to find that element and update the column to the new value. Lastly, we call **sync()** to push the change to our cloud database and trigger **useFrameEffect()**.

Let's think of the easybase-react lifecycle as follows:

```js
Frame Is Synchronized ->
useFrameEffect() runs ->
Edit Frame() ->
Call sync() ->
Frame Is Synchronized ->
useFrameEffect() runs
```

<hr />

## **Conclusion**

<br />

<!-- [Walkthrough building a working example with easybase-react](/react/2020/11/02/Going-Serverless-With-The-Easiest-React-Database-Tutorial/) -->

[Learn more about EasyBase's mission here](/about)

A database is an integral part of almost all production applications and services. At some point, a developer is going to need to be able to asynchronously access their data from a fast & reliable source. [Easybase](https://easybase.io) is a cloud-service that makes developer's lives easier through a serverless framework and scalable database.

