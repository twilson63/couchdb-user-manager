import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import { PouchDbProvider } from "./db";

// pages
import Login from "./pages/login";
import Users from "./pages/users";
import Form from "./pages/form";

const App = () => {
  return (
    <Router>
      <Login path="/" />
      <Users path="/users" />
      <Form path="/users/:id" />
    </Router>
  );
};
render(
  <PouchDbProvider>
    <App />
  </PouchDbProvider>,
  document.getElementById("app")
);
