const axios = require('axios').default;

async function fetchAllUsers() {
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );

  return users;
}
// Route to fetch user are https://jsonplaceholder.typicode.com/users/:userId
async function fetchUserById(userId) {
  
  const {data : userData} = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)  

  return {name: userData.name, email:userData.email};
}

module.exports = { fetchAllUsers, fetchUserById };
