---
layout: blog-guide
title: User Authentication in React & React Native with Easybase
date: 2021-06-07 05:20:00 -0400
categories: react
title_image: /assets/images/posts_images/user-authentication-header.png
title_image_sm: https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80&h=45
og_image: /assets/images/posts_images/new-react-auth-2.png
author_name: Ryan Parker
tags: Home Blog React
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=100&fm=jpg&cs=tinysrgb&w=85&h=85&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.75
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
meta_description: User authentication is an important feature of many React and React Native applications. This tutorial shows how to add a sign-in and sign-up workflow to your projects.
tocTitles: ["Introduction", "&lt;Auth /&gt;", "&lt;NativeAuth /&gt;", "Sign Out", "Sign Up Fields", "Theming", "Dictionary", "Manual Implementation"]
tocLinks: ["#introduction", "#auth-", "#nativeauth-", "#sign-out", "#sign-up-fields", "#theming", "#dictionary", "#manual-implementation"]
permalink: react-and-react-native-user-authentication/
---

## Introduction

React and React Native are powerful tools that can create beautiful, stateful interfaces and applications. Creating these apps, whether they be **mobile** or **web-based**, can become quite intricate. This is especially true when it comes to implementing modules such as user authentication; a sign-in and sign-up system where users can create accounts that can be managed by administrators.

