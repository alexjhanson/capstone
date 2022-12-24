import json
from utils.data_utils import get_data

output = {}

data = get_data()
canceled = data[data['is_canceled'] == 1]

output['months'] = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0,
                    'June': 0, 'July': 0, 'August': 0, 'September': 0,  'October': 0, 'November': 0, 'December': 0, }

for idx, row in canceled.iterrows():
    output['months'][row['arrival_date_month']
                     ] = output['months'][row['arrival_date_month']] + 1

print(json.dumps(output))
