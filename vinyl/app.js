document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture');
    const retryButton = document.getElementById('retry');
    const result = document.getElementById('result');
    const loading = document.getElementById('loading');
    const albumInfo = document.getElementById('album-info');

    // Access the camera
    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment'  // Use back camera on mobile
                } 
            });
            video.srcObject = stream;
        } catch (err) {
            console.error('Error accessing camera:', err);
            alert('Unable to access camera. Please make sure you have granted camera permissions.');
        }
    }

    // Initialize camera when page loads
    startCamera();

    // Capture photo
    captureButton.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        
        // Convert canvas to base64 image
        const imageData = canvas.toDataURL('image/jpeg').split(',')[1];
        
        // Show loading state
        result.style.display = 'block';
        loading.style.display = 'block';
        albumInfo.innerHTML = '';
        captureButton.style.display = 'none';
        retryButton.style.display = 'block';
        
        // Send to OpenAI Vision API
        analyzeAlbum(imageData);
    });

    // Retry button handler
    retryButton.addEventListener('click', () => {
        result.style.display = 'none';
        captureButton.style.display = 'block';
        retryButton.style.display = 'none';
        albumInfo.innerHTML = '';
    });

    // Function to analyze album using OpenAI Vision API
    async function analyzeAlbum(base64Image) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: "This is a vinyl album cover. Please provide the following information in HTML format: artist name, album title, release date, and track listing. If you can't identify the album with certainty, please say so."
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: `data:image/jpeg;base64,${base64Image}`
                                    }
                                }
                            ]
                        }
                    ]
                })
            });

            const data = await response.json();
            
            // Hide loading spinner
            loading.style.display = 'none';
            
            // Display the result
            albumInfo.innerHTML = data.choices[0].message.content;

        } catch (error) {
            console.error('Error analyzing album:', error);
            loading.style.display = 'none';
            albumInfo.innerHTML = '<p class="error">Error analyzing album. Please try again.</p>';
        }
    }
});
