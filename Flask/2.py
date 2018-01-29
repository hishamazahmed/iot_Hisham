from flask import Flask
app = Flask(__name__)
from pymongo import MongoClient
client = MongoClient('localhost:27017')

db = client.EmployeeData
@app.route("/2345")

def hello():
    try:
       
            
        db.Employees.insert_one({"id": "employeeId222","name":"employeeName","age":"employeeAge","country":"employeeCountry"})
        # print '\nInserted data successfully\n'
    
    except Exception:
        print ('jhj')
    return "Hello World!"

if __name__ == "__main__":

    app.run(host="0.0.0.0")

