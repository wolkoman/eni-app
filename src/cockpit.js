const publicToken = '64198f6f1e227b537244360e04f08f';
export const host = 'https://cockpit.eni.wien';
const request = (path, appendix = '') => `${host}/${path}?token=${publicToken}${appendix}`;
const fetchJSON = (url) => fetch(url).then(x => x.json()).catch(() => ({title:'', content:'Dieser Text kann nicht angezeigt werden.'}));

export default {
    singleton: (id) => fetchJSON(request(`api/singletons/get/${id}`)),
    collection: (id) => fetchJSON(request(`api/collections/get/${id}`)),
    collectionEntry: (collection, entryId) => fetchJSON(request(`api/collections/get/${collection}`, `&filter[_id]=${entryId}`)).then(x => x.entries[0]),
};