#import logging
from zeep import Client

# Set up logging
#logging.basicConfig(level=logging.DEBUG)

wsdl_url = 'http://localhost:8000/?wsdl'
client = Client(wsdl_url)

def translate(text_to_translate, source_lang):
    result = client.service.translate_text(text_to_translate, source_lang)  # Send source language along with the text
    return result