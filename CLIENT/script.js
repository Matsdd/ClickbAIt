function askQuestion() {
    const Subject = document.getElementById('subject').value;
    const Genre = document.getElementById('genre').value;
    const Weirdness = document.getElementById('weirdness').value;
    const chatOutput = document.getElementById('chat-output');
    const submitButton = document.getElementById('submit-button');

    if (!submitButton) {
        console.error('Submit button not found.');
        return;
    }

    if (!Subject.trim()) {
        console.error('Subject is empty.');
        return;
    }
    if (!Genre.trim()) {
        console.error('Genre is empty.');
        return;
    }
    if (!Weirdness.trim()) {
        console.error('Weirdness is empty.');
        return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner"> </span> Versturen';

    chatOutput.innerHTML += `<div>
                            <strong>subject:</strong> ${Subject}, 
                            <strong>genre:</strong> ${Genre}, 
                            <strong>With weirdness level:</strong> ${Weirdness}
                            </div>`;

    fetch(`http://localhost:3003/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Subject: Subject,
            Genre: Genre,
            Weirdness: Weirdness,
        }),
    })
        .then(response => response.json())
        .then(data => {
            chatOutput.innerHTML += `<div><strong>ClickbAIt:</strong> ${data.response}</div>`;
        })
        .catch(error => {
            console.error('Fout bij het ophalen van het antwoord van de server:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Versturen';

            document.getElementById('subject').value = '';
            document.getElementById('genre').value = '';
            document.getElementById('weirdness').value = '';
        });
}