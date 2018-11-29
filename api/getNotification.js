const GLOBAL = require('../Globals');

const getNotification = () => (
    fetch(`${GLOBAL.API_URL}/api/option/notifications`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getNotification;
