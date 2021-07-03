### TODO: A utility class which will be created by the user , with Class name as " _[your roll number]" ,
# TODO: all transformations should be written inside a function which will be called inside the predict method

import pandas as pd
import numpy as np
from sklearn import preprocessing

class _1802315():

    ## TODO: Please note that document id should be present till the getPredictions method
    def __tranformation1(self,data):

        data['clear_date']=pd.to_datetime(data['clear_date'])
        data['document_create_date']=pd.to_datetime(data['document_create_date'],format ='%Y-%m-%d')
        data['baseline_create_date']=pd.to_datetime(data['baseline_create_date'],format ='%Y-%m-%d')
        data['due_in_date']=pd.to_datetime(data['due_in_date'],format ='%Y-%m-%d')
        data['posting_date']=pd.to_datetime(data['posting_date'])

        l=preprocessing.LabelEncoder()
        data['cust_number']=l.fit_transform(data['cust_number'])
        data['cust_payment_terms']=l.fit_transform(data['cust_payment_terms'])

        data['delay'] = data['clear_date'] - data['due_in_date']
        data['delay'] = data['delay'].dt.days

        data['_month_due_in_date']=np.where(data['due_in_date'].dt.month==12,0,1)
        data['_weekday_due_in_date']=np.where(data['due_in_date'].dt.weekday/2==2,1,0)
        data['_month_baseline_date']=np.where(data['baseline_create_date'].dt.month==12,0,1)
        data['_weekday_baseline_date']=np.where(data['baseline_create_date'].dt.weekday==4,1,0)

        mapper=data.groupby('cust_number')['delay'].mean().to_dict()
        data['mean_delay_customer']=data['cust_number'].map(mapper)

        mapper1=data.groupby('cust_payment_terms')['delay'].mean().to_dict()
        data['mean_delay_terms']=data['cust_payment_terms'].map(mapper1)

        return data

    def __transformation2(self,data):

        data['delay']=data['delay'].round(decimals=0).astype(int)

        bins=[-30,-1,15,30,45,60,75]
        group_names=['Early Payment','0-15 days','16-30 days','31-45 days','46-60 days','Greater than 60 days']
        data['predicted_aging_bucket'] = pd.cut(data['delay'],bins,labels=group_names)

        data['delay']=pd.to_timedelta(data['delay'], unit='D')
        data['predicted_payment_date']=data['due_in_date']+data['delay']
        # data['predicted_payment_date'].dt.strftime('%Y-%m-%d')

        return data

    def getPredictions(self,data,model):
        data = self.__tranformation1(data)
        # data = self.__transformation2(data)
        # your feature list, column names
        features = [
            'total_open_amount',
            'cust_payment_terms',
            '_month_due_in_date',
            '_weekday_baseline_date',
            'mean_delay_customer'
        ]
        print(data[features])
        # data should be a dataFrame and not a numpy array
        predictions = model.predict(data[features])
        data['delay'] = predictions
        data = self.__transformation2(data)
        data['predicted_payment_date'].dt.strftime('%Y-%m-%d')

        pred = data.loc[:,['doc_id','predicted_payment_date','predicted_aging_bucket']].to_dict(orient="records")
    
        def dateToString(row):
            row['predicted_payment_date'] = row['predicted_payment_date'].strftime('%Y-%m-%d')
            return row
    
        pred = list(map(dateToString, pred))

        print(pred)
        
        return pred
