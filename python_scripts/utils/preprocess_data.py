from . import data_utils as dutil


def get_prepared_data():

    data = dutil.get_data()

    dutil.create_sql_cols_csv(data)

    for col in data:
        if data[col].dtype == 'object':
            data = dutil.create_dummies(data, col)

    data = dutil.relabel_duplicates(data)

    # Dataframe column will have same column names
    # as SQLite3 TABLE. Group throws SQLite error.
    data.rename({'Group': 'Grp'}, axis=1, inplace=True)

    dutil.create_dataframe_cols_csv(data)

    return data
