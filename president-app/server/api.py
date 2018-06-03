from __future__ import division
from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from bson import ObjectId
import hashlib
import sys
import datetime

app = Flask(__name__)
CORS(app, resources={r"/auth/*": {"origins": "*"}}, expose_headers='Authorization')

app.config['MONGO_DBNAME'] = 'president'
app.config['MONGO_URI'] = 'mongodb+srv://root:root@new-qz5hq.mongodb.net/president'

mongo = PyMongo(app)

@app.route('/insert', methods = ['POST'])
def insert():
    names = mongo.db.data
    name = request.json['name']
    birthday = request.json['birthday']
    birth_place = request.json['birth_place']
    death_day = request.json['death_day']
    death_place = request.json['death_place']
    n = names.insert({'name': name,'birthday': birthday,'birth_place': birth_place,'death_day': death_day,'death_place': death_place})
    return jsonify({'result' : {'status':'success'}})


@app.route('/fetch_presidents', methods = ['GET'])
@cross_origin()
def fetch_presidents():
    m =[]
    names = mongo.db.data
    president_list = names.find()
    for president in president_list:
        name = president["name"]
        birthday = president["birthday"]
        birth_place = president["birth_place"]
        death_day = president["death_day"]
        death_place = president["death_place"]
        data = {'name': name,'birthday': birthday,'birth_place': birth_place,'death_day': death_day,'death_place': death_place}
        m.append(data)

    return jsonify({'result' : {'status': 'success','data':m}})


@app.route('/ascending_order', methods = ['GET'])
@cross_origin()
def ascending_order():
    m =[]
    names = mongo.db.data
    president_list = names.find()
    for president in president_list:
        name = president["name"]
        birthday = president["birthday"]
        birth_place = president["birth_place"]
        death_day = president["death_day"]
        death_place = president["death_place"]
        data = {'name': name,'birthday': birthday,'birth_place': birth_place,'death_day': death_day,'death_place': death_place}
        m.append(data)

    def foo2(x):
        return x['name']

    return jsonify({'result' : {'status': 'success','data':sorted(m,key=foo2)}})



@app.route('/descending_order', methods = ['GET'])
@cross_origin()
def descending_order():
    m =[]
    names = mongo.db.data
    president_list = names.find()
    for president in president_list:
        name = president["name"]
        birthday = president["birthday"]
        birth_place = president["birth_place"]
        death_day = president["death_day"]
        death_place = president["death_place"]
        data = {'name': name,'birthday': birthday,'birth_place': birth_place,'death_day': death_day,'death_place': death_place}
        m.append(data)

    def foo2(x):
        return x['name']

    return jsonify({'result' : {'status': 'success','data':sorted(m,key=foo2,reverse=True)}})


if __name__ == '__main__':
    app.run(debug=True)
