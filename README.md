<p align="center" style="border-radius: 50%">
    <img src="https://raw.githubusercontent.com/icaroglauco-lab/IGBranch/0c976e232eeddc8dce33016480641f53094b29dc/logo.png" height="150" width="175" alt="Unform" />
</p>

<p align="center">HVex test assigment for junior developer role</p>

## Overview

This project is created to apply for a vancacy role as junior developer at HVex, and it follows this **[document](https://drive.google.com/drive/folders/197H-LjU6mNSoflwLIm2UzwcqTpZ9YAxS)**.

Its a Mongo Express Node stack application for a simple chatroom served with user crud and auth system.

### I wanted to create the R from MERN, for the client side front-end, but I found myself a little bit overwhelmed, so I decided to just keep with the server side. Even tho its a server side application, I have no major skills with security and such and I didnt want to waste too much time on this.

## Project struture

The server is responsible for mongodb integration, authentication;

You can find the following files and its responsabilities:

- auth.js: authentication middleware, single point authentication handler, direct authentication handler and private authenticate service function

- dblayer.js: setup for mongodb connection and custon interface layer

- api.js: api routes object with endpoint divided by http methods and its responses functions

- validates.js: a quick and simple helper or minimum verification of valid atributes for the api layer

- index.js: imperative sumarized server script, glueing up express server with auth middleware, db api endpoints, socket-io events and client-side linkage

Now, the client side
**TODO**

## How to use

- Clone this repository (git clone https://github.com/icaroglauco-lab/hvex-assignment-test.git) or download its zip file

- Then run its serve script: ```npm run serve``` 