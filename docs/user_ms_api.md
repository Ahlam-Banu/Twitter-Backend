# API Documentation

The Tweet, User and follow Services APIs provides endpoints for managing the tasks within the Twitter-like application. This documentation outlines the available endpoints, their parameters, expected responses, and authentication requirements.

## API Gateway Base URL

```
http://localhost:8082/
```



  ## Endpoints for User Service

### Create a User

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Description:** Create a new user.
- **Request Body:**
  ```json
  {
    "fullname": <integer>,
    "email": "<string>",
    "password": "<string>"
  }
  ```
  - `fullname` (required): full name of user.
  - `email` (required): email of user.
  - `password` (required): set a password for user.
  
- **Response:**
  - `201 Created`:
    ```json
    {
      "message": "user created successfully",
      
    }
    ```
  - `400 Bad Request`: Invalid request body.

  ### Login 

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** login for user.
- **Request Body:**
  ```json
  {
    "email": "<string>",
    "password": "<string>"
  }
  ```

  - `email` (required): email of user to login.
  - `password` (required): password for user to login.
  
- **Response:**
  - `201 success`:
    ```json
    {
      "message": "JWT Token",
      "expiration time": "time"
      
    }
    ```
  - `400 Bad Request`: Invalid request body.
