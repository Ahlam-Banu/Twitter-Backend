from spyne import Application, rpc, ServiceBase, Unicode
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server
from googletrans import Translator

class TranslationService(ServiceBase):
    @rpc(Unicode, _returns=Unicode)
    def translate(ctx, text):
        try:
            translator = Translator()
            translated_text = translator.translate(text, src='fi', dest='en').text
            return translated_text
        except Exception as e:
            return f"Error: {str(e)}"

if __name__ == '__main__':
    # Create the SOAP application
    soap_app = Application([TranslationService],
                           'translation_service.soap',
                           in_protocol=Soap11(validator='lxml'),
                           out_protocol=Soap11())

    # Create WSGI application
    wsgi_application = WsgiApplication(soap_app)

    # Start the server
    server = make_server('0.0.0.0', 9000, wsgi_application)
    print("Translation Service SOAP service serving at http://127.0.0.1:9000")
    server.serve_forever()