import React, { useEffect, useState, useContext } from "react";
import { Link } from "@reach/router";
import { PouchDBContext } from "../db";
import { Redirect } from "@reach/router";
import { pluck, filter, propEq, equals, compose, map } from "ramda";
import View from "../components/View";
import Text from "../components/Text";
import Button from "../components/Button";

const onlyUsers = compose(
  filter(propEq("type", "user")),
  pluck("doc")
);

const [LOADING, READY, ERROR] = [1, 2, 3];
export default () => {
  const [users, setUsers] = useState([]);
  const [componentState, transitionTo] = useState(LOADING);
  const { db } = useContext(PouchDBContext);

  useEffect(() => {
    //db.info().then(console.log.bind(console));
    db.allDocs({ include_docs: true })
      .then(docs => {
        setUsers(onlyUsers(docs.rows));
        transitionTo(READY);
      })
      .catch(err => transitionTo(ERROR));
  }, []);

  if (equals(componentState, ERROR)) {
    return <Redirect to="/" noThrow />;
  }
  if (equals(componentState, LOADING)) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Users List</Text>
      <Link to="/users/new">
        <Button>New User</Button>
      </Link>
      <ul className="list ml0 mt3 w-40">
        {map(u => <li className="ma0 ba pa2">{u.name}</li>, users)}
      </ul>
    </View>
  );
};
