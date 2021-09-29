---
layout: blog
title: 4 Reasons To Use WebSockets for Your Next Project + Example
date: 2021-09-29 11:20:00 -0400
categories: development server
title_image: /assets/images/posts_images/websockets-hero.png
author_name: Ryan Parker
tags: Blog Server
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=193&h=193&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.75
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
meta_description: Should you use WebSockets for your next app? Here is 4 benefits of using WebSocket instead of traditional HTTP requests, plus a working chat room example.
permalink: 4-reasons-to-use-websockets-for-your-next-project-with-example/
---

## Introduction

WebSockets is bi-directional technology for web applications that allows for real-time communication across clients and servers. Unlike traditional HTTP requests, WebSockets stay open for the life of the application, until explicitly closed. Furthermore, WebSockets are much more efficient than the clunky, resource-intensive alternative, HTTP Long Polling.

This technology has become quite popular over the last decade, with typical use cases including social feeds, multiplayer games, collaborative editing, chat applications, and more. In fact, WebSockets are deeply integrated into many of the websites and applications you probably use every day. The protocol's strengths proved to be very beneficial for all types of functional web and mobile apps (*more on that later*).

**Let's dive into four reasons why you should opt for WebSockets, instead of traditional HTTP requests, for your next application**. The second half will feature a real working example of using WebSockets to create a real-time chat room application. We will set up a back end and browser app that you can use and customize!

## 1. Wide Support

