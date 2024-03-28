from spyne import Application, rpc, ServiceBase, Unicode, ComplexModel
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from googletrans import Translator

class TranslateService(ServiceBase):
    @rpc(Unicode, _returns=Unicode)
    def translate_text(ctx, text):
        translator = Translator()
        translated_text = translator.translate(text, src='fi', dest='en')
        return translated_text.text

application = Application([TranslateService], 'translate_service',
                          in_protocol=Soap11(validator='lxml'),
                          out_protocol=Soap11())

if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    server = make_server('0.0.0.0', 8000, WsgiApplication(application))
    server.serve_forever()