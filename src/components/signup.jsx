import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/signup";
import UserForm from "./common/userForm";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
const firebase = require("firebase");

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: "",
    };
  }

  handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!this.isFormValid()) return;
    try {
      const authRes = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      const userObj = { email: authRes.user.email };
      await firebase
        .firestore()
        .collection("users")
        .doc(this.state.email)
        .set(userObj);
      this.props.history.push("/dashboard");
    } catch (ex) {
      console.log(ex);
      this.setState({ signupError: ex.message });
    }
  };

  handleOnChange = (type, e) => {
    const val = e.target.value;
    this.setState({ [type]: val });
  };

  isFormValid = () => {
    const { password, passwordConfirmation } = this.state;
    if (password && passwordConfirmation && password !== passwordConfirmation) {
      this.setState({ signupError: "Passwords do not match!" });
      return false;
    } else {
      this.setState({ signupError: "" });
      return true;
    }
  };

  render() {
    const { classes } = this.props;
    const formComponents = [
      {
        id: "sigup-email-input",
        placeholder: "Enter Your Email",
        type: "email",
        stateVal: "email",
        autoFocus: true,
      },
      {
        id: "sigup-password-input",
        placeholder: "Enter Your Password",
        type: "password",
        stateVal: "password",
      },
      {
        id: "sigup-password-confirm-input",
        placeholder: "Enter Your Password",
        type: "password",
        stateVal: "passwordConfirmation",
      },
    ];
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography components="h1" variant="h5">
            Sign Up
          </Typography>
          <UserForm
            formComponensts={formComponents}
            onChange={this.handleOnChange}
            onSubmit={this.handleOnSubmit}
            submitButtonName="Submit"
            styleClass={classes}
          />
          {this.state.signupError ? (
            <Typography
              components="h1"
              variant="h6"
              className={classes.errorText}
            >
              {this.state.signupError}
            </Typography>
          ) : null}
          <Link className={classes.logInLink} to="/login">
            Already have an account?
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Signup);
