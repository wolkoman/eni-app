const publicToken = '64198f6f1e227b537244360e04f08f';
const request = path => `https://cockpit.eni.wien/${path}?token=${publicToken}`;
const fetchJSON = (url) => fetch(url).then(x => x.json()).catch(() => ({title:'', content:'Dieser Text kann nicht angezeigt werden.'}));

export default {
    singleton: (id) => fetchJSON(request(`api/singletons/get/${id}`))
};