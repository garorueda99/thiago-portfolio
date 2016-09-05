Hi Thiago and/or future project maintainer!


## About
This document explains how this project is set up, and how to maintain and modify it.


## Project structure

The homepage is set as one simple HTML page, `index.html` in the root directory. For copy changes, you can simply edit this file, save, and upload.

CSS lives in /styles/index.css. Similarly you can modify this file as needed, save, and upload.

Javascript lives in /scripts/src, and a bit of setup is needed so we can update and run it...


## Tools
This project uses modern ES2015+ JS, as well as a module bundler called Rollup. We'll need to install some stuff before we can modify our files.


Start by installing Node: https://nodejs.org/en/download/

This should provide the `npm` command in the terminal.

Open a new terminal window, and `cd` into the project directory. If you need help with terminal commands, let me know!

Inside the project directory, run "npm install". This will install all the packages that the project uses.


## Running

After all the packages have finished installing, run "npm run start". This will create a watcher task that will automatically compile any edits you make.

Edit the files in /scripts/src, and the changes will be compiled and saved to /scripts/lib/index.js. This file is browser-friendly, and should never be edited directly.


#### Pseudo-redux

(this is mainly a note for future developers on the project)

For fun, I decided to create a "light" version of Redux for managing state. Its API is a subset of the official, and the code is quite short.

Because there is very little state to manage, the sanity checks and advanced sections (eg. store enhancers, middleware) were not required.

A single reducer currently exists, and it only serves to handle the status of whether or not the form is visible.
