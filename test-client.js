// test-client.js
const axios = require('axios');

axios.post('http://localhost:3000/identify', {
  email: 'lokhanath@example.com',
  phoneNumber: '9876543210'
})
.then(response => {
  console.log('Response from server:', response.data);
})
.catch(error => {
  console.error('Error:', error.message);
});
