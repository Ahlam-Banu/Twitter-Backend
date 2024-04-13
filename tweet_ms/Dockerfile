# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

RUN mkdir tweet_ms
# Copy the current directory contents into the container at /app
COPY . ./tweet_ms

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r ./tweet_ms/requirements.txt

# Set environment variables
ENV FLASK_APP="tweet_ms"
#RUN $env:FLASK_APP = "tweet_ms"
# Expose the port the app runs on
EXPOSE 5000

# Run flask when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]
