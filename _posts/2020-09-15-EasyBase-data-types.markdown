---
layout: blog
title:  "Easybase Data Types"
date:   2020-09-15 01:39:03 -0400
categories: about
tags: Home Blog Easybase
author_image: https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&cs=tinysrgb&w=600&h=600&ixid=eyJhcHBfaWQiOjF9&fit=crop&crop=focalpoint&fp-x=0.51&fp-y=.375&fp-z=1.85
author_name: Ryan Parker
author_description: Ryan Parker is a Growth Marketing Manager and Staff Writer for EasyBase. He has previously written and contributed to various tech-related publications.
sidebar_video: https://www.youtube-nocookie.com/embed/-CbruClAFMY
---
#### Easybase constrains data to specific types that can be queried or retrieved in various formats.

<br />
<br />

# Number
<hr />

#### This data type contains all raw numbers including integers, floats, etc.

<br />

##### GET Formats: **Number**
##### Query Formats: **Number, String containing number**

<br />
<br />

# Text
<hr />

#### Raw text is best stored in this data type. For text with formatting (WYSIWYG) look at the 'Rich Text' type.

<br />

##### GET Formats: **String**
##### Query Formats: **String**

<br />
<br />

# Time
<hr />

#### This data type represents times, without a corresponding date.

<br />

##### GET Formats: **Total minutes, HH:MM 24h, HH:MM 12h**
##### Query Formats: **Total minutes, HH:MM 24h, HH:MM 12h, hh:mm**

<br />
<br />

# Date
<hr />

#### This data type represents a date. Dates will be stored in UTC format.

<br />

##### GET Formats: **MM/DD/YYYY, YYYY/MM/DD, dd-mmm-yyyy, dd.mm.yyyy, UNIX Stamp, ISO String, Date object**
##### Query Formats: **MM/DD/YYYY, YYYY/MM/DD, dd-mmm-yyyy, dd.mm.yyyy, UNIX Stamp, ISO String, Date object**

<br />
<br />

# Image
<hr />

#### Images can be uploaded directly to the EasyBases CDN. The link to an image can be posted to your integration if it is already publicly available.

<br />

##### GET Formats: **URL**
##### Query Formats: **URL**

<br />
<br />

# Video
<hr />

#### Videos can be uploaded directly to the EasyBases CDN. The link to a video can be posted to your integration if it is already publicly available.

<br />

##### GET Formats: **URL**
##### Query Formats: **URL**

<br />
<br />

# File
<hr />

#### Files function as a generic type of the photo and video data type. Files can be uploaded directly to the EasyBases CDN. The link to a file can be posted to your integration if it is already publicly available.

<br />

##### GET Formats: **URL**
##### Query Formats: **URL**

<br />
<br />

# Location
<hr />

#### Locations are stored as coordinates that can be used to perform geospatial queries. EasyBase provides a visual way to create these objects using Maps API.

<br />

##### GET Formats: **Preview image, "lat, lon", Common name**
##### Query Formats: **"lat, lon", array of two numbers**

<br />
<br />

# Boolean
<hr />

#### The most primitive of the data types, the boolean can be in 1 of 3 states; true, false, or null.

<br />

##### GET Formats: **1/0, T/F**
##### Query Formats: **1, 0, true, false, string of any of preceding**

<br />
<br />

# Rich Text
<hr />

#### Rich text adds the capability of basic formatting (font size, adding images). It is synchronously converted to raw HTML. The raw HTML can be injected directly into a website or app for more text flexibility.

<br />

##### GET Formats: **HTML String**
##### Query Formats: **HTML String**