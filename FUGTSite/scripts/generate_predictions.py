import os
import django
import sys

# Setup de Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FUGTSite.settings')
django.setup()
import pandas as pd
import numpy as np
import json
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Input, Dropout
from sklearn.preprocessing import MinMaxScaler
from FUGTApp.views import prepare_olympic_data
import time
import os



# Chargement des données
medals_df = pd.read_csv('./data/olympic_medals.csv')
athletes_df = pd.read_csv('./data/olympic_athletes.csv')
hosts_df = pd.read_csv('./data/olympic_hosts.csv')
results_df = pd.read_csv('./data/olympic_results.csv')

df_summer = prepare_olympic_data(medals_df, athletes_df, hosts_df, results_df)
df_medals = df_summer.groupby(['year', 'country_name', 'discipline_title']).size().reset_index(name='num_medals')
train_df = df_medals[df_medals['year'] < 2020]

# Construire les séquences
sequences = [
    (country, discipline, group.sort_values('year')['num_medals'].values)
    for (country, discipline), group in train_df.groupby(['country_name', 'discipline_title'])
    if len(group['year'].unique()) >= 5  # Augmenter la profondeur
]

predictions = []
total = len(sequences)

start_all = time.time()

for i, (country, discipline, seq) in enumerate(sequences):
    start = time.time()

    X_raw = seq[:-1].reshape(-1, 1)
    y_raw = np.array([seq[-1]])

    # Normalisation
    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X_raw)
    y_scaled = scaler.transform(y_raw.reshape(-1, 1)).flatten()

    X = X_scaled.reshape((1, X_scaled.shape[0], 1))
    y = y_scaled

    # Modèle LSTM plus robuste
    model = Sequential([
        Input(shape=(X.shape[1], 1)),
        LSTM(64, activation='relu'),
        Dropout(0.2),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse')
    model.fit(X, y, epochs=20, verbose=0)

    # Prédiction + dénormalisation
    pred_scaled = model.predict(X, verbose=0)[0][0]
    pred_value = float(scaler.inverse_transform([[pred_scaled]])[0][0])

    predictions.append({
        'country_name': country,
        'discipline_title': discipline,
        'predicted_medals_2020': round(max(0, pred_value), 2)
    })

    # Progression
    duration = time.time() - start
    print(f"{i+1:>3}/{total} • {country} - {discipline} ➜ {duration:.2f}s ({(i+1)/total*100:.1f}%)")

print(f"\n✅ Terminé en {time.time() - start_all:.2f}s pour {total} prédictions.")

# 🔽 Export JSON
os.makedirs('./data', exist_ok=True)
with open('./data/ml_predictions_2020.json', 'w') as f:
    json.dump(predictions, f, indent=2)
