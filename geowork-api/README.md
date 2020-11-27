# GeoWork API

<p align="center">
  <img  src="https://res.cloudinary.com/dlqmpatgu/image/upload/v1606455921/800_600_trans_5fc091674b06e_c9dzrb.png" | width=300 />
</p>

## Project description :page_facing_up:

REST API for GeoWork.

## Requirements and installation :memo:

- Node.js installed.
- MongoDB installed.

### Develop mode :construction_worker:

Execute:

```
npm install && npm run dev
```

### Production mode :sunglasses:

Execute:
```
npm install && npm start
```

## Routes :motorway:

For examples and more detailed information check the postman section

| **Route** | **Method** | **Description** | **Required role** |
| ---------------- | --------------- | --------------- | --------------- |
| /api/login | POST | Login to the previously registered user | Not required
| /api/register | POST | Register a user | Not required
| /api/username-validate | POST | Validates in the database that the user does not exist at the time of registration | Not required
| /api/email-validate | POST | Validates in the database that the email does not exist at the time of registration | Not required
| /api/create-job | POST |Create random jobs with price, description and coordinates. the number of jobs to create must be specified| **admin**
| /api/info | GET |Get information on the number of jobs created and the number of registered users| **admin**
| /api/send-notifications | GET |Query in the database if there are users with FCM token sends the list of users to the firebase API and sends them a notification (mobile only)| **admin**
| /api/auth/me | GET |Get user information| **user or admin**
| /api/me | PATCH |Edit user information| **user or admin**
| /api/FCMtoken-renew | PATCH |Renew the FCM token of the user in the database| **user or admin**
| /api | PATCH | Get the state of the api | Not required

## Postman :man_astronaut:

[Postman web](https://documenter.getpostman.com/view/7571970/TVev4Q1L)

## Admin hint :fire:

If you want to be an admin register your username as chucknorris 

## API link :globe_with_meridians:

[Heroku API link](https://geowork-api.herokuapp.com/api)


## Author :copyright:

Alejandro Gonzalez Serna - alejo.1996.2001@gmail.com