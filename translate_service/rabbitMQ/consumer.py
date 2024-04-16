import pika

# Establish connection to RabbitMQ server
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare the queue to consume from
channel.queue_declare(queue='translation_queue')

# Define a callback function to handle incoming messages
def callback(ch, method, properties, body):
    print(" [x] Received message:", body)
    # Implement translation logic here
    
# Consume messages from the queue
channel.basic_consume(queue='translation_queue', on_message_callback=callback, auto_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
