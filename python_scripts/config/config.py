import os

# The data in the following columns
# were deemed irrelevant, caused skews
# in the prediction model, or couldn't
# be reproduced with new data to test.
# -------------------------------------
# Ex: Columns where 0 or 1 was used to
# indicate the presence or absence of a feature
# and the overwhelming majority of data points
# had a single value.
#
# Ex. Countries was dropped because creating dummies
# for the oringal dataset only considered the countries
# currently present in the data. If a new reservation
# had a country not previously in the training or testing
# set the prediction would fail.
#
# Ex. Dataset is for two hotels by string name,
# the records for the resort hotel are being dropped
# from the dataset and the column for the hotel name removed.

EXCLUDED_COLUMNS = [
    'hotel',
    'arrival_date_year',
    'arrival_date_week_number',
    'arrival_date_day_of_month',
    'babies',
    'meal',
    'country',
    'is_repeated_guest',
    'previous_cancellations',
    'previous_bookings_not_canceled',
    'reserved_room_type',
    'assigned_room_type',
    'agent',
    'company',
    'adr',
    'required_car_parking_spaces',
    'reservation_status',
    'reservation_status_date']

DATA_FILE_PATH = os.getcwd() + '/python_scripts/data/hotel_bookings.csv'

MODEL = os.getcwd() + '/python_scripts/model/logistic_model'

X_TEST_DATA = os.getcwd() + '/python_scripts/data/x_test_data.csv'

Y_TEST_DATA = os.getcwd() + '/python_scripts/data/y_test_data.csv'

MODEL_COLUMNS = os.getcwd() + '/python_scripts/data/dataframe_column_names.csv'

SQL_COLUMNS = os.getcwd() + '/db/sql_columns.csv'

DB = os.getcwd() + '/db/reservations.db'
