import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";

const FormInputEntry = (props) => {
  return (
    <FormGroup>
      <Label for={props.name}>{props.name}</Label>
      <Input
        placeholder={props.placeholder}
        onChange={(e) => {
          props.setter(e.target.value);
        }}
        value={props.value || ""}
      />
    </FormGroup>
  );
};

const AddEditContact = (props) => {
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update the contact info using the browser API
    if (location.state) {
      const { name, email, phone } = location.state;
      setName(name);
      setEmail(email);
      setPhone(phone);
    }
  });

  const saveContact = () => {
    fetch("contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Phone: phone,
      }),
    })
      .then((response) => navigate("/contacts"))
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <Form className="form">
        <FormInputEntry
          name="Name"
          placeholder="Jhon Doe"
          setter={setName}
          value={name}
        ></FormInputEntry>
        <FormInputEntry
          name="Email"
          placeholder="jdoe@example.com"
          setter={setEmail}
          value={email}
        ></FormInputEntry>
        <FormInputEntry
          name="Phone"
          placeholder="0000000000"
          setter={setPhone}
          value={phone}
        ></FormInputEntry>
        <Button className="btn btn-primary" type="button" onClick={saveContact}>
          Add contact <FontAwesomeIcon icon={faSave} />
        </Button>
        <Link className="btn btn-secondary" to="/contacts">
          Cancel <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </Form>
    </div>
  );
};

export default AddEditContact;
