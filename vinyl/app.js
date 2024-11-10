const video = document.getElementById('video');
const startCameraButton = document.getElementById('start-camera');
const captureButton = document.getElementById('capture');
const resultsDiv = document.getElementById('results');

startCameraButton.onclick = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        captureButton.disabled = false;
    } catch (err) {
        alert('Error accessing the camera: ' + err.message);
    }
};

captureButton.onclick = () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg');
    sendImageToServer(imageData);
};

async function sendImageToServer(imageData) {
    try {
        const response = await fetch('https://your-backend-server.com/process-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData })
        });
        const result = await response.json();
        displayResult(result);
    } catch (err) {
        alert('Error processing the image: ' + err.message);
    }
}

function displayResult(result) {
    const itemDiv = document.createElement('div');
    itemDiv.textContent = `Album: ${result.albumTitle} by ${result.artist}`;
    resultsDiv.appendChild(itemDiv);
}