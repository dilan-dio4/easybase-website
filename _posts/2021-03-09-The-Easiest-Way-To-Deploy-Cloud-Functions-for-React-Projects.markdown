---
layout: blog
title: The Easiest Way To Deploy Cloud Functions for React Projects
date: 2021-03-09 11:20:00 -0400
categories: react
title_image: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
title_image_sm: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80
author_name: Ryan Parker
tags: Home Blog React
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=193&h=193&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.75
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
meta_description: Function-as-a-service is essential to a comprehensive serverless architecture. We are excited to announce that this technology is coming to Easybase!
---

# Introduction

The architecture of modern applications has been heavily influenced by the robust technology of cloud computing. Of the many development modules involved the cloud and serverless computing, cloud functions have been a particularly important innovation. Over the last few years, many of these enterprise tools have been oriented towards small teams and individual developers.

This software development pattern abstracts away the tedious management that comes with deploying a standalone server. The developer benefits by only putting time/attention into the parts that actually matter, weather it be business logic or other application processes. Some examples of the advantages of cloud computing include:

* **Analytics Tracking** - Built in systems to track function/database usage
* **Scalability** - The cloud provider will manage resource allocation automatically with the ability to provide the resources necessary during periods of high usage
* **Execution Lifespan** - Your function will only be alive when someone is actually requesting it. When there is no requests, your function will wait in idle state without accruing charges.
* **[Serverless](/about/2021/01/30/What-Is-a-Serverless-Application/)** - Just add code. No need to manage system software, updates, or configuration.

<img data-src="/assets/images/posts_images/serverless-2.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

<br />

# Easybase Cloud Functions

React, among [the other Javascript Frameworks](/react/2020/12/24/6-Javascript-Ui-Frameworks-Ranked-From-Best-To-Worst-In-2021/), are suited excellently for serverless architecture. This is because the **"write once, run anywhere"** design aligns with the portable philosophy of cloud functions. Furthermore, Easybase's cloud functions supports Node.js, so we can write full-stack applications with Javascript. We are going to demonstrate just how to deploy a cloud function with Easybase, then call it from your React or React Native application code.

### Setup

Start by [creating a free account](https://app.easybase.io/?view=signup) on Easybase, then open up the **Create Dialog**. From here, we can create a new table or function. Navigate through the *Function* menu assigning a name and code template. I'm going to use the "Hello World" template.

<img data-src="/assets/images/posts_images/deploy-function-1.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

The "Hello World" template is a good starting point. It is a simple Javascript function that will simply echo back the input given. If none is given, "Send me a message!" will be assigned to the returned property *message*. We use `context.succeed(...)` and `context.fail(...)` to return data from our cloud functions. Anything you return will be converted to a string during runtime. So, remember to use [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) and [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) for transferring objects.

<img data-src="/assets/images/posts_images/deploy-function-2.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

Here's a couple important points regarding the structure of this function:
1. In `package.json`, the property *main* must point to a valid javascript file that exports a function with `module.exports`
2. This exported function will take two parameters; `event` for accessing parameters and other environmental information and `context` for returning data
3. All npm packages used in the function must be listed under the property `dependencies` in `package.json` (**See below**)

<br />

### Interface

Before we start editing actual code, let's do a brief walkthrough of the interface. First, expand the **Deploy** row. From here we can live test the function with custom inputs by clicking the green **Go** button. If we add an input with the key *message*, it will come through in the output. Input properties are available in our functions `event.body`.

<img data-src="/assets/images/posts_images/deploy-function-3.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

Change the selected tab from *Function* to *Deploy*. **Here you can find your individual function route**. This is all you need to call your function. We explore this topic below with regards to React and React Native. Whenever you are ready to make changes, using **Save** button in the top-right of the menu will re-deploy the function. It should only take at most one minute for your changes to be live at the same function route.

### Customize Function

In this demonstration, I'll be deploying a serverless function that returns the current weather information of a given city. If no city is provided, one be selected at random from a list. **This process will use two APIs**; [Geocode.xyz](https://geocode.xyz/api) for converting city names to coordinates and [7Timer](http://www.7timer.info/doc.php?lang=en) for getting the live weather data of those coordinates. We will use the npm library `node-fetch` for making these API requests. [**Click here to view the full code.**](https://gist.github.com/dilan-dio4/da5b2b3cbd47d49e49fc2b720fb9c9c7#file-easybase-function-js)

1. To install `node-fetch` from npm, add it the dependencies section of `package.json` with a corresponding version. (Use [npmjs.com](https://www.npmjs.com/package/node-fetch) if you need to find package versions).
    
    <img data-src="/assets/images/posts_images/deploy-function-8.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. Create a file called `cities.js` in the `src/` folder

    <img data-src="/assets/images/posts_images/deploy-function-4.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. Export an array populated with city names

    <img data-src="/assets/images/posts_images/deploy-function-5.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. Import that array in `handler.js`

    <img data-src="/assets/images/posts_images/deploy-function-6.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. In the function, check if `event.body` contains the property `city`. We will use this value to get weather data for. If not, select one from the imported array.

    <img data-src="/assets/images/posts_images/deploy-function-9.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. Import `fetch` from `node-fetch` and pass the selected city to the [Geocode.xyz](https://geocode.xyz/api) API. Save the latitude and longitude in the variables *latt* and *longt*.

    <img data-src="/assets/images/posts_images/deploy-function-7.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

1. Pass *latt* and *longt* to the [7Timer](http://www.7timer.info/doc.php?lang=en) API which returns an object with key *dataseries* pointing to an array of objects with weather data.

    <img data-src="/assets/images/posts_images/deploy-function-10.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

Save the function and open the **Deploy** row again and create a row under 'Input' with the key *city* and the value *Los Angeles*. Just like that, if we run our function, we can see that our cloud function is properly computing and is able to access external sources! Remove that *city* row and our function will select one at random, like we specified.

<img data-src="/assets/images/posts_images/deploy-function-11.png" alt="Easybase function-as-a-service diagram" class="lazyload custom-lightbox my-3" data-jslghtbx width="100%" />

### React Integration

### Advanced
Build script, npm pack
This is all you need to call your function.

There's also a couple different way to run this function from a client machine. In React or React Native, use the [`easybase-react`](https://github.com/easybase/easybase-react) library. If you click "Try the live API builder", you can see an external API building calling your function in realtime.


# Conclusion