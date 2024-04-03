#import logging
from zeep import Client

# Set up logging
#logging.basicConfig(level=logging.DEBUG)

wsdl_url = 'http://localhost:8000/?wsdl'
client = Client(wsdl_url)

def translate(text_to_translate):
    #text_to_translate = "puhun suomea ja englantia samanaikaisesti  ja ymmärrän molempia kieliä."
    result = client.service.translate_text(text_to_translate)
    #print("Translated Text:", result)
    return result