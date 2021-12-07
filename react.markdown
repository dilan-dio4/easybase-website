---
layout: blog-guide
title: How to use Easybase with React & React Native — Full Walkthrough
date: 2020-12-20 09:20:10 -0400
date_modified: 2021-09-20 05:00:15 -0400
title_image: /assets/images/react-hero.png
og_image: /assets/images/og_white_black.png
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=100&fm=jpg&cs=tinysrgb&w=85&h=85&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.75
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
tags: React
meta_description: Comprehensive tutorial on using Easybase with React and React Native, featuring user authentication, visual queries, and serverless database.
tocTitles: ["Introduction", "Setup", "React Configuration", "Database", "useReturn", "Upload Media", "Sign In & Sign Up Authentication", "Authenticated Database", "Visual Queries", "Google Analytics Integration", "Conclusion"]
tocLinks: ["#introduction", "#setup", "#react-configuration", "#database", "#usereturn", "#upload-media", "#sign-in--sign-up-authentication", "#authenticated-database", "#visual-queries", "#google-analytics-integration", "#conclusion"]
---

## Introduction

Since Easybase launched a few years back, the platform's integration with React and React Native has grown immensely. This piece will serve as a comprehensive walkthrough of how developers can use Easybase to implement [serverless](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9) capabilities such as login authentication and a cloud database. These modules are not apart of vanilla React, but by using the `easybase-react` library you can create **scalable**, **production-ready** apps without worrying about security, session cache, and user token administration.

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
2. Enable the checkbox for 'Read table records' and 'Write table records' (Users not signed in) in your table. **Click save.**

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybaee react ebconfig token" data-src="/assets/images/posts_images/react-4.png" />
<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react project permissions" data-src="/assets/images/posts_images/react-5.png" />

We'll get to fetching authenticated user-corresponding records later, but for now, anyone can view and add products to the **REACT DEMO** table.

<br />

## React Configuration

Navigate to your React project. If you have do not yet have one, they are easy to set up. Don't worry if you're unfamiliar with creating React and React Native projects, as it takes less than 5 minutes.

If you don't have Node and npm installed on your machine, [download and install them here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). From there, it's as simple as **opening up your terminal** and doing `npx create-react-app ProjectName` for React or `npx create-react-native-app NativeProjectName` for React Native. Let this run through (it might take a couple of minutes). The output project structure should look something like this:

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

<!-- {% raw %} -->
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
<!-- {% endraw %} -->

Note that we passed the project's *ebconfig* token as a prop to the `EasybaseProvider`. Just like that, you can access **full serverless functionality** in a React-lifecycle friendly and stateful manner!

<br />

## Database

<div class="sectionBox">
<p>
  <b>Related functions:</b>
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html" target="_blank">useEasybase</a>, 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#db" target="_blank">db</a>, 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#usereturn" target="_blank">useReturn</a>
</p>
</div>

For now, the application will have two pages. One for anybody to view the products in the **React Demo** table, and one for users to view the products they have individually starred. We're going to use a package called `react-router-dom` to give our application dynamic routing. Install this package with `npm i react-router-dom`. This step is not essential, but will very much increase the usability of the web app. Here's two routes, `/` and `/starred`:

