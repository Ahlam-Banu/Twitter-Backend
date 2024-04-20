# Use the official Python image as base
FROM python:3.9-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask application code into the container
COPY . /app/

# Expose the port the app runs on
EXPOSE 9000

# Run server.py when the container launches
# CMD ["python", "server.py"]
# CMD ["python translator.py & python Client.py"]
CMD ["sh", "-c", "python server.py & python translator.py"]