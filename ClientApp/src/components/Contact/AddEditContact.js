import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import './AddEditContact.css';

//Validation functions
const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const isValidEmail = (email) => { return regexEmail.test(email); }
const isValidPhone = (phone) => { return regexPhone.test(phone); }
const isValidName = (name) => { return name && name.length>=1 };


//General form input entry
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
        type={props.type || "text"}
      />
     <Label className="inputInvalid">{props.valid}</Label>

    </FormGroup>
  );
};
const GetRandomId = () => {
  return (Math.floor(Math.random() * 1000) + 1000).toString();
};
const AddEditContact = (props) => {
  const [id, setId] = useState(GetRandomId());
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const navigate = useNavigate();
  const location = useLocation();

  const [nameValid, setNameValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [phoneValid, setPhoneValid] = useState("");

  useEffect(() => {
    // Update the contact info using the browser API
    if (location.state) {
      const { id, name, email, phone } = location.state;
      setId(id);
      setName(name);
      setEmail(email);
      setPhone(phone);
      location.state = null;
    }
  });
  const isFormValid = () => {
    let valid = true;
    setNameValid("");
    setEmailValid("");
    setPhoneValid("");
    if(!isValidName(name)){
      setNameValid("Please input a name.")
      valid = false;
    }
    if(!isValidEmail(email)){
      setEmailValid("Please input a valid email.")
      valid = false;
    }
    if(!isValidPhone(phone)){
      setPhoneValid("Please input a valid phone.")
      valid = false;
    }
    return valid;
  };
  const saveContact = () => {
    //isFormValid function handles checking and user information
    if (!isFormValid()) return;

    fetch("contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: id,
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
      <h1 id="tableLabel">Contact Info</h1>
      <Form className="form">
        <FormInputEntry
          name="Name"
          placeholder="Jhon Doe"
          setter={setName}
          value={name}
          valid={nameValid}
        ></FormInputEntry>
        <FormInputEntry
          name="Email"
          placeholder="jdoe@example.com"
          setter={setEmail}
          value={email}
          valid={emailValid}
        ></FormInputEntry>
        <FormInputEntry
          name="Phone"
          placeholder="(123) 456-7890"
          setter={setPhone}
          value={phone}
          valid={phoneValid}
          type="tel"
        ></FormInputEntry>
        <Button className="btn btn-primary" type="button" onClick={saveContact}>
          Save <FontAwesomeIcon icon={faSave} />
        </Button>
        <Link className="btn btn-secondary" to="/contacts">
          Cancel <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </Form>
    </div>
  );
};

export default AddEditContact;
