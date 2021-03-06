const publicToken = "64198f6f1e227b537244360e04f08f";
export const host = "https://data.eni.wien";
const request = (path: string, { appendix = "", token = publicToken } = {}) =>
  `${host}/${path}?token=${token}${appendix}`;
const fetchJSON = (url: string) =>
  fetch(url)
    .then(x => x.json())
    .catch(() => ({
      title: "",
      content: "Dieser Text kann nicht angezeigt werden.",
    }));

export default {
  singleton: (id: string, token?: string) =>
    fetchJSON(request(`api/singletons/get/${id}`, { token })),
  collection: (id: string, token?: string, appendix = "") =>
    fetchJSON(request(`api/collections/get/${id}`, { token, appendix })),
  users: (token?: string, appendix = "") =>
    fetchJSON(request(`api/cockpit/listUsers`, { token, appendix })),
  collectionEntry: (collection: string, entryId: string) =>
    fetchJSON(
      request(`api/collections/get/${collection}`, {
        appendix: `&filter[_id]=${entryId}`,
      })
    ).then(x => x.entries[0]),
};
