# Workplace Organization Application

This is a microservices-based application for workplace organization, similar to Slack. It includes microservices for user authentication and authorization, meeting scheduling, notifications, meeting notes, and file storage. The application is built using TypeScript, Node.js, Express, and RabbitMQ for inter-service communication.

## Requirements

- Node.js v14 or later
- MongoDB v4.2 or later
- RabbitMQ v3.8 or later

## Installation

## Services

The application is divided into the following microservices:

- **User authentication and authorization**: Handles user account creation, authentication, and authorization using JWT tokens. Uses MongoDB for data storage.

- **Meeting scheduling**: Allows users to schedule and manage meetings, send invites, and view upcoming meetings. Uses MongoDB for data storage.

- **Notifications**: Sends notifications to users for upcoming meetings, reminders, and other events. Uses RabbitMQ for communication with other services.

- **Meeting notes**: Allows users to take and store notes for each meeting. Uses MongoDB for data storage.

## API Documentation

<!-- TO BE ADDED -->

## Testing

<!-- TO BE ADDED -->

## Deployment

<!-- TO BE ADDED -->

## Contributing

<!-- TO BE ADDED -->
