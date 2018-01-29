from flask import Flask
app = Flask(__name__)
 
 
@app.route("/123")

def hello1():
     
    return "Hello World!"

@app.route("/value")

def hello2():
     
    return "Hell!"

if __name__ == "__main__":

    app.run(host="0.0.0.0")

