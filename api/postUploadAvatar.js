const GLOBAL = require('../Globals');

const postUploadAvatar = (token, avatar) => (
    fetch(`${GLOBAL.API_URL}/user/upload-avatar`,  //eslint-disable-line
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                // Accept: 'application/json'
            },
            body: avatar
        })
        .then(res => res.json())
);

module.exports = postUploadAvatar;
