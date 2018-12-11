const GLOBAL = require('../Globals');

const getProfile = (token) => (
    fetch(`${GLOBAL.API_URL}/user/user-profile`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(res => res.json())
);

module.exports = getProfile;
