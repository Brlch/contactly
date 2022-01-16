import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";

const AddEditContact = () => {
  // Declare a new state variable, which we'll call "count"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <Form className="form">
        <FormGroup>
          <Label for="name">Name</Label>
          <Input placeholder="Jhon Doe" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input placeholder="jdoe@example.com" />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input placeholder="0000000000" />
        </FormGroup>
        <Button className="btn btn-primary">Add contact</Button>
        <Link className="btn btn-secondary" to="/contacts">
          Cancel <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </Form>
    </div>
  );
};

export default AddEditContact;
