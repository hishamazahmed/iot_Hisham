from pymongo import MongoClient
client = MongoClient('localhost:27017')

db = client.APONDATABASE

def insert():
    try:
       
            
        db.attendance.insert_one({"id": "333","name":"real","age":"445","country":"uttara"})
        # print '\nInserted data successfully\n'
    
    except Exception:
        print ('jhj')

insert()
