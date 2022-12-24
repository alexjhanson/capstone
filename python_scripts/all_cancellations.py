import json
from utils.data_utils import get_data

output = {}

data = get_data()
canceled = data[data['is_canceled'] == 1]

output['total_reservations'] = len(data)
output['canceled'] = len(canceled)
output['not_canceled'] = output['total_reservations'] - output['canceled']

print(json.dumps(output))
