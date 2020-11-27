# GeoWork App

<p align="center">
  <img  src="https://res.cloudinary.com/dlqmpatgu/image/upload/v1606454722/800_600_trans_5fc08c4928e1b_oz9c82.png" | width=700 />
</p>

## Project description :page_facing_up:

SPA website and android application with JWT authentication system, route protection, profile editing, job creation with firebase notification system.

## Requirements and installation :memo:

- Node.js installed.
- quasar cli installed.
- android studio (optional)

### Develop mode :construction_worker:

Execute for SPA:

```
npm install && quasar dev
```

Execute for android application:

```
npm install && quasar dev -m cordova -T android
```

## Routes :motorway:

For examples and more detailed information check the postman section

| **Route** | **Description** | **Required role** |
| ---------------- | --------------- | --------------- |
| / | Main page for login, in android if the user is registered and does not have an FCMtoken it is added | Not required
| /register | Page to register a user, has a username and email validator in real time that does not allow registering a user or email already registered| Not required
| /jobs | Shows previously created jobs that contain: name, description, price, user location, job path, job location | **user or admin**
| /profile | Allows to edit the user's account | **user or admin**
| /admin | Shows a small information panel with the jobs and users created and also includes the option to create random jobs and when creating them they notify users who have the application installed on android | **admin**

## Admin hint :fire:

If you want to be an admin register your username as chucknorris 

## APK download :iphone:

[GeoWork APK](https://github.com/alejogonza/geowork/blob/main/geowork/GeoWork.apk)

## Page link :computer:

[Heroku page link](https://geowork.herokuapp.com/)

## Author :copyright:

Alejandro Gonzalez Serna - alejo.1996.2001@gmail.com