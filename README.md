# Workplace Organization Application

### Transferability documentation

This is a microservices-based application for workplace organization, similar to Slack. It includes microservices for user authentication and authorization, meeting scheduling, notifications, meeting notes, and file storage. The application is built using TypeScript, Node.js, Express, and RabbitMQ for inter-service communication.

## Requirements

- Node.js v14 or later
- MongoDB v4.2 or later
- RabbitMQ v3.8 or later

## Installation

1. Clone the repository: `git clone https://git.fhict.nl/I401477/workplace-organization-application.git`
2. Open each microservices' folders inside [./WOA/\*\*](./WOA/**)
3. Install dependencies: `npm install`
4. Start the services: `npm run start`

## Services

The application is divided into the following microservices:

- **User authentication and authorization**: Handles user account creation, authentication, and authorization using JWT tokens. Uses MongoDB for data storage.
  Located here: [./WOA/auth-microservice](./WOA/auth-microservice)

- **[Not Built Yet] Meeting scheduling**: Allows users to schedule and manage meetings, send invites, and view upcoming meetings. Uses MongoDB for data storage.

- **Notifications**: Sends notifications to users for upcoming meetings, reminders, and other events. Uses RabbitMQ for communication with other services.
  Located here: [./WOA/notifications-microservice](./WOA/notifications-microservice)
- **Meeting notes**: Allows users to take and store notes for each meeting. Uses MongoDB for data storage.
  Located here: [./WOA/postfeed-microservice](./WOA/postfeed-microservice)

## Documentation

All Documentation can be found [here](./Documentation/)

### Architecture

The design choices and an explanation of the architecture of the aplpication
[Architecture](./Documentation/architecture/)

### CI/CD workflow and research document

A document with research about testing and security in a CI/CD pipeline - contains an explanation about how this applciation's pipline works.
[CI/CD workflow](./Documentation/ci-cd-research-report/)

### Diagrams

A collection of diagrams that have been used to explain some things inside other documentation
[Diagrams](./Documentation/Diagrams/)

### Ethics

A document with ethical research and evaluation of the software
[Ethics](./Documentation/ethics/)

### Ethics

A document containing peer reviews and retrospectives about the development process.
[Feedack](./Documentation/feedback)

### Infrastructure

A document that contains the Deployment setup and the cloud environment
[Infrastructure](./Documentation/infrastructure)

### Presentations

A collection of presentations that have been shown throughtout the deployment process to convey some information about the progress.
[Presentations](./Documentation/presentations/)

### Requirements

Functional, Technical and Non-functional requirements
[Requirements](./Documentation/requirements/)

### Reslease notes

Release notes for each sprint
[Release notes](./Documentation/release-notes/)

## Screenshots

A collection of screenshots of the development process
[Screenshots](./Documentation/Screenshots/)

## Testing

The application is tested by unit tests using Jest inside each microservice at [./WOA/**/src/Tests/*.ts]

## Deployment

The deployment process is automated by GitHub workflow files in the .github/workflow folder as well as by the kubernetes manifests inside the [infrastructure/k8s.js](./WOA/infrastructure/k8s/) folder

## Proof Of Concept

Proof of concept applications that were helpful during the research process of this project - [POC](./POCs/)

## Contributing

[Tsanko Nedelchev](https://github.com/canko97)