The [WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) has surprising support across browsers. According to [caniuse](https://caniuse.com/websockets), WebSockets are currently supported across every major browser, web-based and mobile, with 98% of globally used browsers supporting the interface.

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase websockets caniuse" data-src="/assets/images/posts_images/websockets-1.png" />

This means that WebSockets has more client support than many other HTML5 and ES6 features, such as [arrow functions](https://caniuse.com/arrow-functions), which only has 95% of globally used browsers supporting it.

In fact, many mobile app development frameworks support the WebSockets API as well, including, but not limited to, [React Native](https://reactnative.dev/docs/network#websocket-support), [Flutter](https://flutter.dev/docs/cookbook/networking/web-sockets), and [Xamarin](https://github.com/NVentimiglia/WebSockets.Pcl). WebSockets has deep uses across many businesses and websites, such as GitHub, Easybase, Twitter, Facebook Messenger, and much more. Much of that popularity comes from how widely supported the technology is. Companies can *trust* that their applications will be supported by their users' devices.

## 2. Blazing fast speed

One of the benefits of WebSocket connections staying alive is that subsequent requests do not require the request connect/disconnect overhead, unlike HTTP requests. The HTTP protocol will require this overhead for every single request, no matter how you configure it.

**Don't believe me?** Take a look at [this performance study for yourself](https://browsee.io/blog/websocket-vs-http-calls-performance-study/).

If you compare the performance of 10 HTTP requests to 10 WebSockets requests, the difference is barely noticeable. Contrast this to 10000 consecutive requests, where WebSocket performance becomes exponentially faster.

Since WebSockets can take advantage of the TLS layer (known as WSS), there is no security sacrifice when it comes to switching from HTTPS to WSS. Plus, because of the overheads advantage, latency is much lower. Low latency is ideal for multiplayer games, collaborative apps, and other similar products.

## 3. Easy setup and management

If you have ever set up a back-end server with something like Nginx or Apache, setting up a WebSockets server won't be too difficult. It's probably best to use the [`ws`](https://github.com/websockets/ws) library, available on GitHub.

From there, it's just about configuring how you want to handle requests. The [README](https://github.com/websockets/ws/blob/master/README.md) for the `ws` library is super informative.

One thing to take into consideration is that only strings can be sent over WebSockets, so you might be best served by encoding objects and data types as strings. A common practice to send objects across WebSockets is to use `JSON.stringify()` before sending a message and `JSON.parse()` after receiving a message. This allows you to have **different message types and structures**.

For example, you may want to structure all messages as an object with the key *type* to tell the other node what type of message you're sending and the key *payload* with the associated data. In this case, an example message could look something like this:

```json
{
    "type": "SEND_MESSAGE",
    "payload": {
        "to": "Mike",
        "from": "James",
        "message": "Hello, Mike!"
    }
}
```

When the browser sends this to the server, start by checking *type* and handle the payload accordingly.

The Easybase platform uses this pattern [along with some security and broadcasting practices] to send messages across tables, users, and external apps.

## 4. Bi-directionality

In a traditional HTTP request, the client (web browser) initiates a single request, then the server processes this single request and sends a corresponding response. After that, the connection is finished and another one has to be initialized for a subsequent request.

**In the WebSockets networking pattern, the server can initialize a 'request' as well**. This can simplify the development process. Take the example of a social media feed: instead of having to manually check if new posts are made on an arbitrary timer on a loop, WebSockets allows the server to instantly push new posts to the client.

Since you don't necessarily know when the server's going to send the client something (unlike HTTP), we implement a listener function that will always be there to handle what's coming in. We'll see in the example below how we can safely differentiate between message types.

## Example

Here I'll demonstrate how to create a real-time chat room application in just a couple of minutes. This example will have two distinct pieces; the React app and the back-end server application. For your reference, the full source code for the browser app is available [here](https://github.com/dilan-dio4/chat-rooms-client) and the server code is available [here](https://github.com/dilan-dio4/chat-rooms-server). **You can run both of these applications on your machine at the same time**.

Since WebSocket connections can stay alive for the duration of the client session [which could be quite long], they don't make the best match for [serverless architecture](/about/2021/01/30/What-Is-a-Serverless-Application/) and, for that reason, the backend will be a Node server. Let's start by setting up the backend code.

### WebSockets Server Setup

We'll start a node application with the `npm init` command. If you do not know what the Node Package Manager is, [you can read about it here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#overview). Once the package is created, install the `ws` library with `npm install ws`. Following the installation, create a file called `index.js`. Open that up and import WebSocket with `var WebSocket = require('ws');`. Follow the [documentation](https://github.com/websockets/ws/blob/master/README.md) in the `ws` repository for more instruction on how to handle connections.

I'm going to use that message structure mentioned above. So each incoming message to the server will be a stringify-ed object with a *type* and *payload*. So, at its most basic, the server code will look something like the following:

```js
const wss = new WebSocket.Server({
    port: 8080
});

wss.on('connection', (ws, req) => {
    ws.on('message', (rawMessage) => {
        const { type, payload } = JSON.parse(rawMessage);
        if (type === "SEND_MESSAGE") {
            // TODO: handle message
        } else if (type === "OTHER_REQUEST") {
            // ...etc
        }
    });
});
```

**Run this server on your machine with `node index.js`**

### React App Setup

I'll use the popular [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html) library to quickly get up and running. Once that finishes running, open `App.js` and delete everything in the `App` function.

For this example, we'll have 3 different chat rooms. So, let's create a button to represent each different room. When any room button is clicked, let's display a new component for that active chat. So, at its most basic, our React application's `App.js` file will start at:

<!-- {% raw %} -->
```jsx
import { useEffect, useState } from 'react';

function Room({ currentRoom }) {
    return (
        <div>
            <p>In room: {currentRoom}</p>
            <input />
            <button>send</button>
        </div>
    )
}

export default function App() {
    const [currentRoom, setCurrentRoom] = useState(undefined);

    return (
        <div>
            <button onClick={_ => setCurrentRoom(1)}>Room 1</button>
            <button onClick={_ => setCurrentRoom(2)}>Room 2</button>
            <button onClick={_ => setCurrentRoom(3)}>Room 3</button>
            {currentRoom !== undefined && <Room currentRoom={currentRoom} />}
        </div>
    );
}
```
<!-- {% endraw %} -->

Run the application with `npm run start` and it will look something like this:

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase websockets caniuse" data-src="/assets/images/posts_images/websockets-2.png" />

When the `Room` component mounts we want to create a new WebSockets instance and tell the server we are waiting for messages from that. Since all modern web browsers have WebSockets built-in, there's **no need for external packages**. Our `Room` function now looks like the following:

<!-- {% raw %} -->
```jsx
function Room({ currentRoom }) {
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = new WebSocket("ws://localhost:8080");
        const socket = socketRef.current;

        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "ENTERED_ROOM",
                payload: currentRoom
            }));
        }
    }, [currentRoom])
    
    return (
        <div>
            <p>In room: {currentRoom}</p>
            <input />
            <button>send</button>
        </div>
    )
}
```
<!-- {% endraw %} -->

Now, let's handle that message type on our server.

## Server broadcast to active users

In our `index.js`, create a persistent object that holds on to all active users. When we get a message of type *ENTERED_ROOM*, add that socket instance to that room, represented as the number in our object:

```js
const activeUsers = {
    1: [],
    2: [],
    3: []
};

wss.on('connection', (ws, req) => {
    ws.on('message', (rawMessage) => {
        const { type, payload } = JSON.parse(rawMessage);
        if (type === "ENTERED_ROOM") {
            activeUsers[payload].push(ws);
        }
    });
});

```

## Sending & receiving messages in the browser

Now, back to our React app's `App.js` file. When a user clicks the *send* button we need to send a new object to our server with the string. We'll do this by storing the value of the `<input />` in a state variable called *messageVal*. When the user clicks the *send* button, trigger a new function called `sendMessage` that uses the socket reference to send the data to the backend.

Finally, we have to handle the situation in which the component **receives** a message. To handle this, use the `socket.onmessage` function to check what messages are coming through. If it is of type *RECEIVED_MESSAGE* push it to a new state variable called `receivedMessages`, which is an array. Finally, we have to map all of the received messages to the component.

Our `Room` component should look something like this:

<!-- {% raw %} -->
```jsx
function Room({ currentRoom }) {
    const [messageVal, setMessageVal] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        setMessageVal("");
        setReceivedMessages([]);

        socketRef.current = new WebSocket("ws://localhost:8080");
        const socket = socketRef.current;

        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "ENTERED_ROOM",
                payload: currentRoom
            }));
        }

        socket.onmessage = (ev) => {
            const data = JSON.parse(ev.data)
            if (data.type === "RECEIVED_MESSAGE") {
                setReceivedMessages(prev => [...prev, data.payload])
            }
        }
    }, [currentRoom])
    
    const sendMessage = () => {
        if (messageVal !== "") {
            const socket = socketRef.current;
            socket.send(JSON.stringify({
                type: "SEND_MESSAGE",
                payload: {
                    room: currentRoom,
                    message: messageVal
                }
            }));
        }
    }

    return (
        <div>
            <p>In room: {currentRoom}</p>
            {receivedMessages.map(msg => <p>{msg}</p>)}
            <input value={messageVal} onChange={e => setMessageVal(e.target.value)} />
            <button onClick={sendMessage}>send</button>
        </div>
    )
}
```
<!-- {% endraw %} -->

**Yes, it was that simple. Our React application code is finished**. All that's left to do is handle messages in our server code.

## Sending & receiving messages with the server

We already are storing all active users in our `activeUsers` object. Let's take advantage of the different *rooms* in that object when we need to relay a message to everyone.

Just like we did with the *ENTERED_ROOM* event, let's handle a *SEND_MESSAGE* event. As we specified in our React code, the payload for that will be an object with two properties; a *room* number and a *message*. So, `activeUsers[room]` will give us access to everyone in that room. Iterate over that array and the message like the following:

<!-- {% raw %} -->
```js
const activeUsers = {
    1: [],
    2: [],
    3: []
};

wss.on('connection', (ws, req) => {
    ws.on('message', (rawMessage) => {
        const { type, payload } = JSON.parse(rawMessage);
        if (type === "ENTERED_ROOM") {
            activeUsers[payload].push(ws);
        } else if (type === "SEND_MESSAGE") {
            const { room, message } = payload;
            activeUsers[room].forEach(user => user.send(JSON.stringify({
                type: "RECEIVED_MESSAGE",
                payload: message
            })))
        }
    });
});
```
<!-- {% endraw %} -->

**Congrats, you just created your very own chat room app**.

## Let's run it!

Remember to save your server app's `index.js` file and re-run it with: `node index.js`.

Save your React's `App.js` file and re-run it with: `npm run start`.

Now open two browser tabs to your app's URL (probably at http://localhost:3000) and head to the same room. Send a message on one browser and it shows up in the other!

<img data-jslghtbx class="custom-lightbox lazyload w-100" alt="Easybase websockets caniuse" data-src="/assets/images/posts_images/websockets-3.png" />

Remember, you can check out the source code for both the [browser app](https://github.com/dilan-dio4/chat-rooms-client) and [the server](https://github.com/dilan-dio4/chat-rooms-server) on GitHub.

## Bonus: adding user avatars

Since we are using React with real-time socket connections, a very useful library might be [react-avatar-group](https://github.com/easybase/react-avatar-group), which can give each active user a unique, responsive avatar, similar to that of Google Docs or Easybase.

The setup for this is very quick and it begins with installing the package with `npm install react-avatar-group` in our React project. There are many ways that we could implement this in our back-end, but let's use a simple method in which each user will be represented by a **number**. So, when a new user enters a room, let's broadcast some info (similar to how we did with *SEND_MESSAGE*).

<!-- {% raw %} -->
```js
    // ...
    if (type === "ENTERED_ROOM") {
        activeUsers[payload].push(ws);
        activeUsers[payload].forEach(user => user.send(JSON.stringify({
            type: "USER_COUNT",
            payload: activeUsers[payload].length
        })))    // <-- broadcast to every active socket 
                //     the amount of total sockets are in a room
    } // else if ...
```
<!-- {% endraw %} -->

In the client app, we have to handle this message as we did with *RECEIVED_MESSAGE*. Instead of pushing the *payload* to the `receivedMessage` state variable, we'll have a new state variable called `activeUsers` that will be an array of incrementing numbers [starting at 1] for each user.

At a very basic level, this will look like the following:

<!-- {% raw %} -->
```jsx
import { useEffect, useRef, useState } from 'react';
import AvatarGroup from 'react-avatar-group';

function Room({ currentRoom }) {
    // ...
    const [activeUsers, setActiveUsers] = useState([]);
    // ...

    useEffect(() => {
        // ...
        socket.onmessage = (ev) => {
            const data = JSON.parse(ev.data)
            if (data.type === "RECEIVED_MESSAGE") {
                setReceivedMessages(prev => [...prev, data.payload])
            }
            if (data.type === "USER_COUNT") {
                const newArr = [];
                for (let i = 1; i <= data.payload; i++) {
                    newArr.push(`${i}`);
                }
                setActiveUsers(newArr) // Creating a new array from [0..data.payload]
            }
        }
    }, [currentRoom])

    return (
        <div>
            <p>In room: {currentRoom}</p>
            {receivedMessages.map(msg => <p>{msg}</p>)}
            <input value={messageVal} onChange={e => setMessageVal(e.target.value)} />
            <button onClick={sendMessage}>send</button>
            <AvatarGroup
                style={{ marginTop: 25 }}
                avatars={activeUsers}
                bold
                uppercase
                shadow={1}
                // Other customization options
            />
        </div>
    )
}
```
<!-- {% endraw %} -->

<p align="center">
<img data-jslghtbx class="custom-lightbox lazyload" alt="Easybase websockets example" data-src="/assets/images/posts_images/websockets-5.gif" /></p>

**Check out the responsive avatars that represent active users.**

This is a simple implementation, but if you collect the user's name you can broadcast them to your connected instances instead of just a number. Instead of using a number array, you'll be able to use an array of each name. That is similar to how we display active table users with [Easybase](https://app.easybase.io).

## Conclusion

To developers unfamiliar with using WebSockets, the programming pattern is different than traditional HTTP requests. Rather than the deterministic nature of sending a request and waiting for a corresponding response, **WebSocket messages are best handled with a dynamic listener function like the one featured above**. Within the listener, some *if* statements will give your function structure to handle different types of messages.

Remember, a WebSocket doesn't close unless explicitly directed to. Closing the browser window will also shut down the socket automatically. For those reading of you who simply want to know if you should choose WebSockets or REST for your next project, **here's a simple rule:** if any of the following sounds like your application, then use WebSockets. If not, stick to traditional HTTP/REST requests:

* **Real-time collaboration** (Google Docs, Easybase)
* **Social feeds** (Twitter, Discord)
* **Image/text chat** (Messenger, Snapchat)
* **Synchronizing across multiple sessions** (Todoist, Dropbox)
* **News/score updates** (ESPN, CBS Sports)
* **Multiplayer game** (Lichess)

I hope this write-up helped you understand WebSockets, a fantastic communications protocol featured in some applications that you probably use every day. WebSockets are a great choice for bi-directional communication between client applications and back-end servers. This technology is great for *functional* web applications, such as single-page applications, progressive web applications, etc. There are definitely tradeoffs to traditional HTTP requests, so be sure to use the points highlighted above to help decided whether or not it's best for your next project.

If so, take a look at the included example for a basic tutorial on how to use WebSockets to create a real-time chat room application with React, Node, [ws](https://github.com/websockets/ws), and [react-avatar-group](https://github.com/easybase/react-avatar-group). If you are familiar with app development with JavaScript but don't want to use React try our [JavaScript Front-End Framework](/best-javascript-framework-library-quiz/) to discover which of the popular libraries is best for you.