Easybase makes this process simple with the [`<Auth />`](#auth-) and [`<NativeAuth />`](#nativeauth-) components that integrate painlessly with Easybase's React-friendly platform. These components can be customized with different themes and styles, so your application can have a **unique look**.

For those looking to manually implement a login interface, the last section of this piece demonstrates how to easily accomplish this with the provided user functions like [`signIn`](/docs/easybase-react/interfaces/types_types.contextvalue.html#signin), [`signOut`](/docs/easybase-react/interfaces/types_types.contextvalue.html#signout), [`forgotPassword`](/docs/easybase-react/interfaces/types_types.contextvalue.html#forgotpassword), and more.

<br />

## &lt;Auth /&gt;

Setting up a React project with Easybase is simple. [Use this reference to get up and running in just a couple of minutes](/react/#setup){:target="_blank"}.

Once that's finished, open up `App.js` in your React project (**for React Native take a look at the next section**). Ensure that your `ebconfig` file is in the `src/`, next to `App.js`:

```
├── ...
├── node_modules/
├── package.json
├── public/
└── src/
    ├── ebconfig.js ←
    ├── App.js
    └── index.js
```

Start by importing some essential items:

```jsx
import { EasybaseProvider, Auth } from 'easybase-react'
import ebconfig from './ebconfig'
```

`EasybaseProvider` will grant access to the functions necessary to perform user operations in the front-end code. The `Auth` component handles these functions automatically, with a customizable interface. Lastly, `ebconfig` is the unique token that connects your front-end to Easybase, downloaded from the **Projects** tab. Be sure to set and **save** the proper table permissions:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/new-react-auth-9.png" />


The components in `Auth` will **only** be accessible to users who are signed in. Wrap all of that in `EasybaseProvider` (with `ebconfig`) like so:

<!-- {% raw %} -->
```jsx
export default function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Auth>
        <p>Congrats, you're in!</p>
      </Auth>
    </EasybaseProvider>
  )
}
```
<!-- {% endraw %} -->

Save that and run your application by executing `npm run start` in your project directory.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/new-react-auth-1.png" />

Navigate to the sign-up page by clicking the secondary button under 'Continue'. Fill out that form and click 'Continue'.

*Note: a real email should be used for the **Forgot Password** workflow to work properly*

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/new-react-auth-2.png" />

**Congrats!** You're application is successfully using user authentication using [JWTs](https://auth0.com/docs/tokens/json-web-tokens) with local caching.

<br />

## &lt;NativeAuth /&gt;

<div class="sectionBox">
<p>
  This section is for <b>React Native</b>. Otherwise, continue to the next section.
</p>
</div>


React Native apps utilize Easybase's `NativeAuth` component which works **almost exactly** the same as the standard `Auth` component. This can be accessed via the `easybase-react/native` directory.

To set up a new React Native project with Easybase, use [`npx create-react-native-app`](https://github.com/expo/create-react-native-app#readme) and [follow the **Project** material here](/react/#setup){:target="_blank"}.

Since there is no `src/` folder when using `npx create-react-native-app`, place your `ebconfig` file in the root folder, next to `App.js`:

```
├── node_modules/
├── package.json
├── ios/
├── android/
├── ebconfig.js ←
├── App.js
├── index.js
└── ...
```

Your React Native application code, using the `<NativeAuth />` component, would look like the following:

<!-- {% raw %} -->
```jsx
import React from 'react'
import { Text } from 'react-native'
import { EasybaseProvider } from 'easybase-react'
import { NativeAuth } from 'easybase-react/native'
import ebconfig from './ebconfig'

export default function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <NativeAuth>
        <Text>Congrats, you're in!</Text>
      </NativeAuth>
    </EasybaseProvider>
  )
}
```

<img data-jslghtbx class="custom-lightbox lazyload" style="max-height: 700px;margin: auto;display: block;" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/new-react-auth-4.png" />

Although the rest of this article will demonstrate the `<Auth />` component, understand that these two components work almost identically. Furthermore, they have the same props that perform the same functions, respectively. For more technical information, [check out the source on GitHub](https://github.com/easybase/easybase-react/blob/master/src/ui/NativeAuth/NativeAuth.tsx).

<br />

## Sign Out

After a new user signs up, they are brought to the components inside the `<Auth />` component. You're probably going to want to head back to your `<Auth />` component at this point, but refreshing the page will not bring you back – the browser instance will still be signed in. This is a feature and occurs because the `easybase-react` library stores verification and refresh tokens on the user device to keep them **temporarily signed-in**, as most modern applications do.

Let's create a small component that allows users to sign out. To do this, import `useEasybase`, which provides the functions used to communicate with your authentication instance and database.

```jsx
// ...
import { EasybaseProvider, Auth, useEasybase } from 'easybase-react'
// ...

const SignOutButton = () => {
  const { signOut } = useEasybase()

  return (<button onClick={signOut}>Sign Out</button>) // <-
}

export default function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Auth>
        <p>Congrats, you're in!</p>
        <SignOutButton /> {/* <- */}
      </Auth>
    </EasybaseProvider>
  )
}
```

Clicking this new button will sign out the current user, invalidate their cached tokens, and return the `<Auth />` component.

Here are some of the other **user-related functions** returned from that hook, that you may find useful to use in your front-end code: [signOut](/docs/easybase-react/interfaces/types_types.contextvalue.html#signout), [signIn](/docs/easybase-react/interfaces/types_types.contextvalue.html#signin), [signUp](/docs/easybase-react/interfaces/types_types.contextvalue.html#signup), [isUserSignedIn](/docs/easybase-react/interfaces/types_types.contextvalue.html#isusersignedin), [forgotPassword](/docs/easybase-react/interfaces/types_types.contextvalue.html#forgotpassword), [forgotPasswordConfirm](/docs/easybase-react/interfaces/types_types.contextvalue.html#forgotpasswordconfirm), [getUserAttributes](/docs/easybase-react/interfaces/types_types.contextvalue.html#getuserattributes), [resetUserPassword](/docs/easybase-react/interfaces/types_types.contextvalue.html#resetuserpassword), and [much more](/docs/easybase-react/interfaces/types_types.contextvalue.html).

<br />

## Sign Up Fields

To customize which fields are present in the sign up view, use the [`signUpFields`](/docs/easybase-react/interfaces/ui_uitypes.isignupfields.html) prop of `Auth`. This prop takes an object, mapping the input name to an object with some constraints and a corresponding error message to display when constraints are not met.

<!-- {% raw %} -->
```jsx
export default function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Auth
        signUpFields={{
          phoneNumber: {
            required: {
              value: true,
              message: "Please fill out 'Phone Number'"
            }
          }
        }}
      >
        <p>Congrats, you're in!</p>
        <SignOutButton />
      </Auth>
    </EasybaseProvider>
  )
}
```
<!-- {% endraw %} -->

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/new-react-auth-3.png" />

Various fields are available and the types of constraints allowed can be seen in [React Hook Form's Register documentation](https://react-hook-form.com/api/useform/register) (be sure to enable 'Register with validation and error message' under 'Register Options').

You can also just pass `true`, for optional fields:

<!-- {% raw %} -->
```jsx
export default function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Auth signUpFields={{ gender: true }}>
        <p>Congrats, you're in!</p>
        <SignOutButton />
      </Auth>
    </EasybaseProvider>
  )
}
```
<!-- {% endraw %} -->

These extra fields will appear as 'User Attributes' under the **Users** tab in Easybase

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/new-react-auth-6.png" />

## Theming

Developers often strive for their apps to have a unique **look and feel**. There are two ways to style the `<Auth />` component:

1. The [`customStyles`](/docs/easybase-react/interfaces/ui_uitypes.istyles.html) prop for specific component CSS
2. The [`theme`](/docs/easybase-react/interfaces/ui_uitypes.iauth.html#theme) prop for general styling

Under the hood, _themes_ are just large `customStyles` sheets. For example, [take a look at the source for the 'minimal-dark' theme](https://github.com/easybase/easybase-react/blob/master/src/ui/themes/minimal-dark.ts).

Here's an example that utilizes both methods to create a **completely different UI** look and feel:

<!-- {% raw %} -->
```jsx
export default function App() {
  const myStyle = {
    container: {
      backgroundColor: '#eceff1',
    },
    form: {
      backgroundColor: '#fff',
      border: "2px solid #bcb7ce7f",
      borderRadius: 0,
      boxShadow: 'none'
    },
    textField: {
      fontSize: 16
    }
  }

  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Auth theme="material" customStyles={myStyle}>
        <p>Congrats, you're in!</p>
        <SignOutButton />
      </Auth>
    </EasybaseProvider>
  )
}
```
<!-- {% endraw %} -->

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/new-react-auth-5.png" />

All custom styling options can be seen in [the Easybase documentation for IStyles](/docs/easybase-react/interfaces/ui_uitypes.istyles.html). Themes are unavailable for React Native, but **[use INativeStyles](/docs/easybase-react/interfaces/ui_uitypes.inativestyles.html)** for Native `customStyles` options.

<br />

## Dictionary

To change the specific language used in the interface, use the *dictionary* prop to map the predefined labels to new string values.

Here's an example that uses *dictionary* to do the following:
 * Change the label "Sign in to your account" to "Welcome to React-flix!"
 * Change the Email input placeholder, "Email" to "iCloud Name *"

<!-- {% raw %} -->
```jsx
export default function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Auth dictionary={{
        signInHeader: "Welcome to React-flix!",
        emailLabel: "iCloud Name *"
      }}>
        <p>Congrats, you're in!</p>
        <SignOutButton />
      </Auth>
    </EasybaseProvider>
  )
}
```
<!-- {% endraw %} -->

Utilizing this feature, along with the styling options demonstrated above, give developers **great control** over their application's sign-in/sign-up interface.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/new-react-auth-7.png" />

These dictionary changes are available throughout the interface. Take a look at the [IDictionary type for all options](/docs/easybase-react/interfaces/ui_uitypes.idictionary.html).

## Manual Implementation

<div class="sectionBox">
<p>
  <b>Related functions:</b> 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#signin" target="_blank">signIn</a>, 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#signout" target="_blank">signOut</a>, 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#signup" target="_blank">signUp</a>, 
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#isusersignedin" target="_blank">isUserSignedIn</a>,
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#forgotpassword" target="_blank">forgotPassword</a>,
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html#userid" target="_blank">userID</a>,
  <a href="/docs/easybase-react/interfaces/types_types.contextvalue.html" target="_blank">and more</a>
</p>
</div>

It may be that case that `<Auth />` or `<NativeAuth />`, even with the customization options, do not give you enough control over the workflow of your application's interface. The [`useEasybase`](/docs/easybase-react/interfaces/types_types.contextvalue.html) hook provides all the necessary functions to implement an authentication interface. **In fact, `<Auth />` and `<NativeAuth />` work by using this hook**, so take a look at [that source code as a reference](https://github.com/easybase/easybase-react/tree/master/src/ui/Auth/pages).

Let's create our own component called `<MyAuth />`. This component will have two features. One is a button in the top-right corner of the app that says 'Sign In' or 'Sign Out' based on the user's state. The other being a modal that will appear above our application when a user clicks 'Sign In'. The modal will feature a username and password text field and buttons to sign in or sign up. **Use the `isUserSignedIn()` function to conditionally render components and check the user's current authentication status**:

<!-- {% raw %} -->
```jsx
/*
Example App.css:

.authButton {           .authDialog {                       .authDialog div {
  position: absolute;     position: fixed;                    padding: 20px;
  top: 10px;              top: 0;                             background-color: white;
  right: 50px;            bottom: 0;                          display: flex;
  width: 100px;           left: 0;                            flex-direction: column;
  height: 50px;           right: 0;                         }
  font-size: 15px;        background: rgba(0, 0, 0, 0.7);
}                         transition: opacity 500ms;
                          visibility: hidden;
                          opacity: 0;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        }
*/

// ...
import { useState } from 'react'
import './App.css'
// ...

function MyAuth({ children }) {
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

  if (isUserSignedIn()) {
    return (
      <>
        <button onClick={onAuthButtonClick} className="authButton">Sign Out</button>
        {children}
      </>
    )
  } else return (
    <>
      <button onClick={onAuthButtonClick} className="authButton">Sign In</button>
      <div className="authDialog" style={dialogOpen ? { opacity: 1, visibility: 'visible' } : {}}>
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
<!-- {% endraw %} -->

*Note that the styling of this component is extremely simple for sake-of-brevity*

Finally, we can replace `<Auth />` with our new component, `<MyAuth />`:

<!-- {% raw %} -->
```jsx
export default function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <MyAuth>
        <p>Congrats, you're in!</p>
      </MyAuth>
    </EasybaseProvider>
  )
}
```
<!-- {% endraw %} -->

Just like that, your application supports a *stateful* user authentication workflow. 

Note that the [`signIn`](/docs/easybase-react/interfaces/types_types.contextvalue.html#signin), [`signOut`](/docs/easybase-react/interfaces/types_types.contextvalue.html#signout), and [`signUp`](/docs/easybase-react/interfaces/types_types.contextvalue.html#signup) functions are asynchronous, so you can use `await` or `.then` to handle the completion of these events.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase best react database firebase alternative 6" data-src="/assets/images/posts_images/new-react-auth-8.png" />

This example doesn't add any user attributes, but these can be assigned in a couple of different ways:

1. Manually, in one of the rows under the **Users** tab in Easybase.
2. Pass an object in `signUp(newUserID, password, { firstName: "bob" })`. 
3. If a user is signed in, [`setUserAttribute("firstName", "bob")`](/docs/easybase-react/interfaces/types_types.contextvalue.html#setuserattribute)

You can then retrieve these objects programmatically with [`getUserAttributes()`](/docs/easybase-react/interfaces/types_types.contextvalue.html#getuserattributes). **User attributes are not for storing user-corresponding application data**, rather it's used for simple metadata such as *createdAt* or *firstName*.

**For more information on manually implementing login authentication in React Native, take a look at [Michael's article in freeCodeCamp](https://www.freecodecamp.org/news/build-react-native-app-user-authentication/).**