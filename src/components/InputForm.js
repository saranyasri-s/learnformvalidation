import React from "react";
import classes from "./InputForm.module.css";
function InputForm() {
  return (
    <>
      <div className={classes.background}></div>
      <form className={classes.InputForm}>
        <div className={classes.formHeader}>
          <h3>Form Validation</h3>
        </div>
        <p>Name</p>
        <input type="text"></input>
        <p>Email</p>
        <input type="email"></input>
        <div className={classes.buttonContainer}>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
}

export default InputForm;
