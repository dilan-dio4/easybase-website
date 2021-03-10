---
layout: blog
title: How to use Easybase with React & React Native — Full Walkthrough
date:   2020-12-20 09:20:10 -0400
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=193&h=193&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.75
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
tags: React
meta_description: Comprehensive tutorial on using Easybase with React and React Native, featuring user authentication, visual queries, and serverless database.
---

### Table of Contents

* [Introduction](#introduction)
* [Setup](#setup)
* [React Configuration](#react-configuration)
* [Unauthenticated Database](#unauthenticated-database)
* [Sign In & Sign Up Workflow](#sign-in--sign-up-workflow)
* [Authenticated Database](#authenticated-database)
* [Visual Queries](#visual-queries)
* [Cloud Functions](#cloud-functions)
* [Conclusion](#conclusion)

<hr />

## Introduction

Since Easybase launched back in 2018, the platform's integration with React and React Native has grown immensely. This piece will serve as a comprehensive walkthrough of how developers can use Easybase to implement [serverless](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9) capabilities such as login authentication and a cloud database. These modules are not apart of vanilla React, but by using the `easybase-react` library you can create **scalable**, **production-ready** apps without worrying about security, session cache, and user token administration.

Let's walk through creating an application from scratch with Easybase. The example app here will be a product view, with user authentication and a private user database. Authenticated users will be able to '⭐' products and view them privately.

The **full source code** for this project is available on [Github](https://github.com/easybase/example-react-project). The code snippets below don't include styling for the sake of brevity, but the styling in the screenshots are available in [App.css](https://github.com/easybase/example-react-project/blob/master/src/App.css).

<br />

## Setup

After [creating an account](https://app.easybase.io/?view=signup), add a new table with your desired attributes. Don't worry, as tables are editable and you create more for the application at a later time.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react creating account" data-src="/assets/images/posts_images/react-1.png" />

This will open up a **blank** table. Feel free to add some records now manually, but we'll also implement this from the front-end of our application. Here's a table for reference:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react blank table" data-src="/assets/images/posts_images/react-2.png" />

Now, head to the projects tab (in the left-side drawer) and create a new project with a unique ID. It is in this menu that the *permissions* of the project can be configured. Created users and their corresponding attributes can be viewed in the 'Users' tab.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react new project" data-src="/assets/images/posts_images/react-3.png" />

After this is complete, there are two more items to be completed on this page.

1. Expand the newly created project and download your *ebconfig* token
2. Enable the checkbox for reading 'Read table records' (Users not signed in) in your table. Click **save**

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybaee react ebconfig token" data-src="/assets/images/posts_images/react-4.png" />
<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react project permissions" data-src="/assets/images/posts_images/react-5.png" />

We'll get to fetching authenticated user-corresponding records later, but for now, anyone can view **just** the products, **REACT DEMO**, table.

<br />

## React Configuration

Navigate to your React project. If you have do not have one, they are easy to setup. Don't worry if you're unfamiliar with creating React and React Native projects. If you don't have Node and npm installed on your machine, [download and install them here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). From there, it's as simple as **opening up your terminal** and doing `npx create-react-app ProjectName` for React or `npx create-react-native-app NativeProjectName` for React Native. Let this run through (it might take a couple of minutes). The output project structure should look something like this:

```
├── README.md
├── node_modules/
├── package.json
├── public/
└── src/
    ├── App.css
    ├── App.js
    ├── index.css
    └── index.js
```

Open up a terminal and navigate to your project root folder and install the `easybase-react` library:

```zsh
npm install easybase-react
```

Next, put the `ebconfig.js` file that you downloaded in the `src/` folder of your project. At this point, the structure of your project should look something like this:

```
├── README.md
├── node_modules/
│   ├── easybase-react/
│   └── ...
├── package.json
├── public/
└── src/
    ├── ebconfig.js
    ├── App.css
    ├── App.js
    ├── index.css
    └── index.js
```

The final step of this section is wrapping your root component in the `EasybaseProvider` component with your ebconfig token. Edit the `App.js` file with these changes:

```jsx
import './App.css';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig';

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </EasybaseProvider>
  );
}

export default App;
```

Note that we passed the project's *ebconfig* token as a prop to the `EasybaseProvider`. Just like that, you can access **full serverless functionality** in a React-lifecycle friendly and stateful manner!

<br />

## Unauthenticated Database

<div class="sectionBox">
<p>
  <b>Related functions:</b>
  <a href="/docs/easybase-react/modules/_useeasybase_.html" target="_blank">useEasybase</a>, 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#frame" target="_blank">Frame</a>, 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#configureframe" target="_blank">configureFrame</a>,
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#sync" target="_blank">sync</a>
</p>
</div>

For now, the application will have two pages. One for anybody to view the products in the **React Demo** table, and one for users to view the products they have individually starred. We're going to use a package called `react-router-dom` to give our application dynamic routing. Install this package with `npm i react-router-dom`. This step is not essential, but will very much increase the usability of the web app. I'm going to create two routes, `/` and `/starred` like so:

```jsx
import './App.css';
import { EasybaseProvider } from 'easybase-react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import ebconfig from './ebconfig';

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <HashRouter>
        <div style={ { display: "flex", justifyContent: "space-evenly", borderBottom: "1px grey solid" } }>
          <Link to="/"><h2>Home</h2></Link>
          <Link to="/starred"><h2>Starred</h2></Link>
        </div>
        <Switch>
          <Route path="/" exact>
            <p>Edit <code>src/App.js</code> and save to reload.</p>
          </Route>
          <Route path="/starred" exact>
            <p>Starred Products</p>
          </Route>
        </Switch>
      </HashRouter>
    </EasybaseProvider>
  );
}

export default App;
```

For reference, here's a screenshot of the current application **before** we implement data fetching and user authentication:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react current application" data-src="/assets/images/posts_images/react-6.png" />

Clicking either of the navigation links should change the current page to that inside the corresponding `Route` component. **Make sure you include `exact` in the link for `/`**.

Create a new component called `Home`. We will put this inside the `/` route. Since we are within an `EasybaseProvider` we can access the `useEasybase` hook. When this component mounts (`useEffect`), we want to use `configureFrame` to set `Frame()` to the **REACT DEMO** table. Call `sync()` to finalize these changes. Then, we can map the `Frame()` array to components for our products table. The objects within `Frame()` correspond to our table such that column names will be keys for our objects. Also, you can use `tableTypes()` in your code to view these programmatically.

Here's an implementation of the `Home` component reflecting these instructions.

```jsx
import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect } from "react";
import { HashRouter, Switch, Route, Link } from 'react-router-dom';

// ...

function Home() {
  const {
    configureFrame,
    sync,
    Frame
  } = useEasybase();

  useEffect(() => {
    configureFrame({ limit: 10, offset: 0, tableName: "REACT DEMO" });
    sync();
  }, [])

  return (
    <div style={ { display: "flex" } }>
      {Frame().map(ele => 
        <div>
          <a href={ele.amazon_link}><img src={ele.demo_image} /></a>
          <h4>{ele.product_name}</h4>
          <p>${ele.price}</p>
          <button onClick={() => {}}>⭐ Save for later ⭐</button>
        </div>
      )}
    </div>
  )
}
```

When our Home component first mounts in `useEffect()`, the frame is configured to limit the returned documents to 10 with an offset of 0. This is the limit and offset of documents that will be retrieved from your database. *limit* and *offset* are useful for adding pagination to your React project. Also, we must specify which table we are accessing at any given point. In this case, we are accessing the database available to guests in **REACT DEMO**.

We then map `Frame()` to a custom *card-like* component. For readability, I didn't include the CSS so this might not look too pretty but feel free to style this component yourself. This custom component features all of our table attributes, and clicking the image brings you to that product's page. The entire source for this project (including CSS) is available on [Github](https://github.com/easybase/example-react-project).

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react card components" data-src="/assets/images/posts_images/react-7.png" />

`Frame()` returns an array of objects. You can also do `Frame(index)` to access specific elements. **Calling `sync()` will pull down any changes from other sources and, if a user is authenticated with permissions, normalize any local changes made up to the cloud**.

The lifecycle of `Frame()` and related function:

```js
Frame Is Synchronized -->
useFrameEffect() runs -->
Edit Frame() -->
Call sync() -->
Frame Is Synchronized -->
useFrameEffect() runs
```

<br />

## Sign In & Sign Up Workflow

<div class="sectionBox">
<p>
  <b>Related functions:</b> 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#signin" target="_blank">signIn</a>, 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#signout" target="_blank">signout</a>, 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#signup" target="_blank">signUp</a>, 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#isusersignedIn" target="_blank">isUserSignedIn</a>,
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#setuserattribute" target="_blank">setUserAttribute</a>,
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#getuserattributes" target="_blank">getUserAttributes</a>
</p>
</div>

Now that guests can view the **REACT DEMO** table. Let's implement a workflow for those same users to be able to sign up/sign in to your application. This will allow for a few things:

1. Read/write permissions to tables detailed in the 'Projects' menu
2. Writing records that are specifically assigned to that user, so when this user signs in we will automatically only retrieve records that correspond to that user when they navigate to `/starred`.

Let's add a component called `<AuthButton />` to the root App. This component will have two features. One is a button in the top-right corner of the app that says 'Sign In' or 'Sign Out' based on the user's state. The other being a modal that will appear above our application when a user clicks 'Sign In'. The modal will feature a username and password text field and buttons to sign in or sign up. **Use the `isUserSignedIn()` function to conditionally render components and check the user's current authentication status**.

Here's an implementation of this workflow:

```jsx
function AuthButton() {
  const {
    isUserSignedIn,
    signIn,
    signOut,
    signUp
  } = useEasybase();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onAuthButtonClick = () => {
    if (isUserSignedIn()) {
      signOut();
    } else {
      setDialogOpen(true);
    }
  }

  const onSignInClick = async () => {
    const res = await signIn(usernameValue, passwordValue);
    if (res.success) {
      setDialogOpen(false);
      setUsernameValue("");
      setPasswordValue("");
    }
  }

  const onSignUpClick = async () => {
    const res = await signUp(usernameValue, passwordValue);
    if (res.success) {
      await signIn(usernameValue, passwordValue);
      setDialogOpen("");
      setUsernameValue("");
      setPasswordValue("");
    }
  }

  /*
    .authButton {
      position: absolute;
      top: 10px;
      right: 50px;
      width: 100px;
      height: 50px;
      font-size: 15px;
    }

    .authDialog {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.7);
      transition: opacity 500ms;
      visibility: hidden;
      opacity: 0;
    }

    .authDialogOpen {
      visibility: visible;
      opacity: 1;
    }
  */

  return (
    <>
      <button onClick={onAuthButtonClick} className="authButton">{isUserSignedIn() ? "Sign Out" : "Sign In"}</button>
      <div className={dialogOpen ? "authDialog authDialogOpen" : "authDialog"}>
        <div>
            <input type="text" placeholder="Username" value={usernameValue} onChange={e => setUsernameValue(e.target.value)} />
            <input type="password" placeholder="Password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)} />
            <div>
              <button onClick={onSignInClick}>Sign In</button>
              <button onClick={onSignUpClick}>Sign Up</button>
            </div>
        </div>
      </div>
    </>
  )
}
```

Just like that, your application supports a *stateful* user authentication workflow. The `signIn`, `signOut`, and `signUp` function are asynchronous, so you can use `await` or `.then` to handle the completion of these events.

You can also assign user attributes which can be seen when navigating to the 'Users' tab in easybase.io and expanding one of the rows. These can be assigned in a couple of ways.

1. Manually, in one of the rows under the 'Users' tab in Easybase.
2. Pass an object in `signUp(newUserID, password, { emailAttribute: "bob@gmail.com" })`. 
3. If a user is signed in, `setUserAttribute("emailAttribute", "bob@gmail.com")`

You can then retrieve these objects programmatically with `getUserAttributes()`. **User attributes are not for storing user-corresponding application data**, rather use it for simple metadata such as *createdAt* or *firstName*.

For more information on implementing login authentication in React Native, take a look at [Michael's article in freeCodeCamp](https://www.freecodecamp.org/news/build-react-native-app-user-authentication/).

<br />

## Authenticated Database

<div class="sectionBox">
<p>
  <b>Related functions:</b> 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#frame" target="_blank">Frame</a>, 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#configureframe" target="_blank">configureFrame</a>,
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#sync" target="_blank">sync</a>, 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#addrecord" target="_blank">addRecord</a>, 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#deleterecord" target="_blank">deleteRecord</a>
</p>
</div>

A common situation for applications is storing data that corresponds to the **currently signed-in user**. For our example app, users should be able to save products for later in the `/starred` route. Let's create a new table called 'USER STARS' that will have a similar structure, but with user correspondence.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react user database" data-src="/assets/images/posts_images/react-8.png" />

Give your project permissions to read and write 'User associated records'. **Be sure to click save.**

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react read and write" data-src="/assets/images/posts_images/react-9.png" />

Let's edit our card-like component to handle a user click. There's two ways to add a record to table with the `useEasybase()` hook. Pushing a new records to a configured `Frame()` followed by calling `sync()` or using the `addRecord()` function where we can specify the table *on-site*. Note that for uploading media, use either `updateRecordFile()`, `updateRecordImage()`, or `updateRecordVideo()`. Here's changes to our `Home` component using the `addRecord()` function so signed-in users can star products:

```jsx
function Home() {
  const {
    configureFrame,
    sync,
    Frame,
    isUserSignedIn,
    addRecord
  } = useEasybase();

  useEffect(() => {
    configureFrame({ limit: 10, offset: 0, tableName: "REACT DEMO" });
    sync();
  }, [])

  const handleStarClick = (ele) => {
    if (isUserSignedIn()) {
      addRecord({ tableName: "USER STARS", newRecord: {
        product_name: ele.product_name,
        amazon_link: ele.amazon_link
      } })
    }
  }

  return (
    <div style={ { display: "flex" } }>
      {Frame().map(ele => 
        <div>
          <a href={ele.amazon_link}><img src={ele.demo_image} /></a>
          <h4>{ele.product_name}</h4>
          <p>${ele.price}</p>
          <button onClick={_ => handleStarClick(ele)}>⭐ Save for later ⭐</button>
        </div>
      )}
    </div>
  )
}
```

Now when a signed-in user stars a product, we can refresh our table and see a new element. Notice in the drawer we can see a new section called **· Associated Users**.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react associated users" data-src="/assets/images/posts_images/react-10.png" />

Detailed in this section is the user that starred the item. Now let's see how easy it is to *query* for just these records in the `/starred` route. Remember we set permissions to only be able to read user-associated records from **USER STARS**. So, we just need to set up a standard `Frame()` configuration and map theme to some component. Make a new component called `Starred` that will go in the `/starred` route.

```jsx
function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <HashRouter>
        <div>
          <Link to="/"><h2>Home</h2></Link>
          <Link to="/starred"><h2>Starred</h2></Link>
        </div>
        <AuthButton />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/starred" exact>
            <Starred />
          </Route>
        </Switch>
      </HashRouter>
    </EasybaseProvider>
  );
}

// ...

function Starred() {
  const {
    configureFrame,
    sync,
    Frame,
  } = useEasybase();

  useEffect(() => {
    configureFrame({ limit: 10, offset: 0, tableName: "USER STARS" });
    sync();
  }, [])

  return (
    <div style={ { display: "flex" } }>
      {Frame().map(ele => 
        <div className="cardRoot">
          <a href={ele.amazon_link}>{ele.product_name}</a>
        </div>
      )}
    </div>
  )  
}
```

Navigate to the starred route with a signed-in user and we can see we **securely** and **successfully** display records that the user has starred.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react secure records" data-src="/assets/images/posts_images/react-11.png" />

Note that `Frame()` acts just like a plain array, so manipulate it however is necessary, then just call `sync()` to have changes normalized in your remote React database. For example, if you want to delete an element you could do `Frame().splice(index, 1)`, `Frame().pop()`, or `deleteRecord( record: Frame(2), tableName: "REACT DEMO" )`. Edit a table record just as you would a plain object with `Frame(2).product_name = "My Product"`.

<br />

## Visual Queries

<div class="sectionBox">
<p>
  <b>Related functions:</b> 
  <a href="/docs/easybase-react/interfaces/_reacttypes_.contextvalue.html#query" target="_blank">Query</a>
</p>
</div>

One of the most *accessible* features of Easybase is the ability to **build queries visually, then call them by name in code**. Open up your **REACT DEMO** table and navigate to the 'Query' tab. I'm going to build a simple query that filters for products with a price of over $100. Click the blue 'Save' button and save the query with the name "price filter".

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-12.png" />

Add a route to your application called `/over100`. Create a new component, I'll call mine `FilterExample`. In your root `App` component, assign this component to the new route. Programmatically we can use the `Query()` function to access our saved queries. Here's my `FilterExample` component:

```jsx
function FilterExample() {
  const {
    Query
  } = useEasybase()

  const [arr, setArr] = useState([]);

  useEffect(() => {
    Query({ queryName: "price filter", tableName: "REACT DEMO" }).then(res => {
      setArr(res);
    });
  }, [])

  return (
    <div style={ { display: "flex" } }>
      {arr.map(ele =>
        <div className="cardRoot">
          <a href={ele.amazon_link}><img src={ele.demo_image} /></a>
          <h4>{ele.product_name}</h4>
          <p>${ele.price}</p>
        </div>
      )}
    </div>
  )
}
```

I'm using the same *card-like* component from our `Home` component. Here's a screenshot of my web app for reference ([full source available here](https://github.com/easybase/example-react-project)):

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual component" data-src="/assets/images/posts_images/react-13.png" />

Note that there are other *optional* parameters for the `Query()` function such as *sortBy* and *limit*. One of the most **powerful** options is the ability to add a *customQuery* object to overwrite the values detailed in the visual query. The structure and function of the query stay the same, but you can edit the values that are queried. For example, if we wanted to look for products with a price of over $12 rather than $100. We can set the *customQuery* parameter to `{ price: 12 }` programmatically. This is suited well for situations in which you have **conditional options in your interface that affect the current query**.

<br />

## Cloud Functions

<div class="sectionBox">
<p>
  <b>Related functions:</b> 
  <a href="/docs/easybase-react/modules/_callfunction_.html#callfunction" target="_blank">callFunction</a>
</p>
</div>

Easybase's serverless functions allow you to trigger code snippets running behind the cloud. These event-driven functions can be updated live in the Easybase code editor without changing your application code. You can deploy, edit and test functions effectively in the *Functions* interface.

There are many benefits to using cloud functions for your application, including responsive scaling, lower cost, and the ability to hide processes from your front-end. Furthermore, developers don't have to manually track analytics or worry about the portability of their code. For a deeper dive into cloud functions with React, [this resource will demonstrate how to easily deploy cloud functions](/react/2021/03/09/The-Easiest-Way-To-Deploy-Cloud-Functions-for-your-React-Projects/) with React and React Native.

Use the **Create Dialog** to deploy a new function:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-14.png" />
<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-15.png" />

I'll use the **Async** template. If we expand the **deploy** menu, we can use the **testing** tab to run this function and display the result. The template that I specifically selected will call an external API to get the most recent price of Bitcoin, in USD.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-16.png" />

If we add rows to the **Input** section, those values will be available in the function's `event.body`. **We'll see later that the same applies for calling our functions in code.** I'm going to edit the function to return the parameters that are sent in **Input**, save it, and show the output below. `context.succeed()` and `context.fail()` will return variables that are available as strings to your client-side application.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-17.png" />
<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-18.png" />

Node is well-known for its iconic package management system. To **install dependencies** for your cloud function, simply add the package name and version to the `dependencies` section of the `package.json`. No need to deal with the `node_modules/` folder. Dependencies will automatically be installed every time you save your function based on your root `package.json`.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-19.png" />

Now you can import that module into your code. Once saved, use the **testing** tab to see the dependency is working properly.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-21.png" />
<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-22.png" />

Packages, and their corresponding version, are available on [npmjs.com](https://www.npmjs.com/).

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-20.png" />

To call your function in React or React Native, import `callFunction` as you would `EasybaseProvider`, then pass in the unique route found under the **Deploy** tab. It is under this tab you will also be able to find more information about calling your function in production. You can use either `await callFunction(...)` or `callFunction(...).then(res)` to get the response of the function as a string. Your code may look like the following:

```jsx
import { useEasybase, callFunction } from 'easybase-react';

export default function() {
    async function handleButtonClick() {
        const response = await callFunction('d6f217bde0b6b4d-my-function', {
            hello: "world",
            message: "Find me in event.body"
        });

        console.log("Cloud function: " + response);
    }

    //...
}
```

<br />

## Conclusion

Deploying a serverless React or React Native application is made accessible with Easybase.io + `easybase-react`. Take a look at the [Github repo](https://github.com/easybase/easybase-react) for some more information on *usage* and *installation*. We **successfully created a web app** that features a backend database, user authentication, sign in/sign up workflow, easy-to-use visual queries, and secure user-corresponding backend storage. Also, we demonstrated how to deploy cloud functions that can be called by name in your React and React Native code.

Thanks a lot for reading! Please be sure to **share this article** using the social buttons below. Regarding any questions or concerns, feel free to use the 'Leave a message' form.

**Read more**:

* [Customizing Query Values](/about/2020/09/15/Customizing-query-values/)
* [User Authentication](/react/2020/11/25/The-Easiest-Way-To-Add-User-Authentication-To-Your-React-Project/)
* [Serverless Database](/react/2020/09/20/The-Best-Way-To-Add-A-Database-To-Your-React-React-Native-Apps/)