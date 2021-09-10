import React, { useState } from "react";
import classes from "./InputForm.module.css";
function InputForm() {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [nameValid, setNameValid] = useState(true);

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const formIsValid = emailTouched && emailValid && nameValid && nameTouched;

  const nameChangeHandler = (event) => {
    setNameTouched(true);
    const inputName = event.target.value;
    setName(event.target.value);
    if (inputName.trim().length <= 0) {
      setNameValid(false);
    }
    if (inputName.trim().length > 0) {
      setNameValid(true);
    }
  };

  const nameBlurHandler = () => {
    setNameTouched(true);
    if (name.trim().length <= 0) {
      setNameValid(false);
    }
  };
  const emailBlurHandler = () => {
    setEmailTouched(true);
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const emailChangeHandler = (event) => {
    setEmailTouched(true);
    const newEmail = event.target.value;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (newEmail.match(validRegex)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }

    setEmail(event.target.value);
  };

  const personSubmitHandler = async (e) => {
    e.preventDefault();
    const newPerson = { name: name, email: email };

    const response = await fetch(
      "https://inputform-1030b-default-rtdb.firebaseio.com/persons.json",
      { method: "post", body: JSON.stringify(newPerson) }
    );

    const data = await response.json();

    console.log(data);
    setName("");
    setEmail("");
    setNameTouched(false);
    setEmailTouched(false);
  };

  return (
    <>
      <div className={classes.background}></div>
      <form onSubmit={personSubmitHandler} className={classes.InputForm}>
        <div className={classes.formHeader}>
          <h3>Form Validation</h3>
        </div>
        <p>Name</p>
        <input
          className={!nameValid ? classes["invalid"] : null}
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          type="text"
        ></input>
        {!nameValid && (
          <p className={classes.errorMessage}> *Name input cannot be empty</p>
        )}
        <p>Email</p>
        <input
          className={!emailValid ? classes["invalid"] : null}
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="email"
        ></input>
        {!emailValid && (
          <p className={classes.errorMessage}> *Enter Valid email</p>
        )}
        <div className={classes.buttonContainer}>
          <button disabled={!formIsValid ? "true" : null}>Submit</button>
        </div>
      </form>
    </>
  );
}

export default InputForm;
