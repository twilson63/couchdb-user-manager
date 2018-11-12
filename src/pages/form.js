import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "@reach/router";
import { PouchDBContext } from "../db";
import { equals, range, map, trim, split, join } from "ramda";
import View from "../components/View";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import ErrorBox from "../components/ErrorBox";
import doPutUser from "../actions/doPutUser";
import doGetUser from "../actions/doGetUser";

// componentStates
const [LOADING, NEW, EDIT, SUBMIT, SUCCESS, ERROR] = range(1, 7);

/**
 * UserForm
 *
 * create or update users for a couchdb database
 *
 * @param {object} props
 */
export default ({ id }) => {
  const [componentState, transitionTo] = useState(LOADING);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState([]);

  const { db } = useContext(PouchDBContext);

  useEffect(
    () => {
      if (id === "new") {
        return transitionTo(NEW);
      }
      // todo load user...
      transitionTo(EDIT);
    },
    [id]
  );

  const handleSubmit = e => {
    e.preventDefault();
    transitionTo(SUBMIT);
    doPutUser(db, { name, password, email, roles })
      .then(result => {
        if (!result.ok) {
          return transitionTo(ERROR);
        }
        return transitionTo(SUCCESS);
      })
      .catch(err => {
        console.log("ERROR " + err.message);
        setErrors(err.errors);
        transitionTo(ERROR);
      });
  };
  // check if db exists otherwise return to login
  if (!db) {
    return <Redirect to="/" noThrow />;
  }
  if (equals(componentState, SUCCESS)) {
    return <Redirect to="/users" noThrow />;
  }
  return (
    <View>
      <Text el="h1" className="fw3 green">
        User Form
      </Text>
      <Text>Create/Edit CouchDB User</Text>
      {equals(componentState, ERROR) && <ErrorBox msg={errors.join(" ")} />}
      <form className="w-40" onSubmit={handleSubmit}>
        <TextInput label="Username" value={name} onChangeText={setName} />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          label="Confirm Password"
          type="password"
          value={confirm}
          onChangeText={setConfirm}
        />
        <TextInput
          label="Email"
          helperText="enter users email address."
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Roles"
          helperText="comma delimited list of roles"
          value={join(", ", roles)}
          onChangeText={text => map(trim, split(",", text))}
        />

        <Button disabled={false}>Submit</Button>
      </form>
    </View>
  );
};
