---
layout: blog
title:  The Easiest Way To Add User Authentication To Your React Project
date:   2020-11-25 11:50:03 -0400
categories: react
title_image: https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=750&h=550&fit=crop&crop=focalpoint&fp-x=0.6
title_image_sm: https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=90&fp-x=0.6
author_name: Ryan Parker
tags: Home React Easybase
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=600&h=600&ixid=eyJhcHBfaWQiOjF9&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.85
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
sidebar_video: https://www.youtube-nocookie.com/embed/-CbruClAFMY
meta_description: Learn how to add serverless user authentication to your React and React Native projects! The 'easybase-react' library makes it easy to provide unauthenticated users with the ability to sign up/create an account to your apps!
---

*Update 11/25/2020: easybase-react was recently upgraded to version 1.2.11 which brings performance improvements*

<hr />

[React](https://reactjs.org/) is a library that has allowed developers, novice or expert, to turn their ideas into reality. One of the primary benefits of developing front-end applications with React is the ability to deploy a project on multiple devices and web browsers.

One of the primary features of many web-based projects is the ability to have user authentication in which only those with proper credentials can access certain data. Whether that data is specific to that user or should be available to any signed-in user will depend on the goal of the application. The standard user authentication pattern is to provide unauthenticated users with the ability to sign up/create an account and to those with an account, the ability to sign in. Once signed in, the proper authentication tokens should be provided to the users so they can then access protected data.

Let's take a look at Easybase's 'Project' feature and React library. These will easily and securely fulfill the authentication pattern as stated above. Along with that, authenticated users can access specific data tables via a stateful and editable ['database array'](/react/2020/09/20/The-Best-Way-To-Add-A-Database-To-Your-React-React-Native-Apps/). This package works on both React and React Native.

<hr />

**1. Create a new project in Easybase.io**

<img data-src="/assets/images/posts_images/users-1.gif" alt="easybase create project" width="100%" data-jslghtbx class="custom-lightbox lazyload" />

Sign in to your [Easybase](https://app.easybase.io) account. Then, navigate to the 'Projects' tab, and create a new project. If you do not have an Easybase account, go create one. **The free tier covers almost all use cases**.

The service features a visual query builder and self-building API. Also, you have the ability to view your project's analytics on the fly!

<br />

**2. Install NPM library**

The only extra dependency is the 'easybase-react' npm module. To install that, navigate to your React or React Native project and do:
```cs
npm i easybase-react
```

For more information on this package, take a look at it's [Github page](https://github.com/easybase/easybase-react).

**3. Place ebconfig.js in project root**

Expand your newly created project and click 'download' to access your ebconfig token.

<img data-src="/assets/images/posts_images/users-2.gif" alt="easybase create React integration" data-jslghtbx class="custom-lightbox lazyload w-100" />

Download the file and place it in the root of your react project, next to App.js.

*Note: Under 'Permissions', select the tables that you would like your project to be able to access. User's can be associated with specific records in the table drawer or automatically when they insert/edit a record.*

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

The EasybaseProvider gives all child elements valid access the `useEasybase()` hook. This hook contains all the stateful functions that are used to interface with your data. Take a look at the documentation [here](/docs/easybase-react/).

<br />

**5. Allow un-authenticated users to sign in or sign up**

The **useEasybase()** hook provides three functions that are important for your menus workflow. Those being **isUserSignedIn**, **signIn**, and **signUp**. A simple implementation of this workflow could like:

```jsx
export default function ProjectUser() {
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const {
        isUserSignedIn,
        signIn,
        signUp,
        getUserAttributes
    } = useEasybase();

    if (isUserSignedIn()) {
        return (
            <div>
              <h2>You're signed in!</h2>
              <button className="btn" onClick={_ => getUserAttributes().then(console.log)}>
                Click me only works if your authenticated!
              </button>
              <FrameRenderer />
            </div>
        )
    } else {
        return (
          <div style={ { display: "flex", flexDirection: "column" } }>
              <h4>Username</h4>
              <input value={usernameValue} onChange={e => setUsernameValue(e.target.value)} />
              <h4>Password</h4>
              <input type="password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)} />
              <button className="btn" onClick={_ => signIn(usernameValue, passwordValue)}>
                Sign In
              </button>
              <button className="btn" onClick={_ => signUp(usernameValue, passwordValue)}>
                Sign Up
              </button>
          </div>
        )
    }
}
```

If a user has recently signed in, when navigating to this page on the same browser they will automatically be authenticated. Otherwise, once a user successfully signs in the components state will automatically be re-rendered and isUserSignedIn() will return *true*.

An authenticated user will then be able to access administrative functions such as **setUserAttribute**. More importantly, they will be able to retrieve an editable data array via **Frame()**.

<br />

**6. Map elements from Frame()**

In our 'FrameRenderer' component, we can now configure a **Frame()** instance and map it to React elements. Remember, the table that you retrieve data from needs to be enabled for *read* or *write* in your project's 'Permissions'. These elements can feature controls that, when manipulated, directly edit the object. When an object is directly edited, call **sync()** to synchronize your changes to the could database and re-render your component.

```jsx
import { useEffect } from "react";

export default function FrameRenderer() {
    const {
        Frame,
        configureFrame,
        sync,
        useFrameEffect
    } = useEasybase();

    useFrameEffect(() => {
      console.log("Frame updated!");
    });

    useEffect(() => {
        configureFrame({
            limit: 10,
            offset: 0,
            tableName: "My Table"
        });
        sync()
    }, []);

    return (
      <div style={ { display: "flex" } }>
        { Frame().map((ele, index) => <CardElement {...ele} index={index} key={index} />) }
      </div>
    )
}
```

*Important: Functions that are only meant for authenticated users, such as **sync()** and **setUserAttribute**, only work when an instance is signed in and is not accessible via an unauthorized user or third party.*


Regarding **Frame()**, we can think of the easybase-react lifecycle as follows:

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

[Learn more about Easybase's mission here](/about/)

User authentication and scalable database integration is an integral part of almost all production applications and services. At some point, a developer is going to need to be able to securely and asynchronously access their data from a fast & reliable source. [Easybase](https://easybase.io) is a cloud-service that makes developer's lives easier through a [serverless framework](/about/2021/01/30/What-Is-a-Serverless-Application/) and scalable database.

