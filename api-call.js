const Arrow_Direction = {
  "like": "up",
  "dislike": "down",
  "three2": "right",
  "three": "left"
};

async function getPredictedLabel(landmarks) {
  console.log('Calling API with landmarks:', landmarks); // Add this line

  try {
    const payload = {
      landmarks: landmarks.map(point => ({
        x: point.x,
        y: point.y,
        z: point.z
      }))
    };

    const response = await fetch('http://127.0.0.1:8000/predict-landmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('API error:', response.statusText);
      return null;
    }

    const data = await response.json();
    console.log('API Response:', data);

    const gesture = data.gesture;
    const control = Arrow_Direction[gesture];

    if (!control) {
      console.warn(`Unmapped gesture: ${gesture}`);
      return null;
    }

    return control;

  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}
