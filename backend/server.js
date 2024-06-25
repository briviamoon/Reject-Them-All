const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');

const app = express();
const PORT = 3000;
const cors = require('cors');
const axios = require('axios');

// Function to get the local IP address of the machine
function getLocalIPAddress() {
	const interfaces = os.networkInterfaces();
    for (const ifaceName in interfaces) {
		const iface = interfaces[ifaceName];
        for (const alias of iface) {
			if (alias.family === 'IPv4' && !alias.internal) {
				return alias.address;
            }
        }
    }
    return '127.0.0.1';
}

const HOST = getLocalIPAddress(); // Get the dynamic IP address

app.use(bodyParser.json());
app.use(express.static('frontend'));
app.use(cors());


//
let addressProviderInfo = null;

// Function to register with address provider
function registerWithAddressProvider() {
    const initialAddressProviderUrl = `http://${HOST}:4000`; // Assuming address provider is on the same machine initially
    
    axios.post(`${initialAddressProviderUrl}/register-backend`, { ip: HOST, port: PORT })
        .then(response => {
            addressProviderInfo = response.data.addressProviderInfo;
            console.log('Registered with address provider:', addressProviderInfo);
        })
        .catch(error => {
            console.error('Failed to register with address provider:', error);
            // Retry after a delay
            setTimeout(registerWithAddressProvider, 5000);
        });
}

// Register with address provider when server starts
registerWithAddressProvider();


// signature submission endpoint
app.post('/submit', (req, res) => {
    const { name, idNumber, signature } = req.body;

    // Validate input
    if (!name || !idNumber || !signature) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Here you would add the logic to verify the ID with the IPRS data
    // For now, we will simulate this with a simple condition
    if (idNumber !== '12345678') {
        return res.status(400).json({ message: 'ID number not found in IPRS.' });
    }

    // Simulate saving the data to a database
	// save data to a database later though
    console.log('Data received:', { name, idNumber, signature });

    res.json({ message: 'Signature collected successfully\nShare to Your Frinds To make this possible' });
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
