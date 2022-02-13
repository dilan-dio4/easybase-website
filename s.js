var showdown = require('showdown');
var { readFileSync, writeFileSync } = require('fs');
// import React from 'react';
// import { render } from 'react-dom';

var fileName = '2021-03-09-The-Easiest-Way-To-Deploy-Cloud-Functions-for-your-React-Projects.markdown';

const data = readFileSync('./_posts/' + fileName, 'utf-8');

const cleanText = data.split("---")[2].replace(/^<!--(.*)$/gm, "");

const converter = new showdown.Converter();
// converter.setOption("omitExtraWLInCodeBlocks", true);
converter.setOption("noHeaderId", true);
converter.setOption("backslashEscapesHTMLTags", true);
converter.setOption("omitExtraWLInCodeBlocks", true);
converter.setOption("emoji", true);
converter.setOption("simpleLineBreaks", true);

let html = converter.makeHtml(cleanText);

html = html.replace(/&lt;/gm, "<")
html = html.replace(/&gt;/gm, ">")

writeFileSync('./o/' + fileName + '.html', html)