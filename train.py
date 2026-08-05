import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib
import os

print('Loading data...')
df = pd.read_csv('data/emails.csv')

print('Training model...')
model = make_pipeline(TfidfVectorizer(stop_words='english'), MultinomialNB())
model.fit(df['text'], df['label'])

print('Testing model locally...')
print('Prediction for "Urgent update your account":', model.predict(["Urgent update your account"])[0])

print('Saving model...')
joblib.dump(model, 'model.pkl')
print('Model training complete and saved as model.pkl')
