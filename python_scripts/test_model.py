import pickle
import json
import pandas as pd
import config.config as config
from sklearn.metrics import classification_report

f = open(config.MODEL, 'rb')
model = pickle.load(f)
f.close()

X_test = pd.read_csv(config.X_TEST_DATA)
y_test = pd.read_csv(config.Y_TEST_DATA)

# Remove added column from csv conversion for record index.
X_test.drop(['Unnamed: 0'], axis=1, inplace=True)
y_test.drop(['Unnamed: 0'], axis=1, inplace=True)

predictions = model.predict(X_test)

output = {}

output['overall_score'] = model.score(X_test, y_test)

report = classification_report(y_test, predictions).split('\n')

headings = report[0].split()
not_canceled = report[2].split()
canceled = report[3].split()
accurracy = report[5].split()
mac_avg = report[6].split()
wg_avg = report[7].split()

output[0] = {'percesion': not_canceled[1],
             'recall': not_canceled[2], 'f1-score': not_canceled[3]}
output[1] = {'percesion': canceled[1],
             'recall': canceled[2], 'f1-score': canceled[3]}
output['accurracy'] = accurracy[1]
output['mac_avg'] = {'percesion': mac_avg[2],
                     'recall': mac_avg[3], 'f1-score': mac_avg[4]}
output['wg_avg'] = {'percesion': wg_avg[2],
                    'recall': wg_avg[3], 'f1-score': wg_avg[4]}

print(json.dumps(output))
