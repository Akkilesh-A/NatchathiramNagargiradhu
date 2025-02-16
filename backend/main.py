from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import numpy as np
import tensorflow as tf
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.model_selection import train_test_split
import json
import time
from fastapi.middleware.cors import CORSMiddleware
from astroquery.gaia import Gaia
from astropy.coordinates import SkyCoord
import astropy.units as u

app = FastAPI()

# Allow requests from your Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "CORS is enabled"}
# Generate synthetic dataset
def generate_synthetic_data(n_objects=1000, n_time_steps=10):
    times = np.linspace(0, 1, n_time_steps)
    data = []
    for i in range(n_objects):
        slope = np.random.uniform(-0.005, 0.005)
        intercept = np.random.uniform(0.02, 0.05)
        redshifts = intercept + slope * times + np.random.normal(scale=0.001, size=n_time_steps)
        data.append(redshifts)
    return np.array(data), times

X_data, time_steps = generate_synthetic_data()
X_data = X_data.reshape(-1, len(time_steps), 1)
y_data = np.roll(X_data, shift=-1, axis=1)[:, -1, 0]
X_train, X_test, y_train, y_test = train_test_split(X_data, y_data, test_size=0.2, random_state=42)

# Define LSTM model
model = Sequential([
    LSTM(50, activation='tanh', input_shape=(X_train.shape[1], X_train.shape[2])),
    Dense(1)
])
model.compile(optimizer='adam', loss='mse')

# Streaming function for training
def train_model():
    epochs = 50
    batch_size = 32
    history = []
    
    for epoch in range(epochs):
        hist = model.fit(X_train, y_train, batch_size=batch_size, verbose=0)
        loss = hist.history['loss'][0]
        history.append(loss)

        # Send JSON data as a streaming response
        yield f"data: {json.dumps({'epoch': epoch + 1, 'loss': loss})}\n\n"
        time.sleep(0.5)  # Simulate delay

    # Final evaluation
    test_loss = model.evaluate(X_test, y_test, verbose=0)
    y_pred = model.predict(X_test)

    final_data = {
        "test_loss": test_loss,
        "y_test": y_test.tolist(),
        "y_pred": y_pred.flatten().tolist()
    }

    yield f"data: {json.dumps({'final': final_data})}\n\n"

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/train")
async def train():
    return StreamingResponse(train_model(), media_type="text/event-stream")

def query_andromeda():
    query = """
        SELECT
            TOP 300 
            g.source_id,
            g.ra,
            g.dec,
            g.parallax,
            g.pmra,
            g.pmdec,
            g.radial_velocity,
            g.phot_g_mean_mag,
            g.phot_bp_mean_mag,
            g.phot_rp_mean_mag,
            g.ref_epoch
        FROM
            gaiadr3.gaia_source AS g
        WHERE
            g.ra BETWEEN 9.0 AND 12.0
            AND g.dec BETWEEN 40.0 AND 43.0
            AND g.parallax > 0
            AND g.radial_velocity IS NOT NULL;
    """

    job = Gaia.launch_job(query)
    results = job.get_results()
    
    # Convert to Pandas DataFrame
    df = results.to_pandas()
    
    # Replace NaN and infinite values with None (JSON-compliant)
    df.replace([np.inf, -np.inf], np.nan, inplace=True)
    df.fillna(value=0, inplace=True)
    
    return df.to_dict(orient="records")

@app.get("/andromeda")
async def get_andromeda_data():
    data = query_andromeda()
    return {"count": len(data), "data": data}

@app.get("/gaia")
async def get_gaia_data():
    coords = SkyCoord('00h42m44.3s +41d16m09s', frame='icrs')
    query = f"""
    SELECT TOP 1000
    source_id, ra, dec, parallax, radial_velocity, phot_g_mean_mag, ref_epoch
    FROM gaiadr3.gaia_source
    WHERE 1=CONTAINS(POINT('ICRS', ra, dec), CIRCLE('ICRS', {coords.ra.degree}, {coords.dec.degree}, 1))
    AND radial_velocity IS NOT NULL
    """
    job = Gaia.launch_job(query)
    results = job.get_results()

    # Ensure all values are JSON serializable
    data = []
    for row in results:
        entry = {}
        for col in results.colnames:
            value = row[col]
            if isinstance(value, (np.float32, np.float64)):
                entry[col] = float(value)
            elif isinstance(value, (np.int32, np.int64)):
                entry[col] = int(value)
            elif isinstance(value, bytes):  # Decode bytes if necessary
                entry[col] = value.decode()
            else:
                entry[col] = value
        data.append(entry)

    return {"data": data}