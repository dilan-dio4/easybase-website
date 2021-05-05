---
layout: blog-guide
title: The Best Database for React in 2021
date: 2021-03-03 11:20:00 -0400
categories: react
title_image: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&h=500
title_image_sm: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80&h=45
author_name: Ryan Parker
tags: Home Blog React
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=193&h=193&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.75
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
meta_description: Easybase cloud functions are scalable, serverless code snippets that can be called directly from your React projects with built-in analytics tracking.
toc: ["Introduction", "Project Setup", "Database", "useReturn"]
---

## Introduction

React is an incredibly popular front-end library amongst TypeScript and JavaScript developers, and for good reason. It finished as the number 1 technology wanted by employers [in HN's Hiring Trends](https://www.hntrends.com/2019/dec-another-year-on-top-for-react.html) and is the second most loved web framework in 2020,[ according to the annual Stack Overflow Developer Survey](https://insights.stackoverflow.com/survey/2020). It goes without saying that React has had tremendous impact over the entire web. Many of the most trafficked websites across the internet use it as their go-to framework.

It's a great choice for developers looking to deploy their next application, especially for individuals and small teams. The virtual DOM, component lifecycle hooks, and easy-to-learn syntax significantly decrease a product's time-to-market when using React.

A typical requirement for modern web applications is a reliable database to store, manipulate, and query data. Almost all applications, whether they be web or mobile first, use a database at some point and it's important that they be accessible and well-suited for the frontend application.

This article will show how to use Easybase's in-code query builder to operate on a central, serverless database using classes like `.where`, `.limit`, `.insert` and so on.


# Project Setup

Creating a fresh React project is very simple thanks to a well-known package called `create-react-app`. The only prerequisite is that you have both **node** and **npm** installed on your local machine. You can download and install the [official copy of those binaries here](https://www.npmjs.com/get-npm).

Once those are installed, open up command prompt or terminal and head to the folder where you would like to create your new project. Then, do this command with the last argument being the desired name of your project:

```
npx create-react-app query-builder-app
```

This may take a minute. Once finished, head into the new directory and install the `easybase-react` library. This will give includes the query builder module which we can use for our database.

```
cd query-builder-app
npm i easybase-react
```

To start your project on your local machine, execute `npm run start` in that same directory. This should automatically open the project in a browser window. If not, simply head to `localhost:3000`. Your browser should look something like this:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 1" data-src="/assets/images/posts_images/best-db-1.png" />

**Congrats!** You have successfully deployed a fresh React project. Next, we are going to create a free account at [easybase.io](https://easybase.io/), which will make our serverless available and work with the `easybase-react` query builder.

Once you have successfully logged-in, click the "+" fab in the bottom-left. This will open up a dialog to create a new table.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 2" data-src="/assets/images/posts_images/best-db-2.png" />

My demonstration table will have three columns:

-   *rating*: Number
-   *title*: String
-   *released*: Date

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 3" data-src="/assets/images/posts_images/best-db-3.png" />

Clicking next will open your new table, I'm going to manually insert three records by clicking the dial on the top-left of the table.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 4" data-src="/assets/images/posts_images/best-db-4.png" />

Fantastic. We now have some example data we can work with from our new React app. To make this data accessible in our project, we need to create an *Integration*. Click the 'Integrate' tab on the head of the table. Over over 'Framework' and click on the button titled '+ React'.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 5" data-src="/assets/images/posts_images/best-db-5.png" />

Now there's a couple settings we have to account for at this point.

1.  Enable **Active, Testing Mode, **and **Permissions Read & Write**.
2.  Download the **React Token**
3.  Click **Save** on the top-right

(**Important Note: **table-specific integrations can only ever access that table. For reading/writing multiple tables in your Easybase account, [use the Project workflow](https://easybase.io/react/#setup))

Place the newly downloaded *ebconfig.js* file in the `src/` folder of your new React project, such that the structure looks something like this:

```
├── README.md
├── package.json
├── public/
└── src/
    ├── ebconfig.js  <--
    ├── App.js
    ├── index.css
    ├── index.js
    └── ...
```

There's only one more step until our project is configured for life; open up the `src/App.js` file and do the following:

1.  Import *EasybaseProvider* and *useEasybase* from 'easybase-react'
2.  Import *ebconfig* from './ebconfig'
3.  Wrap root component in *EasybaseProvider* and pass in the ebconfig prop

Following these steps, your `src/App.js` will look something like the following:

<!-- {% raw %} -->
```jsx
import logo from './logo.svg';
import './App.css';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import ebconfig from './ebconfig';

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org">
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

## Database

**Note** that the entire source code for this project is available here for reference. Also, [the comprehensive documentation for the Easybase query builder is available on Github pages](https://easybase.github.io/EasyQB/).

Let's start by getting the three records that we manually put in our table from our front-end code. Clear out the unnecessary code from within the *EasybaseProvider* component. Then, create a new component called *DbExample*. Place that within the root component and create a function for it. create a new state variable called `currentData` that starts with an empty array. [I highly recommend you learn up on React hooks if you are unfamiliar](https://reactjs.org/docs/hooks-intro.html), as they are fundamental to React development and the demonstration below.

The code will look like the following:

<!-- {% raw %} -->
```jsx
import { useState, useEffect } from 'react';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import ebconfig from './ebconfig';

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <DbExample />
    </EasybaseProvider>
  );
}

function DbExample() {
  const [currentData, setCurrentData] = useState([]);
  return (
    <div>
    </div>
  )
}

export default App;
```
<!-- {% endraw %} -->

### Select

The query builder that we will use for the rest of the demonstration is accessible through the `db` function, available from the `useEasybase` hook. When our component first mounts, we will use `db().return()` to instantiate a **Select** statement.

All types of statements are only executed when you call either `.all` or `.one`, so you can continue to manipulate the **Select** in a chain pattern like:

```jsx
const res = await db().return('rating').where(e.like('title', 'The%')).limit(10).offset(5).all()
```

This chaining pattern is what makes the query builder so intuitive for performing operations on your database from the front code. [`e` represents expressions and operations](https://easybase.github.io/EasyQB/docs/operations.html), which we will cover later.

I will then set `currentData` to the array returned from this asynchronous function in `useEffect`.

<!-- {% raw %} -->
```jsx
async function mounted() {
  const res = await db().return().all();
  setCurrentData(res);
}

useEffect(() => {
  mounted();
}, [])
```
<!-- {% endraw %} -->

Then, map the `currentData` variable to a *Card* component displaying the properties:

<!-- {% raw %} -->
```jsx
function Card({ title, rating, released }) {
  const cardStyle = {
    boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
    margin: 10,
    padding: '0 10px',
    borderRadius: 10,
    color: '#222',
    position: 'relative'
  }

  return (
    <div style={cardStyle}>
      <h3 style={{ fontWeight: 'normal' }}>Title: <b>{title}</b></h3>
      <h5 style={{ fontWeight: 'normal' }}>Rating: <b>{rating}</b></h5>
      <h5 style={{ fontWeight: 'normal' }}>Released: <b>{released.substring(0, 10)}</b></h5>
    </div>
  )
}

function DbExample() {
  const [currentData, setCurrentData] = useState([]);

  const { db } = useEasybase();

  async function mounted() {
    const res = await db().return().all();
    setCurrentData(res);
  }

  useEffect(() => {
    mounted();
  }, [])

  return (
    <div>
      <div style={{ display: "flex" }}>
        {currentData.map(ele => <Card {...ele} />)}
      </div>
    </div>
  )
}
```
<!-- {% endraw %} -->

I avoided adding too much extra styling for sake of brevity, but definitely give your app a unique look and feel! (*UI/UX can be the make-or-break many software products*).

The resulting product will look as following:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/best-db-6.png" />

To demonstrate how we can use `.where` to easily create compound query in code. I'm going to add a checkbox that, when enabled, only display records that are either rated above 80 *or* titled something beginning with a 'F'.

We will use `e`, expressions and operations, from our table to place in the `.where` parameters. [There's plenty of the operations available for different types of data and query types](https://easybase.github.io/EasyQB/docs/operations.html) .

By using a checkbox `input`, we can handle a click event with a callback function as follows:

<!-- {% raw %} -->
```jsx
function DbExample() {
	// ...

  const checkboxClicked = async (event) => {
    const table = db();
    const { e } = table;
    if (event.target.checked) {
      const res = await table.return().where(
        e.or(
          e.gt('rating', 80),   // gt = greater than
          e.like('title', 'F%') // like = regex match where % represents zero, one or multiple chars
        )
      ).all();
      setCurrentData(res);
    } else {
      const res = await table.return().all();
      setCurrentData(res);
    }
  }

  return (
    <div>
      <div style={{ margin: 13 }}>
        <label>
          <b>Only above 80 or starts with 'F' </b>
          <input
            type="checkbox"
            onChange={checkboxClicked}
          />
        </label>
      </div>
      <div style={{ display: "flex" }}>
        {currentData.map(ele => <Card {...ele} />)}
      </div>
    </div>
  )
}
```
<!-- {% endraw %} -->

Give it a try! Changing the checkbox will toggle the queries.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 7" data-src="/assets/images/posts_images/best-db-7.png" />

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 8" data-src="/assets/images/posts_images/best-db-8.png" />

### Insert

To allow users to add records to the database, we will have a clickable silhouette card that brings up alerts to add a *title*, *rating*, and *date*. Then, we can cast those inputs to the correct format and pass them to our table with the `db().insert` function.

Using the browser's built-in `prompt` function, we can take in user input natively. Remember, we'll want to get and display the freshest data after we insert our new record. One possible workflow for this logic could look as follows:

<!-- {% raw %} -->
```jsx
function DbExample() {
  // ...

  const insertRecord = async () => {
    try {
      const inTitle = prompt("Please enter the movie title", "Harry Potter");
      if (!inTitle) return;
      const inRating = prompt("Please enter the movie rating as a number", "59");
      if (!inRating) return;
      const inReleased = prompt("Please enter the movie release date in the form YYYY-MM-DD", "2018-04-13");
      if (!inReleased) return;

      await db().insert({
        title: inTitle,
        rating: Number(inRating),
        released: new Date(inReleased)
      }).one();
      mounted();
    } catch (_) {
      alert("Error on input format")
    }
  }

  const insertRootStyle = {
    border: "3px dashed #A4C",
    borderRadius: 9,
    margin: 10,
    width: 140,
    color: "#A4C",
    backgroundColor: "white"
  }

  return (
    <div>
      <div style={{ margin: 13 }}>
        <label>
          <b>Only above 80 or starts with 'F' </b>
          <input
            type="checkbox"
            onChange={checkboxClicked}
          />
        </label>
      </div>
      <div style={{ display: "flex" }}>
        {currentData.map(ele => <Card {...ele} />)}
        <button style={insertRootStyle} onClick={insertRecord}>+ Add Record</button>
      </div>
    </div>
  )
}

```
<!-- {% endraw %} -->

After adding that, we can see a new button displayed alongside our other data.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 9" data-src="/assets/images/posts_images/best-db-9.png" />

Clicking that '+ Add Record' button will display a series of input text boxes to the user.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 10" data-src="/assets/images/posts_images/best-db-10.png" />

And when we're all done, our new entry will be shown in both our application and in the Easybase interface!

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 11" data-src="/assets/images/posts_images/best-db-11.png" />

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 12" data-src="/assets/images/posts_images/best-db-12.png" />

### Delete / Update

There are two main way use the `db().delete` and `db().set` functions.

1.  Pass an already retrieved record's `_key` attribute (a persistent, unique identifier) into a `.where` clause directly --- executing with `.one`
2.  Use a `.where` clause with `e` expressions to filter for and delete/update records that satisfy a query --- executing with `.all`

I'll demonstrate both of these workflows on **Delete** and **Update**, respectively.

Let's start by adding a **'X'** delete button on-top of each of our cards. Clicking that will run the `db().delete` function with the specific `_key`  as an exact search clause.

Here's an updated `Card` with our button. Note that the button is not yet functional.

<!-- {% raw %} -->
```jsx
function Card({ title, rating, released }) {
  const { db } = useEasybase();

  const cardStyle = {
    boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
    margin: 10,
    padding: '10px 10px 0 10px',
    borderRadius: 10,
    color: '#222',
    position: 'relative'
  }

  const deleteButtonStyle = {
    position: 'absolute',
    top: 5,
    right: 3,
    border: 'none',
    backgroundColor: 'white'
  }

  return (
    <div style={cardStyle}>
      <button style={deleteButtonStyle}>&#10060;</button>
      <h3 style={{ fontWeight: 'normal' }}>Title: <b>{title}</b></h3>
      <h5 style={{ fontWeight: 'normal' }}>Rating: <b>{rating}</b></h5>
      <h5 style={{ fontWeight: 'normal' }}>Released: <b>{released.substring(0, 10)}</b></h5>
    </div>
  )
}

```
<!-- {% endraw %} -->

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 13" data-src="/assets/images/posts_images/best-db-13.png" />

I'm going to edit the previous workflow so we can re-mount with a callback, after the delete occurs. When the button is clicked, the process will be as follows:

1.  Within the *Card* component, run `await db().delete().where({ _key }).one();` (**Remember**: each record always comes with a `_key`)
2.  Run the `mounted` function passed from *DbExample *to `Card`
3.  Fresh data will be displayed

Here's an implementation of deleting:

<!-- {% raw %} -->
```jsx
function Card({ title, rating, released, _key, mountCallback }) {
  const { db } = useEasybase();
  // Notice `mountCallback` and `_key` ^^^
  // ...

  const deleteButtonClicked = async () => {
    await db().delete().where({ _key }).one();
    mountCallback();
  }

  return (
    <div style={cardStyle}>
      <button style={deleteButtonStyle} onClick={deleteButtonClicked}>&#10060;</button>
      <h3 style={{ fontWeight: 'normal' }}>Title: <b>{title}</b></h3>
      <h5 style={{ fontWeight: 'normal' }}>Rating: <b>{rating}</b></h5>
      <h5 style={{ fontWeight: 'normal' }}>Released: <b>{released.substring(0, 10)}</b></h5>
    </div>
  )
}

function DbExample() {
  const [currentData, setCurrentData] = useState([]);

  const { db } = useEasybase();

  async function mounted() {
    const res = await db().return().all();
    setCurrentData(res);
  }
  // ...

  return (
    <div>
      <div style={{ margin: 13 }}>
        <label>
          <b>Only above 80 or starts with 'F' </b>
          <input
            type="checkbox"
            onChange={checkboxClicked}
          />
        </label>
      </div>
      <div style={{ display: "flex" }}>
        {currentData.map(ele => <Card {...ele} mountCallback={mounted} />)}
        <button style={insertRootStyle} onClick={insertRecord}>+ Add Record</button>
      </div>
    </div>
  )
}

```
<!-- {% endraw %} -->

Notice the slight change that I made in *DbExample.* We have to manually pass along `mounted` as a callback, but`_key` was already being passed.

Try it out! Clicking '**X**' will now delete that record.

To demonstrate the second workflow I perviously stated, **Updating** will be done on all records that satisfy a query, built with `e` expressions. In this case, we will have one last button that, when clicked, will set the *rating* of all movies made before the year 2ooo to 0.

Implementing this should be a little bit easier by now with knowledge of our previous queries.