<!-- {% raw %} -->
```jsx
import './App.css';
import { EasybaseProvider } from 'easybase-react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import ebconfig from './ebconfig';

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <HashRouter>
        <div style={{ display: "flex", justifyContent: "space-evenly", borderBottom: "1px grey solid" }}>
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
<!-- {% endraw %} -->

For reference, here's a screenshot of the current application **before** we implement data fetching and user authentication:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react current application" data-src="/assets/images/posts_images/react-6.png" />

Clicking either of the navigation links should change the current page to that inside the corresponding `Route` component. **Make sure you include `exact` in the link for `/`**.

Create a new component called `Home`. We will put this inside the `/` route. Since we are within an `EasybaseProvider` we can access the `useEasybase` hook. This hook is how we can statefully interface with Easybase functions within our components.

### Return

**To query the database we will [use a function called `db()`](https://easybase.github.io/EasyQB/) exported from the `useEasybase` hook**. This function is a query builder that allows you to create [**Select**,](https://easybase.github.io/EasyQB/docs/select_queries.html) [**Insert**](https://easybase.github.io/EasyQB/docs/select_queries.html), [**Update**](https://easybase.github.io/EasyQB/docs/update_queries.html), and [**Delete**](https://easybase.github.io/EasyQB/docs/update_queries.html) queries, in code.

This walkthrough will demonstrate basic usage of the `db()` function, but this is a powerful query builder with many options and aggregators. You'll want to take a look at [the documentation for the query builder](https://easybase.github.io/EasyQB/) for advanced usage.

<div class="sectionBox">
<p>

This section will show how to use <code class="highlighter-rouge">db().return</code> to easily perform inline queries within your JavaScript code, but <b>the next section will demonstrate how the <a href="#usereturn"><code class="highlighter-rouge">useReturn</code></a> hook can be used to always keep your data fresh</b> based on state changes and other executions of <code class="highlighter-rouge">db().insert</code>, <code class="highlighter-rouge">db().delete</code>, and <code class="highlighter-rouge">db().set</code> across your project.

</p>
</div>

Our `Home` components will have a stateful variable called `easybaseData`. When this component mounts (`useEffect`), we want to set this to the **REACT DEMO** table with the `.db` function. Then, we map the `easybaseData` array to components for our products table. The objects within `easybaseData` correspond to our table; the Easybase column names are the keys of the objects. *Note that you can use `tableTypes()` to view these programmatically*.

Each record in the `easybaseData` will have an added attribute column called `_key`, which is a **persistent, unique identifier** that is useful for updating or deleting specific records.

Here's an implementation of the `Home` component:

<!-- {% raw %} -->
```jsx
import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";
import { HashRouter, Switch, Route, Link } from 'react-router-dom';

// ...

