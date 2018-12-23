import json
import pymysql

def lambda_handler(event, context):
    output = {}
    connection = {}
    
    try:
        connection = pymysql.connect(
            host='fitbookdb.crm91a2epcbi.us-east-1.rds.amazonaws.com',
            user='postgres',
            passwd='postgres',
            db='fitbookdb',
            cursorclass = pymysql.cursors.DictCursor
        )
    
    except Exception as e:
        print("Connection error")
        print(e)
        return {
            'status': 405,
            'message': 'Couldn\'t establish connection'
            }
    
    for data in event['data']:
        cur = connection.cursor()
        try:
            cur.execute("DELETE FROM tblUserRating WHERE userID = " + str(data['userID']) + " AND food_ID = " + str(data['food_ID']))
            cur.execute("INSERT INTO tblUserRating (UserRating_ID, userID, food_ID, rating) VALUES (NULL, " + str(data['userID']) + ", " + str(data['food_ID']) + ", " + str(data['rating']) + ");")
            connection.commit()
        except Exception as e:
            connection.rollback()
            return{
            'status': 405,
            'message': str(e)
            }
            
    return{
        'status': 200,
        'message': 'successful'
    }