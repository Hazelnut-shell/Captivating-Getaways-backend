This is the node.js & express backend for the Captivating Getaways app.

The REST APIs are served on https://captivating-getaways-backend.onrender.com/ on render.

The backend supports CRUD operations for user and place data, error handling, backend validation with express-validator. It also supports authentication using JWT, authorization, and file uploads via multer. 

P.S. Render doesn't provide free disk storage. Therefore, the images uploaded by users cannot be stored on backend or be retrieved later. That's the reason why the images cannot load on the frontend. However, the file uploads do work when the backend is hosted locally in which case images can be stored on the local machine. 

The backend also uses axios to send http requests to Google Maps API to translate user-provided addresses to latitude and longitude, which can later in turn be used by frontend to show the location on Google Map.

Database:
This app uses MongoDB Atlas Database. It uses Mongoose to model app data, and to facilitate database connection, data validation, and session management.  

