# UNT Diagnostic Research Tool

## Overview

This app uses React, NPM for package management, ChakraUI for styling, and RecoilJS for state management.

## Setup

UNT DRT currently uses Firebase Realtime Database(NoSQL) as the database as well as for authentication. DRT is deployed using Firebase hosting. Firebase has generous free tiers, within which this project is currently running.

## Firebase

First create a Firebase account. Then follow these steps to create a Firebase project and register your app:
- https://firebase.google.com/docs/web/setup

To register this app, you will need to replace the `firebaseConfig` in `src/components/Firebase.jsx` with the `firebaseConfig` provided through the app registration process.

## Firebase Database

To setup Firebase Database, refer to this link: 
- https://firebase.google.com/docs/database/web/start

The current security rules for the Firebase Realtime Database are these(no security):

```json
{
  "rules": {
    "Complaints": {
    	".read": true,
    	".write": false
    },
    "Tests Taken":{
    	".read": true,
    	".write": true,
    }
  }
}
```

To port over the data(current case data) to your firebase realtime database, click the 3 dots on the right in the Realtime Database screen in the firebase console and click **Import JSON**. Then select `drt2-new-db.json` and the database will be populated.

It has some sample tests that were done in it already, if those are not desired, then they can be deleted from the json before using the **Import JSON** functionality.

Firebase realtime database console also allows deleting nodes from within it.

## Hosting

The website is currently hosted with Firebase Hosting, which can be done by following these steps:
- https://firebase.google.com/docs/hosting/quickstart
- If custom domain desired: https://firebase.google.com/docs/hosting/custom-domain

Make sure to run `npm run build` before deploying.

Any hosting service can be used but firebase hosting is fairly simple

## How Users "take" Tests/Login

For a user to login, they must provide a test id. The test id must be a key under the `Tests Taken` node in the database. If it is not a key, then the user will not be allowed to login and take the test.

So, to create a test for a user, create a unique key with a child key-value of `0: Patient comes to the clinic complaining of chest pain`

eg.

```
Tests Taken
    └- <test id>
        └- 0: Patient comes to the clinic complaining of chest pain
```

I have created a programmatic way of generating users with instructions on how to use it in this link: https://colab.research.google.com/drive/1FtORs96usLPE0QbIc33LuR1hIY415gJ-?usp=sharing or `DRT_Helper.ipynb`

That colab notebook also has code with a sample analysis of the results data