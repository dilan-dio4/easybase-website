---
layout: blog
title: 3 Libraries That Every New React Native Developer Should Learn
date: 2021-01-13 12:00:15 -0400
categories: react
title_image: https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80
author_name: Ryan Parker
tags: Home React EasyBase
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=600&h=600&ixid=eyJhcHBfaWQiOjF9&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.85
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for EasyBase. He has previously written and contributed to various tech-related publications.
sidebar_video: https://www.youtube-nocookie.com/embed/-CbruClAFMY
meta_description: React Native is a super popular framework for creating cross-platform applications. Let's take a look at 3 great libraries that are essential for your next project!
---

React Native is one of the best frameworks for writing mobile-friendly applications. It's **super-fast**, uses common programming patterns, and hooks right into the native operating system. No wonder aspiring developers and teams continue to adopt React and [React Native](/react/2020/09/20/The-Best-Way-To-Add-A-Database-To-Your-React-React-Native-Apps/) for their projects.

Although the learning curve can be somewhat steep, there is no question that [React is the most popular application library](https://trends.google.com/trends/explore?cat=31&q=Vue.js,React,Angular), by far. This popularity helps its sister library, React Native, *dominate* the mobile scene as well.

There are a couple of modules required for production-ready applications that are not included in vanilla React Native. This is because many of these modules need some sort of backend to handle storage, session cache, and token administration. Fortunately, [serverless programming](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9) has empowered the web and application developer by adding these capabilities to standalone frontend projects. These technologies *greatly lower the barrier-of-entry* to application development systems.

We're going to take a look at 3 easy-to-use libraries that either **implement** these serverless features or **help** applications use them.

<hr />

# 1. **react-native-ui-lib**

## [Github](https://github.com/wix/react-native-ui-lib)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-native-ui-lib)

A solid UI component library is important to almost every React Native project. These libraries will give your application the same *look* and *feel* across different devices, as opposed to the default native component that is not standard across operating systems.

React-native-ui-lib is a great solution for this. Although it's not the most popular of the bunch, the components are concise, mature, and will be **super useful** when interfacing with the data from your serverless modules. For example, implementing a sign in / sign up login authentication view or displaying data retrieved from a cloud database.

Here's a demonstration of the components in this library. It's easy to see how these will be useful when it comes to **visualizing** and **interfacing** with backend data.

<img src="https://wix.github.io/react-native-ui-lib/static/accessibility-1cc0827012a0abcc8db0447d3fd7ed7f.gif" alt="react native ui lib example" class="custom-lightbox" data-jslghtbx height="500" />

<br />

Just move the component imports from 'react-native' to 'react-native-ui-lib'!

```jsx
import React, {Component} from 'react';
import {View, Text, Card, Button} from 'react-native-ui-lib';

class MyScreen extends Component {
  render() {
    return (
      <View flex>
        <Text heading>My Screen</Text>
        <Card height={100} center>
          <Text body>This is an example card </Text>
        </Card>
        
        <Button label="Button" body square></Button>
      </View>
    );
  }
}
```

<br />

# 2. **easybase-react**

## [Github](https://github.com/easybase/easybase-react)
![npm bundle size](https://img.shields.io/bundlephobia/min/easybase-react)

This library will provide the serverless capabilities that turn your project from simply a user interface to a **fullstack application**. The only prerequisite is creating a [free account](https://app.easybase.io/?view=signup).

From there, you can create a [real-time database](/react/2020/09/20/The-Best-Way-To-Add-A-Database-To-Your-React-React-Native-Apps/) or implement [login authentication](/react/2020/11/25/The-Easiest-Way-To-Add-User-Authentication-To-Your-React-Project/). This library provides the modules right *in-the-box*. So, there's no need to create your own backend service when all the necessary functions are available through the `useEasybase()` hook!

Just wrap your root component in the `EasybaseProvider` then pass your provided token. This token is obtained by creating a *Project* or *Integration* in Easybase.

```jsx
import { EasybaseProvider, useEasybase } from "easybase-react";   
import ebconfig from "ebconfig.js";    

function App() {
    return (
        <EasybaseProvider ebconfig={ebconfig}>
            <ProjectUser />
        </EasybaseProvider>
    )
}

function ProjectUser() {
  const { isUserSignedIn, signIn, signUp } = useEasybase();

  if (isUserSignedIn()) {
    return (
      <div>
        <h2>You're signed in!</h2>
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
        <button onClick={_ => signIn(usernameValue, passwordValue)}>
          Sign In
        </button>
        <button onClick={_ => signUp(usernameValue, passwordValue)}>
          Sign Up
        </button>
      </div>
    )
  }
}
```

It's that easy! For more information on using Easybase, `easybase-react` and React/React Native, [take a look at the comprehensive walkthrough here](/react/).

<br />

# 3. **react-native-fs**

## [Github](https://github.com/itinance/react-native-fs)

If you foresee a situation in which you are going to want to **synchronize files** between a user's device and Easybase, this library is great for interacting with the local file system. Reading files with this library work great with the `updateRecordFile()` function from `useEasybase()` to send files to your *cloud* database. (For images, use [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)).


Beyond that, there are plenty of other use cases for accessing a device's local file system. For example, a developer may want to see if any PDF files are available to scan or store voice memos locally.

Here's how easy it is to **log all file contents** from the main directory:

```jsx
var RNFS = require('react-native-fs');

RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    console.log('GOT RESULT', result);
    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  })
  .then((statResult) => {
    if (statResult[0].isFile()) {
      return RNFS.readFile(statResult[1], 'utf8');
    }
    return 'no file';
  })
  .then((contents) => {
    console.log(contents);
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });
```
