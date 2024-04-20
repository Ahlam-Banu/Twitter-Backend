import pika
from zeep import Client

# URL of the WSDL file of the SOAP server
wsdl_url = 'http://localhost:9000/?wsdl'

# Function to handle incoming messages from RabbitMQ
def callback(ch, method, properties, body):
    # Decode message from RabbitMQ
    message = body.decode()

    # Translate the message
    translated_message = translate_message(message)

    # Publish translated message back to RabbitMQ
    publish_message(translated_message)

# Function to translate message using WSDL
def translate_message(message):
    client = Client(wsdl_url)
    # Assuming translate is the method provided by the SOAP service
    translated_message = client.service.translate(message)
    return translated_message

# Function to publish translated message back to RabbitMQ
def publish_message(translated_message):
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
    channel = connection.channel()
    channel.queue_declare(queue='translated_queue')
    channel.basic_publish(exchange='', routing_key='translated_queue', body=translated_message)
    print("Translated message sent to RabbitMQ:", translated_message)
    connection.close()

# Connect to RabbitMQ and start consuming messages
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
channel = connection.channel()
channel.queue_declare(queue='translator_queue')
channel.basic_consume(queue='translator_queue', on_message_callback=callback, auto_ack=True)
print('Translator service is waiting for messages...')
channel.start_consuming()