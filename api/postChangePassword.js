const GLOBAL = require('../Globals');

const postChangePassword = (token, email, current_password, password, password_confirmation) => (
    fetch(`${GLOBAL.API_URL}/user/change-password`,  //eslint-disable-line
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                email,
                current_password,
                password,
                password_confirmation
            })
        })
        .then(res => res.json())
);

module.exports = postChangePassword;
