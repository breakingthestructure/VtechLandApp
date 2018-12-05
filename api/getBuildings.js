const GLOBAL = require('../Globals');

const getBuildings = (idProject) => (
    fetch(`${GLOBAL.API_URL}/option/building-by-project/${idProject}`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getBuildings;
