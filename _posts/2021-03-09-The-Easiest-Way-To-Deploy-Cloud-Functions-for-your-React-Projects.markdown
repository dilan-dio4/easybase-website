---
layout: blog
title: The Easiest Way To Deploy Cloud Functions for Your React Projects
date: 2021-03-09 11:20:00 -0400
categories: react
title_image: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&h=500
title_image_sm: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80&h=45
author_name: Ryan Parker
tags: Home Blog React
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=193&h=193&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.75
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
meta_description: Easybase cloud functions are scalable, serverless code snippets that can be called directly from your React projects with built-in analytics tracking.
---

# Introduction

The architecture of modern applications has been heavily influenced by cloud computing. Of the many modules involved in cloud and serverless development, cloud functions (Functions-as-a-Service) have been a particularly important innovation. Over the last few years, many of these enterprise tools have been oriented towards **small teams and individual developers**.

This software development pattern abstracts away the tedious management that comes with deploying a standalone server. The developer benefits by only putting time and attention into the parts they actually care about, whether it be business logic or other application processes. Some examples of the advantages of cloud computing include:

* **Analytics Tracking** — Built-in systems to track function/database usage
* **Scalability** — The cloud provider will manage resource allocation automatically with the ability to provide the resources necessary during periods of high usage
* **Execution Lifespan** — Your function will only be alive when someone is requesting it. When there are no requests, the function will wait in an idle state without accruing charges.
* **[Serverless](/about/2021/01/30/What-Is-a-Serverless-Application/)** — Just add code. No need to manage system software, updates, or configuration.

<img data-src="/assets/images/posts_images/serverless-2.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

<br />

# Easybase Cloud Functions

React, among [the other Javascript Frameworks](/react/2020/12/24/6-Javascript-Ui-Frameworks-Ranked-From-Best-To-Worst-In-2021/), is suited excellently for serverless architecture. This is because the **"write once, run anywhere"** design aligns with the portable philosophy of cloud functions. Furthermore, Easybase's cloud functions support Node.js, so we can write full-stack applications with Javascript. We are going to demonstrate just how to deploy a cloud function with Easybase, then call it from your React or React Native application code.

### Setup

