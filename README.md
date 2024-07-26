````markdown
# Node.js and Express RESTful API

This project is a RESTful API built using Node.js and Express, with a SQLite database for storing user data. It performs basic CRUD operations.

## Features

- Create a user
- Retrieve all users
- Retrieve a user by ID
- Update a user
- Delete a user
- Input validation and error handling

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Web application framework for Node.js
- **SQLite**: Database for storing user data
- **express-validator**: Middleware for input validation

## Prerequisites

- Node.js (https://nodejs.org/)
- npm (Node package manager, included with Node.js)
- SQLite (https://www.sqlite.org/)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/blacktari/ExpressAPI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo-name
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Database Setup

1. Create a SQLite database file:

   ```bash
   touch database.sqlite
   ```

2. Run the initial database setup:

   ```bash
   node scripts/initDb.js
   ```

### Running the Application

1. Start the server:

   ```bash
   npm start
   ```

2. The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Create a User

- **URL**: `/api/users`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "name": "Tari Osadebe", // I add my name here but you can use other names
    "email": "testing@example.com" // Testing
  }
  ```

### Get All Users

- **URL**: `/api/users`
- **Method**: `GET`

### Get User by ID

- **URL**: `/api/users/:id`
- **Method**: `GET`

### Update a User

- **URL**: `/api/users/:id`
- **Method**: `PUT`
- **Body**:

  ```json
  {
    "name": "Lami Joshep",
    "email": "example@example.com"
  }
  ```

### Delete a User

- **URL**: `/api/users/:id`
- **Method**: `DELETE`

## Error Handling

The API includes comprehensive error handling. Errors are returned with appropriate HTTP status codes and descriptive messages.

## Testing the API

You can use Postman to test the API endpoints. Follow these steps:

1. Create a new collection and add the endpoints mentioned above.
2. Use the provided sample JSON payloads for testing the POST and PUT requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [express-validator](https://express-validator.github.io/)
````
