<p align="center" style="border-radius: 50%">
    <img src="https://raw.githubusercontent.com/icaroglauco-lab/IGBranch/0c976e232eeddc8dce33016480641f53094b29dc/logo.png" height="150" width="175" alt="Unform" />
</p>

<p align="center">HVex test assigment for junior developer role</p>

## Overview

This project is created to apply for a vancacy role as junior developer at HVex, and it follows this **[document](https://drive.google.com/drive/folders/197H-LjU6mNSoflwLIm2UzwcqTpZ9YAxS)**.

Its a M.E.R.N. stack application for a simple chatroom served with user crud and auth system.

## Project struture

This project is divided into two major folders: client and server.

The server is responsible for mongodb integration, authentication, socket.io protocols, in memory messages allocation and rest api.

You can find the following files and its responsabilities:

- auth.js: authentication middleware, single point authentication handler, direct authentication handler and private authenticate service function

- dblayer.js: setup for mongodb connection and custon interface layer

- api.js: api routes object with endpoint divided by http methods and its responses functions

- validates.js: a quick and simple helper or minimum verification of valid atributes for the api layer

- index.js: imperative sumarized server script, glueing up express server with auth middleware, db api endpoints, socket-io events and client-side linkage

Now, the client side


## How to use

Clone this repository (git clone https://github.com/icaroglauco-lab/hvex-assignment-test.git) or download its zip file

Then run its serve script

```npm run serve``` 