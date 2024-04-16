import pika

# Establish connection to RabbitMQ server
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare a queue for communication
channel.queue_declare(queue='translation_queue')

# Send a message to RabbitMQ
message = "Hello, RabbitMQ!"
channel.basic_publish(exchange='', routing_key='translation_queue', body=message)

print(" [x] Sent message:", message)

# Close the connection
connection.close()