Start by [creating a free account](https://app.easybase.io/?view=signup) on Easybase, then open up the **Create Dialog**. From here, we can create a new table or function. Navigate through the *Function* menu assigning a name and code template. I'm going to use the "Hello World" template.

<img data-src="/assets/images/posts_images/deploy-function-1.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

The "Hello World" template is a good starting point. It is a simple Javascript function that will simply echo back the input given. If none is given, "Send me a message!" will be assigned to the returned property, *message*. We use `context.succeed(...)` and `context.fail(...)` to return data from our cloud functions. Anything you return will be converted to a string during runtime, so remember to use [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) and [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) for transferring objects.

<img data-src="/assets/images/posts_images/deploy-function-2.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

Here are a couple of important points regarding the structure of Easybase functions:
1. In `package.json`, the property *main* must point to a valid javascript file that exports a function with `module.exports`
2. This exported function will take two parameters; `event` for accessing parameters and other environmental information and `context` for returning data
3. All npm packages used in the function must be listed under the property `dependencies` in `package.json` (**See example below**)

<br />

### Interface

Before we start writing code, let's do a brief walkthrough of the interface. First, expand the **Deploy** row. From here we can live test the function with custom inputs by clicking the green **Go** button. In the "Hello World" case, if we add an input row with the key *message*, it will come through in the output. Input properties are available in our functions `event.body`.

<img data-src="/assets/images/posts_images/deploy-function-3.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

Change the selected tab from *Function* to *Deploy*. **Here you can find your individual function route**. This is all you need to call your function. We explore this topic below with regards to React and React Native. Whenever you are finished making changes, use the **Save** button in the top-right of the menu to re-deploy the function. It should only take at most one minute for your changes to be live at the same function route.

### Customize Function

In this demonstration, I'll be deploying a serverless function that returns the current weather information of a given city. If no city is provided, one is selected at random from a list. **This process will use two APIs**; [Geocode.xyz](https://geocode.xyz/api) for converting city names to coordinates and [7Timer](http://www.7timer.info/doc.php?lang=en) for getting the live weather data of those coordinates. We will use the npm library `node-fetch` for making these API requests. [**Click here to view the final code.**](https://gist.github.com/dilan-dio4/da5b2b3cbd47d49e49fc2b720fb9c9c7#file-easybase-function-js)

1. To install `node-fetch` from npm, add it to the dependencies section of `package.json` with a corresponding version. (Use [npmjs.com](https://www.npmjs.com/package/node-fetch) if you need to find package versions).
    
    <img data-src="/assets/images/posts_images/deploy-function-8.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. Create a file called `cities.js` in the `src/` folder

    <img data-src="/assets/images/posts_images/deploy-function-4.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. Export an array populated with city names

    <img data-src="/assets/images/posts_images/deploy-function-5.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. Import that array in `handler.js`

    <img data-src="/assets/images/posts_images/deploy-function-6.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. In the function, check if `event.body` contains the property `city`. If not, select one from the imported array.

    <img data-src="/assets/images/posts_images/deploy-function-9.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. Import `fetch` from `node-fetch` and pass the selected city to the [Geocode.xyz](https://geocode.xyz/api) API. Save the latitude and longitude in the variables *latt* and *longt*.

    <img data-src="/assets/images/posts_images/deploy-function-7.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. Pass *latt* and *longt* to the [7Timer](http://www.7timer.info/doc.php?lang=en) API which returns an object with key *dataseries* pointing to an array of objects with weather data.

    <img data-src="/assets/images/posts_images/deploy-function-10.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

Save the function and open the **Deploy** row again. Create a row under 'Input' with the key *city* and the value *Los Angeles*. Just like that, if we run our function, we can see that our cloud function is properly computing and can access external sources! Remove that *city* row and our function will select one at random as we specified.

<img data-src="/assets/images/posts_images/deploy-function-11.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

<br />

# React Integration

Now that we have deployed a serverless function, the obvious next step would be calling the function from code. Switch the selected tab from **Testing** to **Deploy**. There are various ways to call the cloud function including the bash command, `curl`, or making a manual POST request (see the "Try the live API builder" link), but this section will demonstrate calling your function in React or React Native code.

### Creating a React Project

If you don't have an existing React project or don't know how to create one. Start by [installing Node.js and npm](https://nodejs.org/en/download/). Then open up terminal or command prompt and do the following command:

```bash
npx create-react-app react-with-easybase
```

Let this finish and you will be all set up with a bare React project. Next, we are going to need the [`easybase-react`](https://github.com/easybase/easybase-react) library. To do this, go into the newly created directory and use the `npm install` command like so:

```bash
cd react-with-easybase
npm install easybase-react
```

Now, go into the `src/` folder and open up `App.js`. Delete the header so you are just left with one `<div></div>`. My starting code looks like the following:

```jsx
function App() {
  return (
    <div>
    </div>
  );
}

export default App;
```

### Using `easybase-react`

Import `{ callFunction }` from `easybase-react`. This is an asynchronous function that will handle the execution of your cloud function via the route under the **Deploy** tab. I'm also going three elements to the React page:

1. A text box for users to input the city which will be sent to our function
1. A **Go** button
1. A text box for the cloud function's output

I've also done some basic styling. This not pretty by any means, but will work for this example. For reference, my `App.js` looks like the following:

```jsx
import { callFunction } from 'easybase-react';

function App() {

  const panelStyle = {
    width: 300,
    backgroundColor: "#AAA",
    padding: 10,
    margin: 30,
    borderRadius: 4
  }
  
  return (
    <div style={panelStyle}>
      <div style={ { display: "flex" } }>
        <input type="text" placeholder="What city are you in?" />
        <button>Go</button>
      </div>
      <p></p>
    </div>
  );
}

export default App;
```

If we run the project (`npm run start`), we should get a window that looks something like this:

<img data-src="/assets/images/posts_images/deploy-function-12.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

Now, to statefully make this request and update the UI, our button's `onClick` should trigger `callFunction` with the text boxes value as part of the request body. The response of `callFunction` will then be used to set the text in the final `<p></p>`. We'll track the value of the input and output using React's `useState` hook with `inputVal` and `outputVal`, respectively. The final code may look like the following:

```jsx
import { callFunction } from 'easybase-react';
import { useState } from 'react';

function App() {
  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");

  const panelStyle = {
    width: 300,
    backgroundColor: "#BBB",
    padding: 10,
    margin: 30,
    borderRadius: 4
  }

  const onButtonClick = async () => {
    const requestBody = inputVal ? { city: inputVal } : {};
    const easybaseResponse = await callFunction("123456-YOUR-ROUTE", requestBody);
    setOutputVal(easybaseResponse);
  }
  
  return (
    <div style={panelStyle}>
      <div style={ { display: "flex" } }>
        <input type="text" placeholder="What city are you in?" value={inputVal} onChange={e => setInputVal(e.target.value)} />
        <button onClick={onButtonClick}>Go</button>
      </div>
      <p>{outputVal}</p>
    </div>
  );
}

export default App;
```

Clicking the **Go** button with an empty text box will return weather data from a random city as detailed in our cloud function's `cities.js`. Putting a city name in the text box will output the corresponding weather information as well.

<img data-src="/assets/images/posts_images/deploy-function-13.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

# Conclusion

Easybase's cloud functions can be spun up instantly and will work great for your next React or React Native project. Cloud functions are responsive to traffic and do not use resources when they're not running. Easybase automatically tracks function analytics, which can be found in the **Usage** tab via the left-hand drawer. In this tab, you will find your functions compute time, volume, MBs transferred, and more.

This combination of Easybase and React grants developers a powerful serverless architecture that is cost and time-effective. To learn more about going serverless with React and React Native, take a look at the [Comprehensive React Walkthrough](/react/) or [learn more about serverless apps in general](/about/2021/01/30/What-Is-a-Serverless-Application/).

Thank you for reading this tutorial and feel free to contact me regarding questions or comments. Plus, use the social media fabs below for a quick and easy way to share this article around!