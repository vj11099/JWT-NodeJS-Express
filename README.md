# JWT Authentication Mini Project Documentation

## Introduction

This project implements a simple JWT (JSON Web Token) authentication system using MongoDB, Express, and Node.js (MEN) stack. It provides endpoints for user signup, login, logout, and retrieving a list of items (accessible only when authenticated).

## Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/vj11099/JWT-NodeJS-Express.git>
   ```

2. Navigate to the project directory:

   ```bash
   cd jwt-nodejs-express
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables as per `.env.example` file.

5. Run the application:

   ```bash
   npm start
   ```

## Usage

### Signup

Endpoint:

```bash
POST /signup
```

Description:
Allows users to create a new account by providing their email and password.

Request Body:

```json
{
  "email": "example_user@domain",
  "password": "example_password"
}
```

Response:
- `201 Created`: User account created successfully.
- `400 Bad Request`: Invalid request format or missing required fields.
- `400 Conflict`: Username already exists.

### Login

Endpoint:

```bash
POST /login
```

Description:
Allows users to log in using their email and password. Returns a JWT token upon successful authentication.

Request Body:

```json
{
  "email": "example_user@domain",
  "password": "example_password"
}
```

Response:
- `200 OK`: Successful login. Returns a JWT token.
- `401 Unauthorized`: Invalid credentials.

### Logout

Endpoint:

```bash
GET /logout
```

Description:
Logs out the currently authenticated user by invalidating their JWT token.

Response:
- `200 OK`: Successful logout.

### Get List

Endpoint:

```bash
GET /getdata
```

Description:
Retrieves the list of users. Requires authentication.

Response:
- `200 OK`: List of items returned.
- `401 Unauthorized`: Authentication required.

## Configuration

- `SECRET_KEY`: Secret key used for encoding and decoding JWT tokens.
- Other configuration options can be found in the `.env.example` file.

## Security Considerations

- JWT tokens are encrypted to prevent tampering.
- Token expiration is implemented to enhance security.
- Protection against CSRF attacks is recommended.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits

- Express: Node.js web framework.
- MongoDB: NoSQL database.
- Contributors: Vishvam Joshi

## Contact Information

For support or inquiries, please contact vishvamjoshi11099@gmail.com.
