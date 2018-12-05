const GLOBAL = require('../Globals');

const getDetailProject = (projectId) => (
    fetch(`${GLOBAL.API_URL}/project/detail/${projectId}`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getDetailProject;
