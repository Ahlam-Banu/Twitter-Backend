from flask import Flask, request, jsonify
from zeep import Client
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def translate_text(text_to_translate):
    # URL of the WSDL file of the SOAP server
    wsdl_url = 'http://localhost:9000/?wsdl'


    # Create a Zeep client
    client = Client(wsdl_url)
    
    # Call the translate method of the SOAP service
    translated_text = client.service.translate(text_to_translate)
    print("here: " + translated_text)
    return translated_text

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text_to_translate = data.get('text')
    
    if not text_to_translate:
        return jsonify({'error': 'Text to translate is required'}), 400
    print("THIS IS A TEST" + text_to_translate)
    translated_text = translate_text(text_to_translate)
    
    return jsonify({'translatedText': translated_text})

if __name__ == '__main__':
    app.run(debug=True, port=8000)