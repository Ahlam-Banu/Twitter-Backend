
# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk

LABEL authors="jeem"
# Set the working directory in the container
WORKDIR /Users/jeem/Desktop/My Home /Web Services/Twitter-Backend/UserAuth
# Copy the JAR file of your Spring Boot application to the container
COPY target/UserAuth-0.0.1-SNAPSHOT.jar ./


# Expose the port on which your application will run
EXPOSE 8082
# Command to run your Spring Boot application
CMD ["java", "-jar", "UserAuth-0.0.1-SNAPSHOT.jar"]