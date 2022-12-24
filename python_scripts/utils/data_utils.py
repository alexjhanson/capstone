import pandas as pd
import re
import csv
import sqlite3
import config.config as config


def get_data():

    data = pd.read_csv(config.DATA_FILE_PATH)

    # Remove Resort Hotel records
    # Resort Hotel == 33% of data
    # cannot assume that features impact
    # City Hotel and Resort Hotel clients
    # proportionally.
    # City Hotel == 64% of data
    data = data[data['hotel'] == 'City Hotel']

    drop_columns(data)
    data.dropna(inplace=True)

    return data


def drop_columns(df):
    df.drop(config.EXCLUDED_COLUMNS, axis=1, inplace=True)


def normalize_column(df, col, idx):
    if re.search("[\\\/\-]", col):
        df.columns.values[idx] = re.sub(
            "[\\\/\-]", "_", col)


def create_dummies(df, col):

    new_cols = pd.get_dummies(df[col], drop_first=True)

    for tup in enumerate(new_cols, start=0):
        normalize_column(new_cols, tup[1], tup[0])

    df = pd.concat([df, new_cols], axis=1)
    df.drop([col], axis=1, inplace=True)
    return df


def relabel_duplicates(df):

    column_dup_count = {}
    columns = df.columns

    for tup in enumerate(columns, start=0):
        if tup[1] in column_dup_count:
            column_dup_count[tup[1]] = column_dup_count[tup[1]] + 1
            df.columns.values[tup[0]] = tup[1] + \
                "_" + str(column_dup_count[tup[1]])
        else:
            column_dup_count[tup[1]] = 0

    return df


def create_sql_cols_csv(df):

    f = open(config.SQL_COLUMNS, 'w')
    writer = csv.writer(f)
    writer.writerow(tuple(df.columns.to_list()))

    dtypes = df.dtypes.to_list()
    typeList = []

    for t in dtypes:
        if (t == 'int64') or (t == 'uint8'):
            typeList.append('int')
        elif t == 'float64':
            typeList.append('real')
        else:
            typeList.append('text')

    writer.writerow(tuple(typeList))
    f.close()


def create_dataframe_cols_csv(df):

    f = open(config.MODEL_COLUMNS, 'w')
    writer = csv.writer(f)
    writer.writerow(tuple(df.columns.to_list()))
    writer.writerow(tuple(df.dtypes.to_list()))
    f.close()


def get_prediction_data_frame():
    # Create a DataFrame with one empty row
    # and the same columns as the training
    # and test data for the LogisticRegression model

    f = open(config.MODEL_COLUMNS, 'r')
    cols = f.readline().split(',')
    dtypes = f.readline().split(',')
    f.close()

    d = {}

    for i in range(len(cols)):
        d[cols[i].strip()] = pd.Series(dtype=dtypes[i].strip())

    df = pd.DataFrame(d)
    df.loc[len(df)] = 0

    return df


def get_sql_record(id):

    # Get a reservation record from the data base
    conn = sqlite3.connect(config.DB)

    c = conn.cursor()

    c.execute("SELECT * FROM reservations WHERE res_id = %d" % id)

    row = list(c.fetchone())
    row.remove(row[0])

    conn.close()

    return row


def populate_prediction_dataframe(df, row):

    f = open(config.SQL_COLUMNS, 'r')
    names = f.readline().split(',')
    f.close()

    # Remove year and day of month SQL columns.
    row.pop()
    row.pop()

    # Columns containing string data had dummies
    # values created for them to make them numerical
    # turing the range of string values in to more columns
    # with 1 or 0 indicating the presence or absence
    # respectively of the feature. So the blank DataFrame
    # will share columns with the sql recored where the
    # value is numerical, and the string values of the
    # record will be DataFrame columns. If they are present
    # they are assigned a value of 1 indicating the presence
    # of the feature.
    for val in enumerate(names, start=0):
        if (type(row[val[0]]) == str) and (row[val[0]] in df):
            df[row[val[0]]].iloc[0] = 1
        elif (val[1] in df):
            df[val[1]].iloc[0] = row[val[0]]
