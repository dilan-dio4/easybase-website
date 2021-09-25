---
layout: blog-guide
title: Adding a Serverless Database To React Tutorial (Firebase Alternative)
date: 2021-05-07 05:20:00 -0400
date_modified: 2021-09-25 10:00:00 -0400
categories: react
title_image: /assets/images/posts_images/react-best-database-firebase-alternative.png
title_image_sm: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80&h=45
og_image: /assets/images/posts_images/best-db-14.png
author_name: Ryan Parker
tags: Home Blog React
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=100&fm=jpg&cs=tinysrgb&w=85&h=85&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.75
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
meta_description: React is a great library for creating web apps. You may ask, how can I add a database to my project? This tutorial will demonstrate using React with a database.
tocTitles: ["Introduction", "Project Setup", "Database", "Insert", "Delete", "Update", "Upload Media", "Looking Ahead"]
tocLinks: ["#introduction", "#project-setup", "#database", "#insert", "#delete", "#update", "#upload-media", "#looking-ahead"]
permalink: react-database-app-tutorial/
---

## Introduction

React is an **incredibly popular** front-end library amongst TypeScript and JavaScript developers and for good reason. It finished as the second most loved web framework in 2020,[ according to the annual Stack Overflow Developer Survey](https://insights.stackoverflow.com/survey/2020). React has had a tremendous impact on the entire web. Many of the most trafficked websites across the internet use it as their go-to framework.

A *typical* requirement for modern web applications is a **reliable** database to store, manipulate, and query data. Almost all applications, whether they be web or mobile-first, use a database at some point and it's important that they be accessible and well-suited for the frontend application.

React is especially fit for this use case due to the adoption of [**serverless applications**](/about/2021/01/30/What-Is-a-Serverless-Application/) which make it super easy to create production-ready apps while decreasing cost and increasing time efficiency.

This article will show how to use Easybase's **in-code query builder** to operate on a central, serverless database using classes like [`.where`](https://easybase.github.io/EasyQB/docs/select_queries.html#where), [`.limit`](https://easybase.github.io/EasyQB/docs/select_queries.html#limit), [`.insert`](https://easybase.github.io/EasyQB/docs/insert_queries.html), and so on. The finished product will be a stateful React project featuring a serverless database to **Select**, **Update**, **Insert**, and **Delete** data.


## Project Setup

Creating a fresh React project is very simple thanks to a well-known package called `create-react-app`. The only prerequisite is that you have both **node** and **npm** installed on your local machine. You can download and install the [official copy of those binaries here](https://www.npmjs.com/get-npm).

Once those are installed, open up command prompt or terminal and head to the folder where you would like to create your new project. Then, do this command with the last argument being the desired name of your project:

```
npx create-react-app query-builder-app
```

Once finished, head into the new directory and install the [`easybase-react`](https://github.com/easybase/easybase-react) library. This library includes the query builder module which is used for our database.

```
cd query-builder-app
npm i easybase-react
```

To start your project on your local machine, execute `npm run start` in that same directory. This should automatically open the project in a browser window. If not, simply head to `localhost:3000`. Your browser should look something like this:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 1" data-src="/assets/images/posts_images/best-db-1.png" />

**Congrats!** You have successfully deployed a fresh React project. Next, we are going to create a free account at [easybase.io](https://easybase.io/), which will make our serverless available and work with the `easybase-react` query builder.

Once you have successfully logged in, click the **+** fab in the bottom-left. This will open up a dialog to create a new table.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 2" data-src="/assets/images/posts_images/best-db-2.png" />

My demonstration table will have three columns:

-   *rating*: Number
-   *title*: String
-   *released*: Date

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 3" data-src="/assets/images/posts_images/best-db-3.png" />

Clicking next will open your new table, I'm going to manually insert three records by clicking the dial on the top-left of the table.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 4" data-src="/assets/images/posts_images/best-db-4.png" />

We now have some example data we can work with from our new React app. To make this data accessible in our project, we need to create an *Integration*. **Click the 'Integrate' tab** on the head of the table. Hover over 'Framework' and click on the button titled **+ React**.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 5" data-src="/assets/images/posts_images/best-db-5.png" />

There are a couple of settings we have to account for.

1.  Enable **Active, Testing Mode, **and **Permissions Read & Write**.
2.  Download the **React Token**
3.  Click **Save** on the top-right

(**Important Note:** table-specific integrations can only ever access that table. For reading/writing multiple tables in your Easybase account, [use the Project workflow](https://easybase.io/react/#setup))

Place the newly downloaded *ebconfig.js* file in the `src/` folder of your new React project, such that the structure looks like this:

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

There's only **one more step** until our project is configured; open up the `src/App.js` file and do the following:

1.  Import *EasybaseProvider* and *useEasybase* from 'easybase-react'
2.  Import *ebconfig* from './ebconfig'
3.  Wrap root component in *EasybaseProvider* and pass in *ebconfig*

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

**Note** that the entire source code for this project is [available here for reference](https://github.com/m-bagley1020/query-builder-app). Also, [the comprehensive documentation for the Easybase query builder is available on Github pages](https://easybase.github.io/EasyQB/).

Let's start by getting the three records that we manually put in our table from our front-end code. [I highly recommend you learn up on React hooks if you are unfamiliar](https://reactjs.org/docs/hooks-intro.html), as they are fundamental to React development and the demonstration below.

The quickest way to get your data inline with the *easybase-react* package is to use the `db()` function from the `useEasybase` hook. Let's start with a snippet:

```jsx
const { db, e } = useEasybase();

// ...

let allRecords = await db('MOVIE-RATINGS').return().all();
let oneRecord = await db('MOVIE-RATINGS').return().one();
```

`.return` can easily perform compound clauses by incorporating `.where`, [among other functions](https://easybase.github.io/EasyQB/docs/select_queries.html). All types of statements are only executed when you call either `.all` or `.one`, so you can continue to manipulate the **Select** in a chain pattern. This chaining pattern is what makes the query builder so intuitive for performing operations on your database from the front code. [`e` represents expressions and operations](https://easybase.github.io/EasyQB/docs/operations.html) used in queries.

```jsx
let query = await db('MOVIE-RATINGS')
  .return('title')                      // Return just the 'title' field
  .where(e.or(                          // Where an OR clause:
    e.like('title', 'The %'),           // title starts with 'The'
    e.dateLt('released', '1999-01-01')  // released before January 1st, 1999
  ))
  .limit(10)                            // Only return 10 records
  .offset(3)                            // Skip the first 3 records
  .all();                               // Execute
```

This inline method *could be* incorporated in our code by using the `useEffect` hook, **but the `useReturn` hook allows us to subscribe to changes across your component**. It's the stateful way to always keep your component data fresh:

```jsx
function Component() {
  // ...
  const [currLimit, setCurrLimit] = useState(10);
  const { db, e, useReturn } = useEasybase();
  const { frame } = useReturn(() => db().return().limit(currLimit), // <- Don't call .all
  [currLimit]); // <- Dependency array
  // ...
}
```

**Note that the first parameter is a function that returns an instance of `db()` without having called `.all`**.

The data in *frame* will be automatically refreshed in 2 cases:
1. Somewhere else in your project, `db()` is used to [**Update**](https://easybase.github.io/EasyQB/docs/update_queries.html), [**Insert**](https://easybase.github.io/EasyQB/docs/insert_queries.html), or [**Delete**](https://easybase.github.io/EasyQB/docs/delete_queries.html) in the same table.
2. One of the stateful variables in the *deps* array (the second parameter) is changed.

Queries in the `useReturn` hook are built the same as when manually executing.

Clear out the unnecessary code from within the *EasybaseProvider* component. Then, create a new component called *DbExample* with the `useReturn` hook. I'll map the data to another component called *Card* with some styling:

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
  const { db, useReturn } = useEasybase();
  const { frame } = useReturn(() => db('MOVIE-RATINGS').return(), [])

  return (
    <div>
      <div style={{ display: "flex" }}>
        {frame.map(ele => <Card {...ele} />)}
      </div>
    </div>
  )
}

export default App;
```
<!-- {% endraw %} -->

I avoided adding too much extra styling for sake of brevity, but definitely give your app a unique look and feel! (*UI/UX can be the make-or-break many software products*).

The resulting product will look as following:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/best-db-6.png" />

To demonstrate how we can use [`.where`](https://easybase.github.io/EasyQB/docs/select_queries.html#where) to easily create compound queries in code, I'm going to add a checkbox that, when enabled, **only display records that are either rated above 80 *or* titled something beginning with an 'F'**.

We will use `e`, expressions and operations, from our table to place in the `.where` parameters. [There's plenty of operations available for different types of data and query types](https://easybase.github.io/EasyQB/docs/operations.html).

By using a checkbox `input`, we can handle a click event with a callback function as follows:

<!-- {% raw %} -->
```jsx
function DbExample() {
	// ...

  const [isChecked, setIsChecked] = useState(false);
  const { db, useReturn, e } = useEasybase();

  const { frame } = useReturn(() => {
    if (isChecked)
      return db('MOVIE-RATINGS').return().where(
        e.or(
          e.gt('rating', 80),   // gt = greater than
          e.like('title', 'F%') // like = regex match where % represents zero, one or multiple chars
        )
      )
    else
      return db('MOVIE-RATINGS').return()
  }, [isChecked]);

  return (
    <div>
      <div style={{ margin: 13 }}>
        <label>
          <b>Only above 80 or starts with 'F' </b>
          <input
            type="checkbox"
            value={isChecked}
            onChange={e => setIsChecked(e.target.checked)}
          />
        </label>
      </div>
      <div style={{ display: "flex" }}>
        {frame.map(ele => <Card {...ele} />)}
      </div>
    </div>
  )
}
```
<!-- {% endraw %} -->

Give it a try! Changing the checkbox will toggle the queries.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 7" data-src="/assets/images/posts_images/best-db-7.png" />

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 8" data-src="/assets/images/posts_images/best-db-8.png" />

## Insert

To allow users to add records to the database, we will have a clickable silhouette card that brings up prompts to add a *title*, *rating*, and *date*. Then, we can cast those inputs to the correct format and pass them to our table with the [`db().insert`](https://easybase.github.io/EasyQB/docs/insert_queries.html) function.

Using the browser's built-in `prompt` function, we can take in user input natively. Remember, we'll want to get and display the freshest data after we insert our new record. One possible workflow for this logic could look as follows:

<!-- {% raw %} -->
```jsx
function DbExample() {
  // ...

  const insertRecord = async () => {
    try {
      const inTitle = prompt("Please enter the movie title", "Harry Potter");
      const inRating = prompt("Please enter the movie rating as a number", "59");
      const inReleased = prompt("Please enter the movie release date in the form YYYY-MM-DD", "2018-04-13");
      if (!inTitle || !inReleased || !inRating) return;

      await db('MOVIE-RATINGS').insert({
        title: inTitle,
        rating: Number(inRating),
        released: new Date(inReleased)
      }).one();
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
            value={isChecked}
            onChange={e => setIsChecked(e.target.checked)}
          />
        </label>
      </div>
      <div style={{ display: "flex" }}>
        {frame.map(ele => <Card {...ele} />)}
        <button style={insertRootStyle} onClick={insertRecord}>+ Add Record</button>
      </div>
    </div>
  )
}

```
<!-- {% endraw %} -->

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 9" data-src="/assets/images/posts_images/best-db-9.png" />

Clicking that '**+ Add Record**' button will display a series of input text boxes to the user.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 10" data-src="/assets/images/posts_images/best-db-10.png" />

And when we're all done, our new entry will be shown in both our application and in the Easybase interface! **Remember**, the `useReturn` hook subscribes to other usages of `db()` and updates when needed.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 11" data-src="/assets/images/posts_images/best-db-11.png" />

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 12" data-src="/assets/images/posts_images/best-db-12.png" />

## Delete

There are two main ways to use the [`db().delete`](https://easybase.github.io/EasyQB/docs/delete_queries.html) and [`db().set`](https://easybase.github.io/EasyQB/docs/update_queries.html) functions.

1.  Pass an already retrieved record's `_key` attribute (**a persistent, unique identifier automatically returned in `.return`**) into a `.where` clause directly — executing with `.one`
2.  Use a `.where` clause with `e` expressions to filter for and delete/update records that satisfy a query — executing with `.all`

I'll demonstrate both of these workflows on [**Delete**](https://easybase.github.io/EasyQB/docs/delete_queries.html) and [**Update**](https://easybase.github.io/EasyQB/docs/update_queries.html), respectively.

Let's start by adding an **'X'** delete button on top of each of our cards. Clicking that will run the `db().delete` function with the specific `_key`  as an exact search clause.

Here's a visual update to the `Card` component with the button. Note that the button is not yet functional.

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

Since we are using the `useReturn` hook, *frame* is automatically subscribed to changes across the project with other instances of `db()`. So, we only need to run `db().delete` in `Card` and our main component will automatically refresh.

Here's an implementation of deleting:

<!-- {% raw %} -->
```jsx
function Card({ title, rating, released, _key }) {
  const { db } = useEasybase();
  //                        Notice `_key` ^^^
  // ...

  const deleteButtonClicked = async () => {
    await db('MOVIE-RATINGS').delete().where({ _key }).one();
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
```
<!-- {% endraw %} -->

Try it out! Clicking '**X**' will now delete that record.

## Update

To demonstrate the second workflow I previously stated, **Updating** will be done on all records that satisfy a query, built with `e` expressions. In this case, we will have one last button that, when clicked, will set the *rating* of all movies made before the year 2000 to 0.

Implementing this should be a little bit easier with knowledge of our previous **Delete** query.

<!-- {% raw %} -->
```jsx
function DbExample() {
  // ...

  const updateButtonStyle = {
    margin: 13,
    fontSize: 15,
    padding: 10,
    borderWidth: 0,
    borderRadius: 2,
    boxShadow: '0 1px 4px rgba(0, 0, 0, .4)',
    backgroundColor: '#A4C',
    color: 'white'
  }

  const onUpdateClick = () => {
    db('MOVIE-RATINGS')
      .set({ 'rating': 0 })                       // Set 'rating' to 0
      .where(e.dateLt('released', '2000-01-01'))  // Where release before January 1st, 2000
      .all();                                     // Perform on all matches
  }

  return (
    <div>
      <div style={{ margin: 13 }}>
        <label>
          <b>Only above 80 or starts with 'F' </b>
          <input
            type="checkbox"
            value={isChecked}
            onChange={e => setIsChecked(e.target.checked)}
          />
        </label>
      </div>
      <div style={{ display: "flex" }}>
        {frame.map(ele => <Card {...ele} />)}
        <button style={insertRootStyle} onClick={insertRecord}>+ Add Record</button>
      </div>
      <button style={updateButtonStyle} onClick={onUpdateClick}>Update Old Movies</button>
    </div>
  )
}
```
<!-- {% endraw %} -->

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 14" data-src="/assets/images/posts_images/best-db-14.png" />

## [Upload Media](/react/#upload-media)

<div class="sectionBox">
<p>

Head to <b><a href="/react/#upload-media">this section</a></b> to learn how to upload media and files with the <code class="highlighter-rouge">setImage</code>, <code class="highlighter-rouge">setVideo</code>, and <code class="highlighter-rouge">setFile</code> functions.

</p>
</div>

<br />

## Looking Ahead

This was an introduction to using Easybase's serverless database capabilities. We love React, as it has proven to be one of the most effective libraries for creating [serverless applications](/about/2021/01/30/What-Is-a-Serverless-Application/).

This application architecture is *extremely* beneficial to individuals and small teams looking to deploy applications effectively. React's virtual DOM, component lifecycle hooks, and easy-to-learn syntax combined with serverless functionality significantly decrease a product's time-to-market.

For more information on the **Easybase + React** platform, take a look at the [comprehensive walkthrough](/react/).

The powerful React Query Builder demonstrated here can perform a variety of **Select**, **Insert**, **Update**, and **Delete** operations on your data. This includes *aggregations*, which are table-wide calculations such as [`.sum`](https://easybase.github.io/EasyQB/docs/operations.html#sum), [`.max`](https://easybase.github.io/EasyQB/docs/operations.html#maximum), and [`.avg`](https://easybase.github.io/EasyQB/docs/operations.html#average).

The free Easybase account you created features more than just serverless database, but also includes [user authentication](/react/2020/11/25/The-Easiest-Way-To-Add-User-Authentication-To-Your-React-Project/) and [cloud functions](/react/2021/03/09/The-Easiest-Way-To-Deploy-Cloud-Functions-for-your-React-Projects/). Follow those tutorials and walkthroughs for more in-depth demonstrations on creating modern React & React Native applications.