# Signature Collection System

This project implements a distributed signature collection system with a frontend, backend, and address provider service.

## System Architecture

The system consists of three main components:

1. **Frontend**: A web interface for users to submit their signatures.
2. **Backend**: A server that processes signature submissions and interacts with the address provider.
3. **Address Provider**: A service that manages communication between the frontend and backend.

## Components

### Address Provider

- Manages the registration of the backend server.
- Provides the backend's address to the frontend upon request with a passcode.
- Runs on port 4000.

### Backend Server

- Handles signature submissions.
- Registers itself with the address provider on startup.
- Runs on port 3000.

### Frontend

- Provides a user interface for signature submission.
- Retrieves the backend address from the address provider.
- Submits signatures to the backend.

## Setup and Running

### Address Provider

1. Navigate to the `address-provider` directory.
2. Install dependencies: `npm install`
3. Start the server: `node server.js`

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`
3. Start the server: `node server.js`

### Frontend

1. Navigate to the `frontend` directory.
2. Open `index.html` in a web browser.

## Configuration

- Update the `ADDRESS_PROVIDER` constant in `frontend/script.js` with the correct IP address of your address provider.
- The passcode for retrieving the backend address is set to '9062002' in both the address provider and frontend.

## Features

- Dynamic IP address management for backend server.
- Passcode-protected backend address retrieval.
- Simple signature collection form with name, ID number, and signature fields.
- Basic ID verification (currently simulated).

## Security Considerations

- The current system uses a hardcoded passcode. In a production environment, implement more robust authentication.
- Consider implementing HTTPS for all communications.
- Implement proper input validation and sanitization on both frontend and backend.

## Future Improvements

- Implement a database for storing signatures.
- Add user authentication and authorization.
- Implement real ID verification with IPRS.
- Enhance error handling and logging.
- Add automated tests.
- Containerize the application for easier deployment.

## Contributing

Contributions to improve the system are welcome. Please follow standard Git workflow:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to your fork.
5. Submit a pull request.
