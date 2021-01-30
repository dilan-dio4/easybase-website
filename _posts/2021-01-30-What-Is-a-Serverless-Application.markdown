---
layout: blog
title: What Is a Serverless Application? The Benefits of Going Serverless
date: 2021-01-30 11:20:00 -0400
categories: about
title_image: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80
title_image_sm: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80
author_name: Ryan Parker
tags: Home Blog Easybase
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=600&h=600&ixid=eyJhcHBfaWQiOjF9&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.85
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for Easybase. He has previously written and contributed to various tech-related publications.
sidebar_video: https://www.youtube-nocookie.com/embed/-CbruClAFMY
meta_description: Serverless technology gives developers the power to create scalable applications. Let's explore this app architecture and the benefits of using serverless.
---

Over the last decade, the term '**serverless**' has made rounds throughout the programming community, particularly with regard to application development. There are good reasons for this too. This technology has given developers, especially individuals and small teams, the tools required to deploy *production-ready* apps without the burden of manually implementing the convoluted systems typically involved.

Beyond that, these technologies are extremely effective when it comes to **optimizing cost and time**. It's no wonder that starters are moving towards serverless architecture. Web and mobile applications of all kinds can discover the benefits of leveraging this ever-growing tech stack.

<hr />

## What is a serverless application?

The traditional architecture of a web or mobile application involves two main components. The first being the frontend application that manages UI/UX and application state. The second being an **on-site** server that handles the necessary backend process required by the front end, such as the database or API. Often, *multiple* backend machines are necessary to handle the connection between the front end and back end.

**There are many downsides to this structure:**

* The initial cost of the on-site servers
* Installing and learning the various backend systems
* Scaling up requires manual configuration
* High latency during periods of heavy traffic
* Dealing with server software updates and maintenance
* Updating the backend codebase could cause unforeseen errors

All of these factors either cost **time or money**. Beyond that, sleight missteps in the manual implementation could lead to a system that is insecure, inefficient, or prone to outages.

<img src="/assets/images/posts_images/serverless-1.png" alt="traditional application infrastructure diagram versus serverless infrastructure" class="custom-lightbox my-3" data-jslghtbx width="100%" />

Serverless technology abstracts all of this overhead away to the *provider*. Your application uses code in the front end to interface with the *serverless* back end. Now, the truth is that there actually is a server being used, but it's the provider's server.

The provider deals with all the drawbacks stated above, instead of you. The developer just gets access to the modules required by your apps such as user authentication or database. **The provider will handle security and availability**. Plus, they will be able to automatically allocate resources to the application if it demands it. This type of scalability and on-demand performance is not available to a traditional, straightforward on-site server. 

Simply put, developers love serverless architecture because it saves them time and money. This results in a programming experience that is *efficient* and *productive*.

<img src="/assets/images/posts_images/serverless-2.png" alt="serverless application infrastructure diagram" class="custom-lightbox my-3" data-jslghtbx width="100%" />

One of the most attractive features of serverless and cloud computing, in general, is the **pricing structure**. This type of system generally operates on a pay-as-you-go model. During periods of low usage, you will be paying *significantly* less, but the serverless provider will be flexible during times of high volume. Be wary of the potential cost to your account if you sustain high volume for an extended period. Although, this is not the rule as much as it is the exception.

This pricing structure is a huge advantage to individuals and small teams looking to deploy a serverless application. The is mostly because of the $0 overhead cost. Plus, when it comes time to shut down a project, the team is not stuck with a bunch of hardware they purchased. A serverless infrastructure can be canceled immediately online, although charges that have been accrued up to that point will still be billed.

<br />

## Common serverless functionalities

#### 1. Database
One of the most commonly used of the bunch, cloud database is especially effective because of the providers' ability to provide a scalable and available solution. When used in a serverless stack, the application will often query the backend database with dynamic parameters based on the state of the UI. Developers can ignore the underlying hardware without losing any of the features in a traditional backend database.

#### 2. Functions
Serverless functions are stateless code actions driven to execution by the front end app, on-demand. **When a serverless function isn't running, it isn't using server resources**. The function avoiding charges during these idle periods. This cloud computing functionality is particularly cost-effective.

The provider will create an *isolated* environment during the initialization of these functions. Another benefit of serverless function is the ability to spawn multiple of these environments simultaneously. This is not typically available in a stateful backend environment.

#### 3. User Authentication
One of the most tedious modules of modern app development is the handling of multiple users with 'sign up' capability. This is because there are so many security and cryptography requirements involved in properly handling users' credentials and data.

Providers that have this functionality will greatly lower the overhead involved in creating your own user authentication system. For example, [here are some of the practices and factors to consider](https://cybersecurity.ieee.org/blog/2016/06/02/design-best-practices-for-an-authentication-system/) according to a blog post by the Institute of Electrical and Electronics Engineers. This is very time-intensive and will cause many headaches. Thankfully, modern serverless architecture can implement this functionality quickly and securely.

<br />

## Who are the serverless providers?

There are various cloud/serverless providers out there. Before you choose one, take note of which functionalities they can provide for your specific use case. Beyond that, all the ones listed here have a pricing calculator you can use to estimate your potential cost.

#### [Azure](https://azure.microsoft.com/en-us/solutions/serverless/)

Azure can be quite complicated for beginners looking to get into serverless application development, as it's geared more towards larger teams and IT experts. It likely has the most different types of services available, but you likely won't need/want to use the overwhelming majority of them. Beyond that, cost-effectiveness is not an advantage of Azure.

<br />

#### [Easybase](https://easybase.io/)

As the name states, this provider best suited to those who are not experts in cloud computing functionality. Built for small teams and individuals, **Easybase is a great option for applications that require a database and user authentication**. You can check out a [video using this platform to implement user authentication in a mobile app here](https://youtu.be/anFHmjlr0YY).

React and React Native developers, take a look at [the Easybase React walkthrough](https://easybase.io/react/) to see how, in just a couple of minutes, you can implement serverless in your projects.

<br />

#### [Amazon Web Services](https://aws.amazon.com/serverless/)

The most popular of the group, AWS is one of the most mature cloud service providers around. It's liked by developers and is built for dynamic serverless applications, among other things. AWS's strong suite is **Lambda**. Lambda is their implementation of cloud functions and it's very flexible. You can choose between various runtimes and environments (Node, Python, etc) and you customize the resources assigned to each *individual* function.

<hr />

## Conclusion

*Thank you for reading this article!* I'm excited to watch serverless application usage grow in the future. This technology has a lot of momentum and is democratizing access to enterprise backend systems. Click the **Blog** button on the top navigation bar to explore other pieces I've written regarding serverless, application development in 2021, and other various programming-related topics. If you found this piece useful or interesting please use the social buttons below to share it. Happy coding!