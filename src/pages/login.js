import React, { useState, useContext } from "react";
import { Redirect } from "@reach/router";
import { PouchDBContext } from "../db";
import equals from "ramda/src/equals";
import TextInput from "../components/TextInput";
import View from "../components/View";
import Text from "../components/Text";
import Button from "../components/Button";
import ErrorBox from "../components/ErrorBox";

import doLogin from "../actions/doLogin";

// What kind of states can this form have?
const [READY, SUBMIT, SUCCESS, ERROR] = [1, 2, 3, 4];

const Login = () => {
  const [componentState, transitionTo] = useState(READY);
  const [server, setServer] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { db, init } = useContext(PouchDBContext);

  const handleSubmit = async e => {
    transitionTo(SUBMIT);
    e.preventDefault();
    //const result = await doLogin(server, username, password);

    //setContext Db
    const result = await init(server, username, password);
    if (!result.ok) {
      setUsername("");
      setPassword("");
      return transitionTo(ERROR);
    }
    transitionTo(SUCCESS);
  };

  if (equals(componentState, SUCCESS)) {
    return <Redirect to="/users" noThrow />;
  }

  return (
    <View>
      <Text el="h1" className="green fw3">
        Admin Login
      </Text>
      <Text el="p">Connect to your CouchDB Server and manage your Users</Text>
      {equals(componentState, ERROR) && (
        <ErrorBox msg="Unable to login, try again!" />
      )}
      <form className="w-40" onSubmit={handleSubmit}>
        <TextInput
          label="Server"
          helperText="eg. https://server.domain.com"
          value={server}
          onChangeText={setServer}
        />
        <TextInput
          label="Username"
          helperText="Username must be an administrator user"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          label="Password"
          type="password"
          helperText="Enter at least eight characters..."
          value={password}
          onChangeText={setPassword}
        />
        <Button bgColor="black" color="white">
          Login
        </Button>
      </form>
    </View>
  );
};

export default Login;
