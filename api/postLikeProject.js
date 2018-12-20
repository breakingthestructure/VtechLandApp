const GLOBAL = require('../Globals');

const postLikeProject = (token, projectId) => (
    fetch(`${GLOBAL.API_URL}/project/add-favourite/${projectId}`,  //eslint-disable-line
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
        .then(res => res.json())
);

module.exports = postLikeProject;
