from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS

import requests
import base64

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)

class MainRoute(Resource):
    def post(self):
        
        s = request.json['email'] + ":" + request.json['password'] 
        headers = {'Authorization': "Basic " + str(base64.b64encode(bytes(s, encoding="raw_unicode_escape")))[2:-1]}
        resp = requests.get("https://" + request.json['subdomain'] + ".zendesk.com/api/v2/tickets.json?per_page=25", headers=headers).json()
        return jsonify(resp)

class PageSpecificData(Resource):
    def post(self):
        s = request.json['email'] + ":" + request.json['password'] 
        headers = {'Authorization': "Basic " + str(base64.b64encode(bytes(s, encoding="raw_unicode_escape")))[2:-1]}
        resp = requests.get("https://" + request.json['subdomain'] + ".zendesk.com/api/v2/tickets.json?" + "page=" + str(request.json['page']) + "&per_page=25", headers=headers).json()
        return jsonify(resp)

api.add_resource(MainRoute, "/")
api.add_resource(PageSpecificData, "/page")
if __name__ == "__main__":
    app.run(port=7999, debug=True)