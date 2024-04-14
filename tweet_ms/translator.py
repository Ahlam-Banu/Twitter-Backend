import logging
from zeep import Client
# from requests.exceptions import ConnectionError

# Set up logging
logging.basicConfig(level=logging.DEBUG)

wsdl_url = 'http://translate:9000/?wsdl'

def translate(text_to_translate, source_lang):
    try:
        client = Client(wsdl_url)
        result = client.service.translate_text(text_to_translate, source_lang)  # Send source language along with the text
        return result
    except ConnectionError as e:
        return "Error: Failed to establish a connection to the server. Make sure the /translate_service/server.py is running."