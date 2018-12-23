
# coding: utf-8

# In[1]:


import numpy as np
from lightfm import LightFM
import json
import pandas as pd
import pymysql.cursors
import pickle
from lightfm.data import Dataset
import boto3
import os


# In[2]:

def lambda_handler(event, context):
    try:
        ## Fetch data from RDS code
        connection = pymysql.connect(host='fitbookdb.crm91a2epcbi.us-east-1.rds.amazonaws.com',
                                     user='postgres',
                                     passwd='postgres',
                                     db='fitbookdb',
                                     cursorclass = pymysql.cursors.DictCursor
                                     )

        print("Connection successful")
    except:
        print("Connection error")


    # In[3]:


    #Get Food DataFrame
    dict_list = []

    with connection.cursor() as cur:
        cur.execute("select * from food_dataset")
        for row in cur:
            dict_list.append(row)

    food_rds_df = pd.DataFrame(dict_list)
    food_df = food_rds_df.copy()
    food_df.drop(['Portion_Default', 'Portion_Amount','Factor', 'Increment', 'Multiplier', 'Portion_Display_Name', 'Food_Code', 'Display_Name'], axis=1, inplace=True)
    # food_df.head()
    print('Food Dataframe imported')

    # In[4]:


    # # TODO: Perform Binning
    # food_30_bins = ['Alcohol', 'Calories', 'Saturated_Fats']
    # for each_column in food_30_bins:
    #     bins = np.linspace(food_df[each_column].min(), food_df[each_column].max(), 30)
    #     food_df[each_column+'bin'] = pd.cut(food_df[each_column], bins, labels=np.arange(0,len(bins)-1))
    # food_df


    # In[5]:


    # for each_column in food_30_bins:
    #     print(food_df[each_column].min())


    # In[6]:


    #Get User Dataframe
    # user_df = pd.read_csv('user_db_try.csv')
    # user_df.head()

    dict_list = []

    with connection.cursor() as cur:
        cur.execute("select * from tblUserData")
        for row in cur:
            dict_list.append(row)

    user_rds_df = pd.DataFrame(dict_list)
    user_df = user_rds_df.copy()
    user_df.drop(['cognitoAccessToken','cognitoIDToken', 'cognitoRefreshToken', 'fitbitAccessToken', 'fitbitUserID', 'userName'], axis=1, inplace=True)
    # user_df.head()

    print('User Dataframe imported')


    # In[7]:


    #Get userItem DataFrame
    # userItem_df = pd.read_csv('userItem_db_try_new.csv')
    # userItem_df.head()

    dict_list = []

    with connection.cursor() as cur:
        cur.execute("select * from tblUserRating")
        for row in cur:
            dict_list.append(row)

    userItem_rds_df = pd.DataFrame(dict_list)
    userItem_df = userItem_rds_df.copy()
    # userItem_df.head()
    print('UserItem Dataframe imported')

    # In[8]:


    #Make all the feature values unique
    for column_name in food_df.columns:
        if column_name != 'food_ID':
            food_df[column_name] = str(column_name)+ ":" + food_df[column_name].astype(str)
    # food_df.head()


    # In[9]:


    #This Dict will be useful while creating tupples
    food_features_df = food_df.drop(['food_ID'], axis = 1).copy()
    food_features_dict = food_features_df.to_dict('split')
    # food_features_dict


    # In[10]:


    food_feature_values = []

    for column_name in food_features_df.columns:
        food_feature_values.extend(food_features_df[column_name].unique())
    
    # food_feature_values


    # In[11]:


    for column_name in user_df.columns:
        if column_name != 'userID':
            user_df[column_name] = str(column_name)+ ":" + user_df[column_name].astype(str)
    
    user_features_df = user_df.drop(['userID'], axis = 1).copy()

    user_features_dict = user_features_df.to_dict('split')
    # user_features_dict


    # In[12]:


    user_feature_values = []

    for column_name in user_features_df.columns:
        user_feature_values.extend(user_features_df[column_name].unique())

    # user_feature_values


    # In[13]:


    user_tuples=[]
    food_tuples=[]

    for index,row in user_df.iterrows():
        user_tuples.append((row['userID'], user_features_dict['data'][index]))
    
    for index,row in food_df.iterrows():
        food_tuples.append((row['food_ID'], food_features_dict['data'][index]))
    
    # food_tuples


    # In[14]:



    print("Creating LightFm dataset")
    dataset = Dataset()
    dataset.fit(users=(user_id for user_id in user_df['userID']),
                items=(food_id for food_id in food_df['food_ID']))

    print("Dataset Created")
    # In[15]:


    num_users, num_items = dataset.interactions_shape()
    print('Num users: {}, num_items {}.'.format(num_users, num_items))


    # In[16]:


    # dataset.fit_partial(items=(food_id for food_id in food_df['Food_Code']),
    #                            item_features=((each_feature for each_feature in food_features)for food_features in food_features_dict['data']))


    # In[17]:


    # dataset.fit_partial(items=(food_id for food_id in food_df['Food_Code']),
    #                            item_features=((row['Milk'], row['Meats'], row['Alcohol'], row['Calories'])for index,row in food_df.iterrows()))


    # In[18]:

    print("fittng item partial features")
    dataset.fit_partial(items=(food_id for food_id in food_df['food_ID']),
                               item_features=( each_value for each_value in food_feature_values))


    # In[19]:


    # dataset.fit_partial(users=(user_id for user_id in user_df['Id']),
    #                     user_features=((each_feature for each_feature in user_features)for user_features in user_features_dict['data']))


    # In[20]:
    print("fittng user partial features")

    dataset.fit_partial(users=(user_id for user_id in user_df['userID']),
                        user_features=(each_value for each_value in user_feature_values))


    # In[21]:


    # dataset.item_features_shape()
    # dataset.user_features_shape()


    # In[22]:

    print("Building Interactions")
    (interactions, weights) = dataset.build_interactions(((x['userID'], x['food_ID'], x['rating'])
                                                          for y,x in userItem_df.iterrows()))

    # print(repr(interactions))
    # print(weights)


    # In[23]:


    # interactions.shape


    # In[24]:

    print("Building item features")
    item_features = dataset.build_item_features(each_tuple for each_tuple in food_tuples)
    # print(item_features)


    # In[25]:


    user_features = dataset.build_user_features(each_tuple for each_tuple in user_tuples)
    # print(user_features)


    # In[26]:

    print("Fitting Model")
    model = LightFM(loss='warp')
    model.fit(interactions, item_features=item_features, user_features=user_features)

    print("Model trained!!")

    print("Pickle started!!")
    pickle.dump(model, open("/tmp/model.pkl", 'wb'), protocol=2)

    bucketName = "fitbook-lambda-packages"
    Key = "/tmp/model.pkl"
    outPutname = "model.pkl"

    print("Uploading to S3")
    s3 = boto3.client('s3')
    s3.upload_file(Key, bucketName, outPutname)
    print("Upload done")
    os.remove("/tmp/model.pkl")

    print("Pickle file deleted")
    print("Successssss!!!!!")
