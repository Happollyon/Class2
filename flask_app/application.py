from flask import Flask, render_template,request, session
#from flask_session import Session

app=Flask(__name__)

@app.route('/')
def index():
    return "Hello world"

@app.route('/fagner')
def fagner():
    return"hello fagner"

@app.route("/<string:name>") # you can set a rout name
def hello(name):
    return f"hello, {name}"

#templates look at netes and conditions inside ginger
#extend templates
