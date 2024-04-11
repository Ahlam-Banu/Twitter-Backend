# Use the official Python image as the base image
FROM python:3.8

# Set the working directory in the container
WORKDIR /app

# Copy the local codebase into the container at /app
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set Flask app environment variable
ENV FLASK_APP="tweet_ms"

# Run the application
CMD ["flask", "run"]
# CMD ["flask", "run", "--host=0.0.0.0"]

# # Expose the port on which the Flask app will run
# EXPOSE 5000

# # Command to run the Flask application
# CMD ["python", "-m", "tweet_routes"]
