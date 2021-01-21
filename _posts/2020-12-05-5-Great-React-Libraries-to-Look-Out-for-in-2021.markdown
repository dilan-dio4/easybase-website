---
layout: blog
title:  5 Great React Libraries to Look Out for in 2021
date:   2020-12-05 11:25:15 -0400
categories: react
title_image: https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png
author_name: Ryan Parker
tags: Home React Easybase
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=600&h=600&ixid=eyJhcHBfaWQiOjF9&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.85
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
sidebar_video: https://www.youtube-nocookie.com/embed/-CbruClAFMY
meta_description: React continues to be the most popular front-end framework, and for good reason. Let's take a look at 5 libraries that may just be the next big thing in 2021!
---

Front-end JavaScript frameworks have become incredibly popular over the last five years, including [Vue](https://vuejs.org/), [Angular](https://angular.io/), and [React](https://reactjs.org/). These modules have allowed beginners and exports turn their ideas into reality. Furthermore, they can deploy their applications on all kinds of devices.

Let's take a look at 5 React libraries that are going to be very influential in 2021. Particularly, we'll focus on packages that are relatively new and making strides in the community.

Enjoy!

<hr />

# 1. **react-data-grid**

## [Github](https://github.com/adazzle/react-data-grid)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-data-grid?style=social)

Finally, an Excel clone for React that's actually intuitive and aesthetically pleasing. This is a difficult task to accomplish and I must say that this project really nails it. The featured grid has support for editors, keyboard navigation, and copy & paste.

[Here's an example of a react-data-grid sheet](https://adazzle.github.io/react-data-grid/canary/iframe.html?id=demos--common-features&viewMode=story). Notice how snappy it is. I'm assuming they utilized some form of virtualization and it really shows in this example. The application is snappy and sharp. Plus, initializing one of these grid could not be easier!

```jsx
function App() {
  return (
    <DataGrid
      columns={[
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' }
      ]}
      
      rows={[
        { id: 0, title: 'Example' },
        { id: 1, title: 'Demo' }
      ]}
    />
  );
}
```

<br />

# 2. **use-editable**

## [Github](https://github.com/kitten/use-editable)
![npm bundle size](https://img.shields.io/bundlephobia/min/use-editable?style=social)

There a plethora of text editors available for React [especially when it comes to WYSIWYG]. This library takes a different approach though. I have to start by saying this library is incredibly small, so give it a look if this could be useful for your projects. The `use-editable` library provides a small hook that allows elements to be `contenteditable` while still being fully React renderable. This project's goal is to eliminate the needs for any interfacing with the DOM or `innerHTML` to deal with natively editable content. It works on almost much any element too!

To use this library, simply initiate a ref your React element and a state for your element. From there all you have to do is pass it to the useEditable hooks as follows: `useEditable(editorRef, setRefContent)`. Here's a [CodeSandbox demo](https://codesandbox.io/s/use-editable-0l9kc). Give it a try!

<br />

# 3. **easybase-react**

## [Github](https://github.com/easybase/easybase-react)
![npm bundle size](https://img.shields.io/bundlephobia/min/easybase-react?style=social)

You know we had to plug our own! This library makes user authentication and database integration easier than ever before. It works with both Easybase projects or REACT integrations. The `useEasybase()` hook gives developers access to the functions needed for a scalable project. Just wrap your root component in a custom `ebconfig.js`:

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
```

From there you can perform user authentication operations and access a stateful database array! Just for you, [it's free](https://app.easybase.io). Here's some more information if you want to [learn about Easybase and React](https://easybase.io/react/2020/09/20/The-Best-Way-To-Add-A-Database-To-Your-React-React-Native-Apps/). Let's take a brief look at user authentication with `easybase-react`:

```jsx
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

<br />

# 4. **react-flow**

## [Github](https://github.com/wbkd/react-flow)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-flow?style=social)

This package has solid usage for its age. It's main implementation is the ability to build interactive node-based editors, flow charts and diagrams. The developers focused on a solid mix of functionality and customizability.

The package accomplishes it goal of making it easy to implement node-based graphs with custom node types. Plus, it comes with components (mini-map, graph controls, etc.). Feel free to check out the examples or read the blog post to get started.

Take a look at an [example here](https://reactflow.dev/examples/). This library appears to cover a lot of developer use cases regarding flow chart visualizations. It's fast and responsive too!

<br />

# 5. **Atomic Layout**

## [Github](https://github.com/kettanaito/atomic-layout)
![npm bundle size](https://img.shields.io/bundlephobia/min/atomic-layout?style=social) 

*Note this project's peer dependencies*

Surprisingly this is our only layout library in this list (even though it feels like there's millions out there) and there is a good reason for that. I personally am not one for layout libraries due to the functionality of [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox), but this package might change how I structure my projects in the future. Turns out `atomic-layout` handles much more than just spacing.

It's often very difficult to handle proper distributing and spacing when considering device scalability. Atomic Layout helps you to compose your elements by introducing a dedicated spacing layer called Composition. It encourages you to separate concerns between UI elements' visual appearance and spacing between them. Let's take a look at a brief example below:

```jsx
const areasMobile = `
  thumbnail
  header
  footer
`
const areasTablet = `
  thumbnail header
  thumbnail footer
`

const Card = ({ title, imageUrl, actions }) => (
  <Composition areas={areasMobile} areasMd={areasTablet}>
    {({ Thumbnail, Header, Footer }) => (
      <React.Fragment>
        <Thumbnail>
          <img src={imageUrl} alt={title} />
        </Thumbnail>
        <Header as="h3">{title}</Header>
        <Footer padding={10} paddingMd={20}>
          {actions}
        </Footer>
      </React.Fragment>
    )}
  </Composition>
)
```

The `Composition` element allows developers to contextualize their React components based on the size of the users device. This is much cleaner than conditionally rendering every attribute of the component. Take a look at a more [detailed example](https://codesandbox.io/s/responsive-props-8m14f?file=/src/components/Item.js) that shows the true power of this library.