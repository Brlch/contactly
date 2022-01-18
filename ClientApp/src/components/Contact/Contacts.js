import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import {
  faPencilAlt,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export class Contacts extends Component {
  static displayName = Contacts.name;

  constructor(props) {
    super(props);
    this.state = { contacts: [], loading: true };
    this.deleteContact = this.deleteContact.bind(this);
  }

  componentDidMount() {
    this.populateContactData();
  }
  deleteContact = (id) => {
    const self = this;
    fetch("contact", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: id,
      }),
    }).then(() => {
      self.populateContactData();
    });
  };
  static renderContactsTable(contacts, deleteContact) {
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
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <Link
                  className="btn btn-secondary"
                  to="/addeditcontact"
                  state={{
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                    id: contact.id,
                  }}
                >
                  Edit <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
                <Button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                    deleteContact(contact.id);
                  }}
                >
                  Delete <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
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
      Contacts.renderContactsTable(this.state.contacts, this.deleteContact)
    );

    return (
      <div>
        <h1 id="tableLabel">My contacts</h1>

        {contents}
        <Link className="btn btn-lg btn-primary" to="/addeditcontact">
          New contact <FontAwesomeIcon icon={faPlus} />
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
