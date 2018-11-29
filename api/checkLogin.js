const GLOBAL = require('../Globals');

const checkLogin = (token) => (
    fetch(`${GLOBAL.API_URL}/check_login.php`, //eslint-disable-line
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.json())
);

module.exports = checkLogin;
