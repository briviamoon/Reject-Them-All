let serverAddress = '';
const ADDRESS_PROVIDER = 'http://192.168.0.101:4000' // update this to the current address provider's address

// Function to get the backend address from the address provider
function getBackendAddress() {
    return fetch(`${ADDRESS_PROVIDER}/get-backend-address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passcode: '9062002' }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.address) {
            serverAddress = data.address;
            console.log('Backend address:', serverAddress);
        } else {
            throw new Error('Failed to get backend address');
        }
    })
    .catch(error => {
        console.error('Error getting backend address:', error);
        throw error;
    });
}

// Get the backend address when the page loads
getBackendAddress();

document.getElementById('signatureForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const idNumber = document.getElementById('idNumber').value;
    const signature = document.getElementById('signature').value;

    const data = { name, idNumber, signature };

    fetch(`${serverAddress}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'An error occurred. Please try again.';
    });
});
