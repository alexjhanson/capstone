import json
from utils.data_utils import get_data

output = {}

data = get_data()
canceled = data[data['is_canceled'] == 1]

for idx, row in canceled.iterrows():
    if row['deposit_type'] in output:
        output[row['deposit_type']] = output[row['deposit_type']] + 1
    else:
        output[row['deposit_type']] = 1

    if row['customer_type'] in output:
        output[row['customer_type']] = output[row['customer_type']] + 1
    else:
        output[row['customer_type']] = 1

    if row['distribution_channel'] in output:
        output[row['distribution_channel']
               ] = output[row['distribution_channel']] + 1
    else:
        output[row['distribution_channel']] = 1

print(json.dumps(output))
