/*
  login as administrator user

  @param {object} db - database object
  @param {string} name - name
  @param {string} password - password
  @returns {Promise}
*/
export default (server, name, password) => {
  return fetch(server + "/_session", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      authorization: `Basic ${btoa(name + ":" + password)}`
    },
    body: JSON.stringify({
      name,
      password
    })
  }).then(res => res.json());
};
