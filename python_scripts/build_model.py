import pickle
from utils.preprocess_data import get_prepared_data
import config.config as config
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression


data = get_prepared_data()

X = data.drop('is_canceled', axis=1)
y = data['is_canceled']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33)

X_test.to_csv(config.X_TEST_DATA)
y_test.to_csv(config.Y_TEST_DATA)

model = LogisticRegression(max_iter=3000)

model.fit(X_train, y_train)

f = open(config.MODEL, 'wb')
pickle.dump(model, f)
f.close()
