import pickle
import json
import utils.data_utils as dutil
import config.config as config
import sys


df = dutil.get_prediction_data_frame()

row = dutil.get_sql_record(int(sys.argv[1]))

dutil.populate_prediction_dataframe(df, row)

# Run model on record

f = open(config.MODEL, 'rb')
model = pickle.load(f)
f.close()

X = df.drop(['is_canceled'], axis=1)
y = df['is_canceled']

prediction = model.predict(X)

result = {'res_id': int(sys.argv[1])}

# Score previously processed records where y
# is known (1.0 correct guess 0.0 incorrect guess).
# Otherwise make new prediction for decision 1.0 will cancel 0.0 will not
if row[len(row) - 1] == 1:
    result['score'] = model.score(X, y)
else:
    result['prediction'] = int(prediction[0])

if prediction[0] == 1:
    result['detail'] = 'Predicted Canceled'
else:
    result['detail'] = 'Predicted Not Canceled'

print(json.dumps(result))
