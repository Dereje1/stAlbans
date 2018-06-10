# stAlbans
A demo app .

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

| Prerequisite                                | Version |
| ------------------------------------------- | ------- |
| [Node.js](http://nodejs.org) /  npm (comes with Node)  | `~ ^8.9.5` / `~^5.6.0` |
| [Git](https://git-scm.com/downloads) | `~ ^2` |
| [MongoDB Community Server](https://docs.mongodb.com/manual/administration/install-community/) | `~ ^3.4.9`  |
| Pyhton | `2.7`  |



### Installing

Create a new directory and initialize git

```
mkdir stalbans
$ cd stalbans
$ git init
```

Pull from github and install packages

```
$ git pull https://github.com/Dereje1/stAlbans.git
$ npm install
```

If using mongoDB locally see below to start the db (if using mlab skip this step)

```
$ mkdir data
$ mongod --port 27017 --dbpath=./data
```

create .env files
>In the root of the project create a .env file with the following contents
```
SESSION_SECRET=<Session Secret Key>
MONGOLAB_URI=<mongoDB connection string>
TWITTER_CONSUMER_KEY=<Twitter Consumer Key>
TWITTER_CONSUMER_SECRET=<Twitter Consumer Secret>
TWITTER_CALLBACK=http://localhost:3000/auth/twitter/callback
AUTHORIZED_USERS=<Authorized Users>
```
Create the JSON file
>First copy and paste the 'sensitive' folder into the root of the project and then,
```
$ cd .\importCSV\
$ python makejson.py
$ cd ..
```
Run the development environment
```
$ npm start
```
Go to http://localhost:3000/.
