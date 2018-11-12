import React, { useState } from "react";
import PouchDB from "pouchdb";
import PouchDBAuthentication from "pouchdb-authentication";

PouchDB.plugin(PouchDBAuthentication);

window.PouchDB = PouchDB;

let PouchDBContext = React.createContext();

function PouchDbProvider(props) {
  const [db, setDb] = useState(null);
  const init = (server, username, password) => {
    const db = PouchDB(server + "/_users", {
      skip_setup: true,
      auth: {
        username,
        password
      }
    });
    return db
      .logIn(username, password)
      .then(user => {
        console.log(user);
        setDb(db);
        return { ok: true };
      })
      .catch(err => {
        console.log("can not login");
      });
  };
  let value = { db, init };
  return (
    <PouchDBContext.Provider value={value}>
      {props.children}
    </PouchDBContext.Provider>
  );
}

export { PouchDBContext, PouchDbProvider };
