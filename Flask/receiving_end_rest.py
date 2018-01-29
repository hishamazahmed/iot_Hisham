from flask import Flask
from flask import request
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/sensor',methods = ['POST', 'GET'])
def sensor():
   if request.method == 'POST':
      print (request.is_json)
      content = request.json
      print (content)
      
      return "done"
   else:
    #   user = request.args.get('nm')
      return "error"
if __name__ == '__main__':
    app.run(host= '0.0.0.0')

# // $env:FLASK_APP="receiving_end_rest.py"
#    //flask run --host=0.0.0.0