function Home() {
  const [easybaseData, setEasybaseData] = useState([]);
  const { db } = useEasybase();

  const mounted = async() => {
    const ebData = await db("REACT DEMO").return().limit(10).all();
    setEasybaseData(ebData);
  }

  useEffect(() => {
    mounted();
  }, [])

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {easybaseData.map(ele => 
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
<!-- {% endraw %} -->

The process of *Home* mounting in `useEffect()`:

1. Run an async function called `mounted` (allows us to use `await` keyword)
2. Create a table instance with `db("TABLE NAME")`
3. Use [`.return`](https://easybase.github.io/EasyQB/docs/select_queries.html#select) to perform a **Select** query
4. Limit the query to 10
5. Execute the query with `.all`, could use `.one` to execute queries as well
6. Set `easybaseData` to the returned result

**Note**: use [`.where`](https://easybase.github.io/EasyQB/docs/select_queries.html#where) to filter queries with [powerful operators](https://easybase.github.io/EasyQB/docs/operations.html).

Remember, in this case we are accessing the table **REACT DEMO** which we made readable to guests, so users don't need to be signed in to execute this query.

We then map our retrieved data to a custom *card-like* component. For sake of brevity, I didn't include the CSS so the cards may not look too pretty but feel free to style this component yourself. The entire source for this project (including CSS) is available on [Github](https://github.com/easybase/example-react-project).

This custom component features all of our table attributes, and clicking the image brings you to that product's page.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react card components" data-src="/assets/images/posts_images/react-7.png" />

Executing a [`.return`](https://easybase.github.io/EasyQB/docs/select_queries.html#select) statement with `.all` returns an array of objects, whereas `.one` only returns the first object. Use [aggregators](https://easybase.github.io/EasyQB/docs/select_queries.html#aggregate) in [`.return`](https://easybase.github.io/EasyQB/docs/select_queries.html#select) to perform arithmetic on returned columns.

### Insert

It's very easy to insert data with [`db().insert({ [key]: [value] }).one()`](https://easybase.github.io/EasyQB/docs/insert_queries.html). Let's implement a button that appends a new card to the data. There are many different ways to capture user input on a website (dialogs, text boxes, etc.), but in this example, I'll use the [`prompt()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt) function that is built-in modern web browsers.

Start with a new component called **AddCardButton**. We'll use a callback from **Home** to alert to re-mount `data` after the insertion.

Clicking our button calls prompt four times, once for each attribute. Attributes that are not passed into [`db().insert`](https://easybase.github.io/EasyQB/docs/insert_queries.html) are automatically cast to *null*.

We then use those prompted inputs in a `db().insert` call, followed by the callback [which we will not need with [**useReturn**](#usereturn), as shown below].

Here's an implementation of this new **AddCardButton** component. Remember add it as a child to **Home**:

<!-- {% raw %} -->
```jsx
function AddCardButton({ callback }) {
  const { db } = useEasybase();

  const handleAddCardClick = async () => {
    try {
      const inLink = prompt("Please enter an Amazon link", "https://...");
      const inImage = prompt("Please enter an image link", "https://...");
      const inName = prompt("Please enter a product name", "");
      const inPrice = prompt("Please enter a price as a number", "14.24");
      if (!inPrice || !inName || !inImage || !inLink) return;

      await db('REACT DEMO').insert({
        amazon_link: inLink,
        product_name: inName,
        price: Number(inPrice),
        demo_image: inImage
      }).one();
      callback();
    } catch (_) {
      alert("Error on input format")
    }
  }

  return (
    <button
      onClick={handleAddCardClick}
      className="insertCardButton"
    >
      + Add Card
    </button>
  )
}

function Home() {
  // ...

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {easybaseData.map(ele => 
        <div>
          <a href={ele.amazon_link}><img src={ele.demo_image} /></a>
          <h4>{ele.product_name}</h4>
          <p>${ele.price}</p>
          <button onClick={() => {}}>⭐ Save for later ⭐</button>
        </div>
      )}
      <AddCardButton callback={mounted} /> {/* <--- */}
    </div>
  )
}
```
<!-- {% endraw %} -->


<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react insert card components 1" data-src="/assets/images/posts_images/react-insert-1.png" />

Try out the new button with proper inputs. The record will appear in the web application **and** in your Easybase table!

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react insert card components 2" data-src="/assets/images/posts_images/react-insert-2.png" />

<br />

## useReturn

<div class="sectionBox">
<p>
  <b>Related functions:</b>
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html" target="_blank">useEasybase</a>, 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#usereturn" target="_blank">useReturn</a>,
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#db" target="_blank">db</a>
</p>
</div>

With the method demonstrated above, you would have to manually re-fetch your data after changes are made across the app to keep your main data fresh, with a method like callbacks. This can get unnecessarily complicated if you are using multiple components with different patterns.

The **useReturn** function is an alternate, lifecycle-friendly hook to `db().return` statements that subscribe to state changes and other `db` executions. **This is the preferred way to keep a fresh, stateful data array in your project**.

The `useReturn` hook automatically re-fetch the data of a given query, similar to how the `useEffect` hook runs a function when certain variables change. `.return` queries are built in the exact same way, **just don't call `.all` or `.one`**.

Imagine a situation in which your data had an attribute called *rating* and your app had an input that controls a state variable called *minRating*. The `useReturn` hook would keep your data [called `frame`] fresh as this variable is changed: 

<!-- {% raw %} -->
```js
const [minRating, setMinRating] = useState(0);
const { db, e, useReturn } = useEasybase();

// 1st param is a function, returning a `db().return` instance
// 2nd param is dependencies that cause a re-fetch when changed
const { frame } = useReturn(() => db().return().where(e.gt('rating', minRating)),
  [minRating]);
```
<!-- {% endraw %} -->

**There are two types of events that will cause a re-fetch of the data in *frame***:
1. One of the stateful variables in the *deps* array changed, similar to useEffect
2. Another instance of `db()` did an **Update**, **Insert**, or **Delete** that might affect the data in *frame*

Let's convert the demonstration in the above section to the React-first `useReturn` hook:

<!-- {% raw %} -->
```jsx
function AddCardButton() {
  const { db } = useEasybase();

  const handleAddCardClick = async () => {
    try {
      const inLink = prompt("Please enter an Amazon link", "https://...");
      const inImage = prompt("Please enter an image link", "https://...");
      const inName = prompt("Please enter a product name", "");
      const inPrice = prompt("Please enter a price as a number", "14.24");
      if (!inPrice || !inName || !inImage || !inLink) return;

      await db('REACT DEMO').insert({
        amazon_link: inLink,
        product_name: inName,
        price: Number(inPrice),
        demo_image: inImage
      }).one(); // Inserts, updates, and deletes will refresh the `frame` below
    } catch (_) {
      alert("Error on input format")
    }
  }

  return (
    <button
      onClick={handleAddCardClick}
      className="insertCardButton"
    >
      + Add Card
    </button>
  )
}

function Home() {
  const { db, useReturn } = useEasybase();

  const { frame } = useReturn(() => db("REACT DEMO").return().limit(10), []);

  // No need for manually mounting!

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {frame.map(ele =>
        <div className="cardRoot">
          <a href={ele.amazon_link}><img src={ele.demo_image} /></a>
          <h4>{ele.product_name}</h4>
          <p>${ele.price}</p>
          <button className="cardButton" onClick={() => {}}>⭐ Save for later ⭐</button>
        </div>
      )}
      <AddCardButton /> {/* <--- No more callback */}
    </div>
  )
}
```
<!-- {% endraw %} -->

This is the **best way** to statefully manage queries within a component. The *easybase-react* library uses event listeners and native React hooks to subscribe to relevant changes anywhere in your project.

We can also now have *controlled* query parameters by using state variables in the *deps* array, similar to *useEffect*. Add a new state variable called `minPrice` that is controlled by an `<input type="number" />`.

<!-- {% raw %} -->
```jsx
function Home() {
  const [minPrice, setMinPrice] = useState(0);

  // ...

  const minPriceStyle = {
    position: "absolute",
    top: 74,
    right: 5
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <label style={minPriceStyle}>
        Minimum Price: 
        <input 
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(Number(e.target.value))}
        /> {/* <---- */}
      </label>
      {frame.map(ele =>
        <div className="cardRoot">
          <a href={ele.amazon_link}><img src={ele.demo_image}/></a>
          <h4>{ele.product_name}</h4>
          <p>${ele.price}</p>
          <button className="cardButton" onClick={() => {}}>⭐ Save for later ⭐</button>
        </div>
      )}
      <AddCardButton />
    </div>
  )
}
```
<!-- {% endraw %} -->

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react usereturn 1" data-src="/assets/images/posts_images/react-usereturn-1.png" />

The input in the top-right now will update the `minPrice` variable. Put this in the `useReturn` hook **and** pass it in the *deps* array:

```jsx
const [minPrice, setMinPrice] = useState(0);
const { db, useReturn, e } = useEasybase();
const { frame } = useReturn(() => db("REACT DEMO")
  .return()
  .where(e.gt('price', minPrice)) // e.gt = "Greater Than"
  .limit(10),
[minPrice]);
```

Now, changing the `minPrice` keeps the data in `frame` fresh!


<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react usereturn 1" data-src="/assets/images/posts_images/react-usereturn-2.png" />

<br />

## Upload Media

<div class="sectionBox">
<p>
  <b>Related functions:</b>
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#setimage" target="_blank">setImage</a>, 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#setvideo" target="_blank">setVideo</a>,
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#setfile" target="_blank">setFile</a>
</p>
</div>

There's a slightly different process for uploading images, videos, and other files with the `easybase-react` package. Instead of using [`db().set()`](https://easybase.github.io/EasyQB/docs/update_queries.html), as would be used for updating other data types, use `setImage`, `setVideo`, or `setFile` which are **properties of the `useEasybase` hook**. These functions will keep your `useReturn()` instance updated when media or others files are successfully attached to a record.

To demonstrate the [`setImage`](/docs/easybase-react/interfaces/types_types.contextvalue.html#setimage) function, clicking on a product card will now allow users to select an image, instead of opening the shopping link. 


<!-- {% raw %} -->
```jsx
import React, { useState, useRef } from 'react';
// ...
function Home() {
  const [minPrice, setMinPrice] = useState(0);
  const { db, useReturn, e, isUserSignedIn, setImage } = useEasybase();
  // ...
  const inputEl = useRef(null);

  const onImageClick = (_key) => {
    inputEl.current.onchange = () => {
      // Runs when the user selects a file...
      if (inputEl.current.files && inputEl.current.files.length > 0) {
        const imageFile = inputEl.current.files[0];
        if (imageFile.type.includes("image")) {
          // The last parameter (table name) is only required for projects
          setImage(_key, "demo_image", imageFile, "REACT DEMO");
          // setImage, setVideo, and setFile take the same parameters
        }
      }
    };

    inputEl.current.click();
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* ... */}
      {frame.map(ele =>
        <div className="cardRoot">
          <a onClick={_ => onImageClick(ele._key)}>{/* <---- */}
            <img src={ele.demo_image} />
          </a>
          <h4>{ele.product_name}</h4>
          <p>${ele.price}</p>
          <button className="cardButton" onClick={() => {}}>⭐ Save for later ⭐</button>
        </div>
      )}
      <input ref={inputEl} hidden type="file" />
      <AddCardButton />
    </div>
  )
}
```
<!-- {% endraw %} -->

Now when you click on a product image a file explorer will open. Select an image. When it is uploaded your `frame` is automatically refreshed with the new photo.


<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react upload media" data-src="/assets/images/posts_images/react-32.png" />

To attach media or other files to a record, the record *_key* and column name must be known. Pass that information-along with the file object-into either `setImage`, `setVideo`, or `setFile`. **Note that the correct function must be used for its corresponding table column type**.

<br />

## [Sign In & Sign Up Authentication](/react-and-react-native-user-authentication/)

<div class="sectionBox">
  <p>
    <b>The user authentication section has <a target="_blank" href="/react-and-react-native-user-authentication/">moved to its own page</a></b>.
  </p>
</div>

The [`<Auth />`](/react-and-react-native-user-authentication/) and [`<NativeAuth />`](/react-and-react-native-user-authentication/) components allow developers to quickly implement a functional sign-in/sign-up workflow. For those looking for more control over this interface, the `useEasybase` hook can be used to manually create these components.

This allows for writing records that are specifically assigned to the active user, so when this user signs in we will automatically only retrieve records that correspond to that user when they navigate to `/starred`.

<br />

## Authenticated Database

<div class="sectionBox">
<p>
  <b>Related functions:</b> 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#db" target="_blank">db</a>, 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#dbeventlistener" target="_blank">dbEventListener</a>
</p>
</div>

A common situation for applications is storing data that corresponds to the **currently signed-in user**. For our example app, users should be able to save products for later in the `/starred` route. Let's create a new table called 'USER STARS' that will have a similar structure, but with user correspondence.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react user database" data-src="/assets/images/posts_images/react-8.png" />

Give your project permissions to read and write 'User associated records'. **Be sure to click save.**

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react read and write" data-src="/assets/images/posts_images/react-9.png" />

Let's edit our card component to handle a user click on the button element. Using [`.insert`](https://easybase.github.io/EasyQB/docs/insert_queries.html) on our [`.db`](https://easybase.github.io/EasyQB/) function allows us to insert records into our table via an object. From there, we can perform a [`.return`](https://easybase.github.io/EasyQB/docs/select_queries.html#select), similar to above, to display our new data.

<div class="sectionBox">
<p>

This section demonstrates using the <code class="highlighter-rouge">db().return</code> function in-line, but the <a href="#usereturn"><code class="highlighter-rouge">useReturn</code></a> hook always keeps your data fresh based on state changes and other executions of <code class="highlighter-rouge">db()</code>.

</p>
</div>

Note that for uploading media, use either `updateRecordFile()`, `updateRecordImage()`, or `updateRecordVideo()`. Here's changes to our `Home` component using `.db` so signed-in users can star products:

<!-- {% raw %} -->
```jsx
function Home() {
  const [easybaseData, setEasybaseData] = useState([]);

  const {
    db,
    isUserSignedIn
  } = useEasybase();

  useEffect(() => {
    const mounted = async() => {
      const ebData = await db("REACT DEMO").return().limit(10).all();
      setEasybaseData(ebData);
    }
    mounted();
  }, [])


  const handleStarClick = (ele) => {
    if (isUserSignedIn()) {
      db("USER STARS").insert({
        product_name: ele.product_name,
        amazon_link: ele.amazon_link
      }).one();
      // Columns are set to null by default
    }
  }

  return (
    <div style={{ display: "flex" }}>
      {easybaseData.map(ele => 
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
<!-- {% endraw %} -->

Now when a signed-in user stars a product, we can refresh our table and see a new element. Notice in the drawer we can see a new section called **· Associated Users**.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react associated users" data-src="/assets/images/posts_images/react-10.png" />

Detailed in this section is the user that starred the item. Now let's see how easy it is to *query* for just these records in the `/starred` route. Remember we set permissions to only be able to read user-associated records from **USER STARS**. So, we just need to set up a standard [`.db`](https://easybase.github.io/EasyQB/) configuration and **pass `true` to the second parameter: `db('USER STARS', true)`**.

This second parameters is _userAssociatedRecordsOnly_ which will force operations to only to be performed on records associated to the currently signed-in user. Make a new component called `Starred` that will go in the `/starred` route.

<!-- {% raw %} -->
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
  const [easybaseData, setEasybaseData] = useState([]);

  const { db } = useEasybase();

  useEffect(() => {
    db('USER STARS', true).return().limit(10).all()
      .then(ebData => setEasybaseData(ebData));
  }, [])

  return (
    <div style={{ display: "flex" }}>
      {easybaseData.map(ele => 
        <div className="cardRoot">
          <a href={ele.amazon_link}>{ele.product_name}</a>
        </div>
      )}
    </div>
  )  
}
```
<!-- {% endraw %} -->

Navigate to the starred route with a signed-in user; we **securely** and **successfully** display records that the user has starred.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react secure records" data-src="/assets/images/posts_images/react-11.png" />

In a situation like this, an application may need to manipulate specific records. For example, deleting a user's _starred_ items. Here's a simple way one could use the `_key` attribute to **delete or update specific records**:

```js
const singleRecord = await db('USER STARS', true).return().one();
// {
//   "product_name": "Dash Mini Maker",
//   ...  
//   "_key": 417f1f17acf86cd799439013
// }

await db('USER STARS', true).delete().where({ _key: singleRecord._key }).one();
``` 

Read more about [**Update**](https://easybase.github.io/EasyQB/docs/update_queries.html) and [**Delete**](https://easybase.github.io/EasyQB/docs/delete_queries.html).

<br />

## Visual Queries

<div class="sectionBox">
<p>
  <b>Related functions:</b> 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#query" target="_blank">Query</a>
</p>
</div>

One of the most *accessible* features of Easybase is the ability to **build queries visually, then call them by name in code**. Open up your **REACT DEMO** table and navigate to the 'Query' tab. I'm going to build a simple query that filters for products with a price of over $100. Click the blue 'Save' button and save the query with the name "price filter".

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual query" data-src="/assets/images/posts_images/react-12.png" />

Add a route to your application called `/over100`. Create a new component, I'll call mine `FilterExample`. In your root `App` component, assign this component to the new route. Programmatically we can use the `Query()` function to access our saved queries. Here's my `FilterExample` component:

<!-- {% raw %} -->
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
    <div style={{ display: "flex" }}>
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
<!-- {% endraw %} -->

I'm using the same *card-like* component from our `Home` component. Here's a screenshot of my web app for reference ([full source available here](https://github.com/easybase/example-react-project)):

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react visual component" data-src="/assets/images/posts_images/react-13.png" />

Note that there are other *optional* parameters for the `Query()` function such as *sortBy* and *limit*. One of the most **powerful** options is the ability to add a *customQuery* object to overwrite the values detailed in the visual query. The structure and function of the query stay the same, but you can edit the values that are queried. For example, if we wanted to look for products with a price of over $12 rather than $100. We can set the *customQuery* parameter to `{ price: 12 }` programmatically. This is suited well for situations in which you have **conditional options in your interface that affect the current query**.

<br />

## Google Analytics Integration

The `easybase-react` package has built-in support for advanced Google Analytics tracking. The only configuration needed in your React project is the `googleAnalyticsId` parameter of EasybaseProvider's options [and `googleAnalyticsSecret` for **React Native**]. This feature is optimized for the latest version of Analytics – **Google Analytics 4**. *Note that the previous version of GA, Universal Analytics, is not supported*.

To get started, [log in to Google Analytics](https://analytics.google.com/analytics/web/).

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react Google Analytics 1" data-src="/assets/images/posts_images/react-23.png" />

Proceed through the account creation form. **You do not need to change any of the default settings.**

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react Google Analytics 2" data-src="/assets/images/posts_images/react-24.png" />

Next, create a **Web** Data Stream. **The Website URL field does not have to be a real URL** – if you do not have a domain name, input some placeholder URL.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react Google Analytics 3" data-src="/assets/images/posts_images/react-25.png" />

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react Google Analytics 4" data-src="/assets/images/posts_images/react-26.png" />

Create the stream. Copy the "Measurement ID" and paste in the `googleAnalyticsId` option of EasybaseProvider:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react Google Analytics 5" data-src="/assets/images/posts_images/react-27.png" />

<!-- {% raw %} -->
```jsx
import './App.css';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig';

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig} options={{ googleAnalyticsId: "G-J75H1NPBQY" }}>
      <MyApp />
    </EasybaseProvider>
  );
}

export default App;
```
<!-- {% endraw %} -->

Fire up your application with `npm run start` and head to the 'Realtime' tab in GA. Wait a second and a new event will appear! **Note that adblockers will stop Google Analytics functionality client-side.**

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react Google Analytics 6" data-src="/assets/images/posts_images/react-28.png" />

### React Native Only

Since React Native applications cannot hook into the standard Google Analytics browser script, the `easybase-react` library will use [the Google Analytics 4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4) as an alternative. This requires one more configuration step – an API Secret. In the **Data Stream** Menu, go to the Measurement Protocol API secrets view and create a new secret.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react Google Analytics 7" data-src="/assets/images/posts_images/react-29.png" />
<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react Google Analytics 8" data-src="/assets/images/posts_images/react-30.png" />

Copy the "Secret value" and paste in the EasybaseProvider option `googleAnalyticsSecret`:

<!-- {% raw %} -->
```jsx
import './App.css';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig';

function App() {
  return (
    <EasybaseProvider 
      ebconfig={ebconfig}
      options={{
          googleAnalyticsId: "G-J75H1NPBQY",
          googleAnalyticsSecret: "kVtlPpOZQf6T62SWwvRIbA",
      }}>
      <MyApp />
    </EasybaseProvider>
  );
}

export default App;
```
<!-- {% endraw %} -->

Your React Native app analytics are ready to go!

Certain events will be tracked by default; page mounts, `login`, `sign_up`, etc. You can specify which events are logged, such as `db` executions, with the `googleAnalyticsEventTracking` object in EasybaseProvider's options:

<!-- {% raw %} -->
```jsx
import './App.css';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig';

function App() {
  return (
    <EasybaseProvider 
      ebconfig={ebconfig}
      options={{
          googleAnalyticsId: "G-J75H1NPBQY",
          googleAnalyticsEventTracking: {
            get_user_attributes: true,
            db_one: true,
            db_all: true
          }
      }}>
      <MyApp />
    </EasybaseProvider>
  );
}

export default App;
```
<!-- {% endraw %} -->

Events and their associated parameters can be seen in the "Realtime" tab and *eventually* in the "Events" tab. If your application features [User Authentication](/react-and-react-native-user-authentication/), the package will **automatically** associate events with a [salted + hashed user ID](https://support.google.com/analytics/answer/6366371?hl=en#hashed) for source identification.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase react Google Analytics 9" data-src="/assets/images/posts_images/react-31.png" />

<br />

## Conclusion

Deploying a serverless React or React Native application is made accessible with Easybase.io + `easybase-react`. Take a look at the [Github repo](https://github.com/easybase/easybase-react) for some more information on *usage* and *installation*. We **successfully created a web app** that features a backend database, user authentication, sign in/sign up workflow, easy-to-use visual queries, and secure user-corresponding backend storage. Also, we demonstrated how to deploy cloud functions that can be called by name in your React and React Native code.

Thanks a lot for reading! Please be sure to **share this article** using the social buttons below. Regarding any questions or concerns, feel free to use the 'Leave a message' form.

**Read more**:

* [Customizing Query Values](/about/2020/09/15/Customizing-query-values/)
* [User Authentication](/react/2020/11/25/The-Easiest-Way-To-Add-User-Authentication-To-Your-React-Project/)
* [Firebase Alternative](/react-database-app-tutorial/)