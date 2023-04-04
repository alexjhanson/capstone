
import json
from utils import data_utils

output = {}

data = data_utils.get_data()
canceled = data[data['is_canceled'] == 1]

output['total_reservations'] = len(data)
output['canceled'] = len(canceled)
output['not_canceled'] = output['total_reservations'] - output['canceled']

print(json.dumps(output))
