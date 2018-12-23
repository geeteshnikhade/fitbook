import numpy as np
from lightfm import LightFM
import json
import pickle
import boto3
import pymysql
import os

def lambda_handler(event, context):
    # print ( event)
    # Input JSON format
    # event = {
    #     "userID": 2,
    #     "userName": "anuj",
    #     "userAge": 25,
    #     "userGender": "M",
    #     "cognitoAccessToken": "123abc",
    #     "cognitoRefreshToken": "123abc",
    #     "cognitoIDToken": "123abc",
    #     "fitbitAccessToken": "123abc",
    #     "fitbitRefreshToken": "123abc",
    #     "fitbitUserID": "123abc",
    #     "isVegetarian": 1,
    #     "isDiabetic": 0,
    #     "isLactoseIntolerant": 1,
    #     "preferAlcohol": 0,
    #     "userWeight": 80,
    #     "userWeightGoal": 75,
    #     "userHeight": 180,
    #     "userGoalDurationDays": 90,
    #     "calorieInPerDay": 1000,
    #     "calorieOutPerDay": 200,
    #     "calorieBreakfast": 861,
    #     "calorieLunch": 1073,
    #     "calorieSnacks": 287,
    #     "calorieDinner": 574,
    #     "recommendationType": "lunch",
    #     "mealType": "snacks"
    # }

    userId = event['userID']
    boolMeat = 0 if event['isVegetarian'] is 1 else 1
    boolSugar = 0 if event['isDiabetic'] is 1 else 1
    boolMilk = 0 if event['isLactoseIntolerant'] is 1 else 1
    boolAlcohol = 0 if event['preferAlcohol'] is 0 else 1

    switcher = {
        "breakfast": event['calorieBreakfast'],
        "lunch": event['calorieLunch'],
        "snacks": event['calorieSnacks'],
        "dinner": event['calorieDinner']
    }

    caloriesRequired = switcher.get(event['mealType'])
    strQuery = "SELECT food_ID, Display_Name, Calories"
    strQuery += " FROM food_dataset"
    strQuery += " WHERE Calories BETWEEN " + str(caloriesRequired - 50) + " AND " + str(caloriesRequired + 50)
    if event['isVegetarian'] is 1:
        strQuery += " AND IF(Meats = 0, 0, 1) = " + str(boolMeat)
    if event['isLactoseIntolerant'] is 1:
        strQuery += " AND IF(Milk = 0, 0, 1) =  " + str(boolMilk)
    if event['preferAlcohol'] is 0:
        strQuery += " AND IF(Alcohol = 0, 0, 1) = " + str(boolAlcohol)
    if event['isDiabetic'] is 1:
        strQuery += " AND IF(Added_Sugars = 0, 0, 1) = " + str(boolSugar)

    print(strQuery)

    try:
        connection = pymysql.connect(host='fitbookdb.crm91a2epcbi.us-east-1.rds.amazonaws.com',
                                     user='postgres',
                                     passwd='postgres',
                                     db='fitbookdb',
                                     cursorclass=pymysql.cursors.DictCursor)

        print("Connection successful")
    except:
        print("Connection error")

    master_food_dict = {}

    with connection.cursor() as cur:
        cur.execute(strQuery)
        for row in cur:
            master_food_dict[row.get('food_ID')] = row

    connection.close()

    print("Fetching from RDS done")
    items = list(master_food_dict.keys())

    if len(items) == 0:
        return {
            "statusCode": 400,
            "body": []
        }

    # print ( items)
    # user_id = 1
    # items = random.sample(range(1, 2013), 30)
    # print ( items)

    print("Calling recommendations method")
    scores = getRecommendationScores(userId, items)
    print(scores)
    top_items = np.argsort(-scores)
    print(top_items)

    sorted_recommendation = [x for _,x in sorted(zip(top_items,items))]
    print(sorted_recommendation)

    final_recommendation = []
    for food_id in sorted_recommendation:
        food_item = master_food_dict[food_id]
        if len(final_recommendation) < 5:
            if food_item not in final_recommendation:
                final_recommendation.append(food_item)
        else:
            break
    # print ( final_recommendation)

    #
    os.remove('/tmp/model.pkl')
    print("pickle deleted")

    return {
        "statusCode": 200,
        "body": final_recommendation
    }

def getRecommendationScores(userId, items):
    BUCKET_NAME = 'fitbook-lambda-packages'  # replace with your bucket name
    KEY = 'model.pkl'  # replace with your object key
    scores = 0
    s3 = boto3.resource('s3')
    s3.Bucket(BUCKET_NAME).download_file(KEY, '/tmp/model.pkl')
    print("Pickle File Downloaded")

    model = pickle.load(open("/tmp/model.pkl", 'rb'))
    # model = pickle.load(open("model.pkl", 'rb'))
    print("Unpickle done")

    print("Calculating scores")
    try:
        print('In try Block ')
        scores = model.predict(userId, items)
    except Exception as e:
        print("Print Exception Error:--", e)

    print("Method returned")
    return scores

# print(lambda_handler(0, 0))


