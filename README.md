# Microservice-based Tweeting Platform

Microservices crafted to construct a Twitter-like platform. Each microservice is responsible for distinct functionalities, and communication is facilitated using RabbitMQ, functioning as the event bus.

## Microservices Overview

1. **User Service:**
   - Using Java Spring boot
   - Handles user registration, authentication, and profile management.

3. **Tweet Service:**
   - Using Python (Flask)
   - Manages the creation, retrieval, and deletion of tweets.

5. **Timeline Service: -**
   - Python (Flask)
   - Aggregates and serves personalized timelines for users.

7. **Follow Service: -**
   - Using GO Lang
   - Manages relationships between users, including following and followers.

9. **Gateway Service: -**
   - Acts as an API gateway, routing requests to appropriate microservices and handling authentication.

10. **Fanout Service: -**
   - Manages subscriptions and broadcasts events to subscribers.

## Architecture
![new architecture](https://github.com/Ahlam-Banu/Twitter-Backend/assets/102663986/0fc0b6b5-4f53-4272-a928-de08147b077c)

## Technologies Used

- **Programming Languages:** Java, Python, Go
- **Databases:** MariaDB
- **Event Bus:** RabbitMQ

# Running in Kubernetes

## Docker Desktop
![kubernetes](https://github.com/Ahlam-Banu/Twitter-Backend/assets/102663986/dcb8d800-afb2-49d8-b136-403076ee0e10)

## Terminal
![kubernetes terminal](https://github.com/Ahlam-Banu/Twitter-Backend/assets/102663986/f2b399cc-a396-4011-9ae5-4f69b443fcc3)

## Output
![twitter_ui](https://github.com/Ahlam-Banu/Twitter-Backend/assets/102663986/62439e49-0efc-466d-aba3-7f52dc2a7dab)

## API Endpoints

- [Link to User Service API Documentation]
- [Link to Tweet Service API Documentation](/docs/tweet_ms_api.md)
- [Link to Timeline Service API Documentation]
- [Link to Follow Service API Documentation]
- [Link to Gateway Service API Documentation]
- [Link to Fanout Service API Documentation]
- [Link to Comment Service API Documentation](/docs/comment_api.md)

## Usage

- docker-compose up -d
- kubectl apply -f kube_man.yaml
- kubectl apply -f service.yaml   

Navigate to UI and npm start
   - username: Ahlam@email.com
   - password: Pass1

## License

this software is set to be open-source
