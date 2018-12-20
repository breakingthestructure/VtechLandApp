const GLOBAL = require('../Globals');

const postUpdateInfomation = (token, userId, fullname, phone, address, birthday, identity, gender) => (
    fetch(`${GLOBAL.API_URL}/user/edit/${userId}`,  //eslint-disable-line
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ fullname, address, phone, birthday, identity, gender })
        })
        .then(res => res.json())
);

module.exports = postUpdateInfomation;
