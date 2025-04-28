import os
import django
import sys
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
CORS_ALLOW_ALL_ORIGINS = True

ALLOWED_HOSTS = []
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3001',
    'http://localhost:3000',
]

# Dans vos paramètres Django, ajoutez les méthodes HTTP nécessaires à CORS_ALLOWED_METHODS
CORS_ALLOWED_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'PROPFIND',
    'PROPPATCH',
    'MKCOL',
    'COPY',
    'MOVE',
    'LOCK',
]

# Vous pouvez également ajouter des méthodes spécifiques à CORS_ALLOW_METHODS pour un contrôle plus fin
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'PROPFIND',
    'PROPPATCH',
    'MKCOL',
    'COPY',
    'MOVE',
    'LOCK',
]

# Dans vos paramètres Django, ajoutez 'content-type' à CORS_ALLOWED_HEADERS
CORS_ALLOWED_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',  # Ajoutez 'content-type' ici
    'access-control-allow-headers',
    'access-control-allow-origin',
    # Autres en-têtes nécessaires
]
# In your Django settings.py
# Application definition
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',  # Assurez-vous que content-type est autorisé
    'access-control-allow-headers',
    'access-control-allow-origin',
    # Ajoutez tout autre en-tête nécessaire
]

INSTALLED_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'FUGTApp',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Setup de Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FUGTSite.settings')
django.setup()

import pandas as pd
import numpy as np
import json
import time
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, LSTM, Dense, Dropout, Bidirectional
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder
from FUGTApp.views import prepare_olympic_data

# Chargement des données
medals_df = pd.read_csv('./data/olympic_medals.csv')
athletes_df = pd.read_csv('./data/olympic_athletes.csv')
hosts_df = pd.read_csv('./data/olympic_hosts.csv')
results_df = pd.read_csv('./data/olympic_results.csv')

# Préparation des données
print("\n[INFO] Préparation des données olympiques...")
df_summer = prepare_olympic_data(medals_df, athletes_df, hosts_df, results_df, year_min=2004)
df_medals = df_summer.groupby(['year', 'country_name', 'discipline_title']).size().reset_index(name='num_medals')
train_df = df_medals[df_medals['year'] < 2020]

# Encodage one-hot
country_encoder = OneHotEncoder(sparse_output=False)
discipline_encoder = OneHotEncoder(sparse_output=False)
country_encoder.fit(train_df[['country_name']])
discipline_encoder.fit(train_df[['discipline_title']])

# Séquences utilisables
sequences = []
for (country, discipline), group in train_df.groupby(['country_name', 'discipline_title']):
    group = group.sort_values('year')
    seq = group['num_medals'].values
    if len(seq) >= 4:
        sequences.append((country, discipline, group['year'].values, seq))

print(f"[INFO] {len(sequences)} séquences prêtes pour entraînement")
predictions = []
total = len(sequences)
start_all = time.time()

for i, (country, discipline, years, seq) in enumerate(sequences):
    start = time.time()

    X_raw = seq[:-1].reshape(-1, 1)
    y_raw = np.array([seq[-1]])

    # Normalisation
    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X_raw)
    y_scaled = scaler.transform(y_raw.reshape(-1, 1)).flatten()

    # Encodage catégoriel répliqué sur chaque timestep
    country_encoded = country_encoder.transform([[country]])[0]
    discipline_encoded = discipline_encoder.transform([[discipline]])[0]
    cat_features = np.tile(np.concatenate([country_encoded, discipline_encoded]), (X_scaled.shape[0], 1))

    # Fusion features numériques + catégorielles
    X_combined = np.concatenate([X_scaled, cat_features], axis=1).reshape((1, X_scaled.shape[0], -1))
    y = y_scaled

    # === Architecture LSTM Améliorée ===
    input_layer = Input(shape=(X_combined.shape[1], X_combined.shape[2]))
    x = Bidirectional(LSTM(64, return_sequences=True))(input_layer)
    x = Dropout(0.3)(x)
    x = LSTM(32)(x)
    x = Dense(16, activation='relu')(x)
    output = Dense(1)(x)

    model = Model(inputs=input_layer, outputs=output)
    model.compile(optimizer='adam', loss='mse')
    model.fit(X_combined, y, epochs=20, verbose=0)

    pred_scaled = model.predict(X_combined, verbose=0)[0][0]
    pred_value = float(scaler.inverse_transform([[pred_scaled]])[0][0])

    predictions.append({
        'country_name': country,
        'discipline_title': discipline,
        'predicted_medals_2020': round(max(0, pred_value), 2)
    })

    duration = time.time() - start
    print(f"{i+1:>3}/{total} • {country} - {discipline} ➔ {duration:.2f}s ({(i+1)/total*100:.1f}%)")

# Export
os.makedirs('./data', exist_ok=True)
with open('./data/ml_predictions_2020.json', 'w') as f:
    json.dump(predictions, f, indent=2)

print(f"\n✅ Terminé en {time.time() - start_all:.2f}s pour {total} prédictions.")
