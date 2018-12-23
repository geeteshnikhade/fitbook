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
            
    # Get Request
    if("params" in event and 'querystring' in event['params']):
        with connection.cursor() as cur:
            cur.execute("SELECT * FROM tblUserData WHERE userName = '" + event['params']['querystring']['userName'] + "'")
            for row in cur:
                output = row

    # Post Request
    else:
        strQuery = ""
        autoIncrementValue = 0
        with connection.cursor() as cur:
            cur.execute("SELECT MAX(userID) as MAX FROM tblUserData;")
            for row in cur:
                autoIncrementValue = row
        
        if autoIncrementValue['MAX'] is None:
            autoIncrementValue = 0
        else:
            autoIncrementValue = int(autoIncrementValue['MAX']) + 1
        
        if(event["requestType"] == "insert"):
            strQuery = GenerateInsertQuery(autoIncrementValue, event['data'])
        else:
            strQuery = GenerateUpdateQuery(event['data'])
            
        with connection.cursor() as cur:
            try:
                cur.execute(strQuery)
            
            except Exception as e:
                connection.rollback()
                
                return {
                    'status': 405,
                    'message': str(e)
                    }
                    
            connection.commit()
            cur.execute("SELECT * FROM tblUserData WHERE userName = '" + event['data']['userName'] + "'")
            for row in cur:
                output = row
        
    return {
        'status': 200,
        'message': 'successful',
        'response': output
    }

def GenerateInsertQuery(autoIncrementValue, data):
    data = FormatInputData(data)
    strQuery = 'INSERT INTO fitbookdb.tblUserData '
    strColumn = 'userID'
    strValues = '' + str(autoIncrementValue)
    
    for key in data.keys():
        strColumn += ', ' + key
        value = data[key]
        try:
            value = int(value)    
        except Exception as e:
            value = str(value)
            
        if type(value) is str:
            strValues = strValues + ',"' + str(value) + '"'
        else:
            strValues = strValues + ',' + str(value)
        
    calorieInPerDay, calorieOutPerDay, calorieBreakfast, calorieLunch, calorieSnacks, calorieDinner = CalculateCalories(data['userAge'], data['userGender'], data['userHeight'], data['userWeight'], data['userWeightGoal'], data['userGoalDurationDays'], data['exerciseType'])
    
    strColumn += ', calorieInPerDay' 
    strValues += ', ' + str(calorieInPerDay) 
    strColumn += ', calorieOutPerDay'
    strValues += ', ' + str(calorieOutPerDay) 
    strColumn += ', calorieBreakfast'
    strValues += ', ' + str(calorieBreakfast) 
    strColumn += ', calorieLunch'
    strValues += ', ' + str(calorieLunch) 
    strColumn += ', calorieSnacks'
    strValues += ', ' + str(calorieSnacks) 
    strColumn += ', calorieDinner'
    strValues += ', ' + str(calorieDinner)
    
    strQuery = strQuery + '(' + strColumn + ') VALUES (' + strValues + ');'
    
    return strQuery
    

def GenerateUpdateQuery(data):
    data = FormatInputData(data)
    strQuery = 'UPDATE fitbookdb.tblUserData SET '
    strWhere = ' WHERE userName = "' + str(data['userName']) + '"'
    strValues = ''
    
    for key in data.keys():
        value = data[key]
        if type(value) is str:
            strValues = strValues + str(key) + ' = ' + '"' + str(value) + '", '
        else:
            strValues = strValues + str(key) + ' = ' + str(value) + ', '
    
    calorieInPerDay, calorieOutPerDay, calorieBreakfast, calorieLunch, calorieSnacks, calorieDinner = CalculateCalories(data['userAge'], data['userGender'], data['userHeight'], data['userWeight'], data['userWeightGoal'], data['userGoalDurationDays'], data['exerciseType'])
    strValues += 'calorieInPerDay = ' + str(calorieInPerDay) + ', '
    strValues += 'calorieOutPerDay = ' + str(calorieOutPerDay) + ', '
    strValues += 'calorieBreakfast = ' + str(calorieBreakfast) + ', '
    strValues += 'calorieLunch = ' + str(calorieLunch) + ', '
    strValues += 'calorieSnacks = ' + str(calorieSnacks) + ', '
    strValues += 'calorieDinner = ' + str(calorieDinner) 
    
    strQuery = strQuery + strValues + strWhere + ";"
    return strQuery
    
def CalculateCalories(age, gender, height, weight, weightGoal, goalDurationDays, exerciseType):
    calorieInPerDay = 0
    calorieOutPerDay = 0
    calorieBreakfast = 0
    calorieLunch = 0
    calorieSnacks = 0
    calorieDinner = 0
    ageFactor = 0
    heightFactor = 0
    weightFactor = 0
    offset = 0
    
    # Factors derived from https://www.calculator.net/calorie-calculator.html
    switcher = {
        "L": 1.375,
        "M": 1.55,
        "H": 1.725
    }
    exerciseFactor = switcher.get(exerciseType, 1.375)
    ageFactor = -5 
    heightFactor = 6.25
    weightFactor = 10

    if(gender == "M"):
        offset = 5
    else:
        offset = -161

    BMR = age * ageFactor + weight * weightFactor + height * heightFactor + offset
    weeks = float(goalDurationDays) / 7
    
    desiredWeeklyChange = (weightGoal - weight) / weeks
    calDailyChange = desiredWeeklyChange * 1000
    
    calorieInPerDay = int(round((BMR * exerciseFactor) + calDailyChange))
    calorieOutPerDay = int(round((BMR * (exerciseFactor - 1)) + calDailyChange))
    
    calorieBreakfast = int(round(calorieInPerDay * 0.25))
    calorieLunch = int(round(calorieInPerDay * 0.30))
    calorieSnacks = int(round(calorieInPerDay * 0.20))
    calorieDinner = int(round(calorieInPerDay * 0.25))
    
    return calorieInPerDay, calorieOutPerDay, calorieBreakfast, calorieLunch, calorieSnacks, calorieDinner

def FormatInputData(data):
    for key in data.keys():
        value = data[key]
        try:
            data[key] = int(value)    
        except Exception as e:
            data[key] = str(value)
    return data
    