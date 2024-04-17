# Microservice-based Tweeting Platform

This project consists of several microservices designed to create a Twitter-like application. Each microservice handles specific functionalities, and communication between them is facilitated using RabbitMQ as the event bus.
![diagram](https://github.com/Ahlam-Banu/Twitter-Backend/assets/102663986/4a30f1b9-aa84-4f72-bb9e-39576c9c2c7f)

## Microservices Overview

1. **User Service: Java Spring boot**
   - Handles user registration, authentication, and profile management.

2. **Tweet Service: Python (Flask)**
   - Manages the creation, retrieval, and deletion of tweets.

3. **Timeline Service: -**
   - Aggregates and serves personalized timelines for users.

4. **Follow Service: -**
   - Manages relationships between users, including following and followers.

5. **Gateway Service: -**
   - Acts as an API gateway, routing requests to appropriate microservices and handling authentication.

6. **Fanout Service: -**
   - Manages subscriptions and broadcasts events to subscribers.

## Technologies Used

- **Programming Languages:** [Java, Python, Node.js, Go]
- **Databases:** [MariaDB]
- **Event Bus:** RabbitMQ

## Installation

TO BE ADDED

## Inter-Microservice Communication

- **Event Bus:** RabbitMQ
- Each microservice interacts with others via RabbitMQ, by publishing and subscribing to relevant events.

## API Endpoints

- [Link to User Service API Documentation]
- [Link to Tweet Service API Documentation](/docs/tweet_ms_api.md)
- [Link to Timeline Service API Documentation]
- [Link to Follow Service API Documentation]
- [Link to Gateway Service API Documentation]
- [Link to Fanout Service API Documentation](Comment_ms/api.md)

## Testing

TO BE ADDED

## License

this software is set to be open-source
