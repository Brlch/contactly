import React, { Component } from "react";
import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Contacts } from "./components/Contact/Contacts";
import AddEditContact from "./components/Contact/AddEditContact";
import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          <Route exact path="/" component={<App />}>
            <Route index element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/addeditcontact" element={<AddEditContact />} />
          </Route>
        </Routes>
      </Layout>
    );
  }
}
