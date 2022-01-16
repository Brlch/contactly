import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export class Contacts extends Component {
  static displayName = Contacts.name;

  constructor(props) {
    super(props);
    this.state = { contacts: [], loading: true };
  }

  componentDidMount() {
    this.populateContactData();
  }

  static renderContactsTable(contacts) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.name}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      Contacts.renderContactsTable(this.state.contacts)
    );

    return (
      <div>
        <h1 id="tableLabel">My contacts</h1>
        
        {contents}
        <Link
          className="btn btn-lg btn-primary"
          role="button"
          to="/addeditcontact"
        >
          New contact <FontAwesomeIcon icon={faPlus}/>
        </Link>
      </div>
    );
  }

  async populateContactData() {
    const response = await fetch("contact");
    const data = await response.json();
    this.setState({ contacts: data, loading: false });
  }
}
