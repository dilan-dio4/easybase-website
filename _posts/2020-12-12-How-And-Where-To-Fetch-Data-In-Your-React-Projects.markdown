---
layout: blog
title:  How & Where To Fetch Data In Your React Projects
date:   2020-12-12 01:20:00 -0400
categories: react
title_image: https://bs-uploads.toptal.io/blackfish-uploads/blog/post/seo/og_image_file/og_image/15493/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png
title_image_sm: https://images.unsplash.com/photo-1589532768434-a92c95dad7cb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80
author_name: Ryan Parker
tags: Home React Easybase
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=193&h=193&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.75
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
meta_description: React and React Native continue to be extremely popular frontend frameworks. Your projects will likely need a backend to fetch data from. Let's explore realtime serverless data stores in React.
---

*1/5/2021 Update: Featured articles in conclusion.*

<hr />

# Introduction

React is one of the most useful and mature frontend libraries available today. It has given developers the ability to spin-up production applications across a broad range of devices. At some point, developers will likely need to be able to fetch data from a secure, remote source. Manually setting up a backend for a react project can be difficult. You'll probably have to learn DBMS architecture and manually setup your stack. Plus you have to securely handle authentication between the frontend and backend. Furthermore, managing a full-stack platform can be extremely time-consuming and inefficient for teams of less than four developers.

Thankfully, [serverless technology](/about/2021/01/30/What-Is-a-Serverless-Application/) has gained a lot of popularity over the last five years. According to [CloudFlare.com](https://www.cloudflare.com/learning/serverless/what-is-serverless/), "Serverless computing is a method of providing backend services on an as-used basis. A serverless provider allows users to write and deploy code without the hassle of worrying about the underlying infrastructure". The rise in popularity of this technology comes to the benefit of developers by making the overhead of an enterprise backend extremely low. Now, you can deploy full-stack applications without having to setup and micromanage your application's data store.

Today, Easybase has proven to be one of the best [**free** serverless platforms for React applications](/about/2021/01/30/What-Is-a-Serverless-Application/). It features a realtime serverless database, user authentication, quick integration, live analytics, and [much more](https://github.com/easybase/easybase-react). Let's take a look at how we can get this up-and-running.

<hr />

# Walkthrough

### **1. Populate an Easybase table with data**

If you already have a table with relevant data, feel free to skip this step. If not, log in to [easybase](https://app.easybase.io/) and create a table. There are a variety of ways to populate your table. You could manually add rows by expanding the speed dial on the top-left and clicking the pencil icon.


<img data-src="/assets/images/posts_images/fetch_1.png" alt="easybase fetch image 1" width="100%" data-jslghtbx class="custom-lightbox lazyload" />

Otherwise, you can upload a JSON or CSV file (Excel and Google Sheets can export to these files). This can be accomplished by expanding the speed dial and clicking the upload button. From there, drag in your file. **Note** that you have to make sure the column names between your easybase table and file match up.

<br />

### **2. Install `easybase-react`**

Navigate to your react project and install the `easybase-react` library:

```bash
npm install easybase-react
```

For more information at this library take a look at the [Github page](https://github.com/easybase/easybase-react) or [the docs](/docs/easybase-react/). If you don't have an existing React project use create-react-app to quickly create one with the proper configuration. You can do this by executing `npx create-react-app MyApp`.

<br />

### **3. Pass ebconfig.js token to React root**

The only configuration needed from your React project is a token that is obtained from Easybase. There are two different methods to do this. If your goal is just to be able to access (read/write) data from a single table with no user authentication; navigate to the 'integrations' tab, hover 'framework', and click React. this will create a new table-specific React integration. From there, you can enable read/write and testing mode in the integration drawer on the right.

<img data-src="/assets/images/posts_images/fetch_2.png" alt="easybase fetch image 1" width="100%" data-jslghtbx class="custom-lightbox lazyload" />

On the other hand, if your goal is to have full serverless capability (user authentication, custom permissions, etc.); navigate to the 'projects' page, create a new project with a distinct ID, expand the project row, and click 'Download' under the token header. **Make sure you click the checkboxes for the tables you want the project to have permissions to.**

<img data-src="/assets/images/posts_images/fetch_3.png" alt="easybase fetch image 1" width="100%" data-jslghtbx class="custom-lightbox lazyload" />

Now, place that token in your project directory (`src/`) and wrap your root component in `EasybaseProvider` with your ebconfig.js token as a prop:

```jsx
import { EasybaseProvider, useEasybase } from "easybase-react";
import ebconfig from "./ebconfig";

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Container />
    </EasybaseProvider>
  );
}
```

<br />

### **4. Interface with `Frame()`**

All child components now have valid access to the `useEasybase()` hook. You initialize the `Frame()` as follows:


```jsx
function Container() {
  const { Frame, configureFrame, sync } = useEasybase();

  useEffect(() => {
    configureFrame({ limit: 10, offset: 0 });
    sync(); // Now frame has 10 elements starting at index 0.
  }, []);

  const onChange = (index, column, newValue) => {
      Frame(index)[column] = newValue;
      sync();
  }

  return (
    <div style={ { display: "flex", flexDirection: "column" } }>
      {Frame().map(ele => 
        <Card
            frameEle={ele}
            onChange={onChange}
            index={index}
        />)}
    </div>
  )
}
```

Let's briefly explain the `Frame()` function. Calling `Frame()` will return a stateful database array according to the parameters in `configureFrame()`.

**Important Note**: If you are using a project, you must pass the table name in the configureFrame({ *tableName* }) method.

You can interface with `Frame()` as would a plain array of objects in javascript. Whenever you want to synchronize changes between your array and the remote database, just call the `sync()` function. This will handle any direct modifications to the objects in `Frame()` and re-render your component if needed. Remote changes will be synced to the client and local changes will be synced with the database.

P.S. Check the usage page in Easybase to view live-updated analytics on your project or integration, including volume and transfer loads.

<br />

### **5. Happy Hacking!**

Just like that, your project is now properly setup with a realtime data store that can be statefully accessed from any of your components.

The `useEasybase()` hook provides access to multiple useful functions. For example, let's take a look at Easybase's visual queries. Head to the 'Query' tab in your table and draw up something with the provided GUI. When you're done save it with a unique name. Now in your frontend application, you can use the `query()` function to call that by query name. No more need for complicated DBMS query language! This is just one of the low-code features that separate Easybase from other services when it comes to ease-of-use.

<hr />

# Conclusion

Where to fetch data from in a React project is a common question, especially for people deploying their first production application. We covered how to use Easybase to instantly implement a serverless data platform that can be deployed for free. For more information about [React databases take a look here](/react/2020/09/20/The-Best-Way-To-Add-A-Database-To-Your-React-React-Native-Apps/), or for information on [user authentication with Easybase head here](/react/2020/11/25/The-Easiest-Way-To-Add-User-Authentication-To-Your-React-Project/).

Also, check out my recently published article in [Hackernoon about writing effective READMEs](https://hackernoon.com/using-reddit-and-twitter-to-make-your-readme-more-effective-ry1s34jw).

For any other questions or concerns feel free to use the 'leave a message' form below! I'll be sure to get back to you. Thanks for reading and have a great day!