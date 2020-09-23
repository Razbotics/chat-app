import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserForm from "../common/userForm";
import styles from "../styles/login";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
const firebase = require("firebase");

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: "",
    };
  }

  handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (ex) {}
  };

  handleOnChange = (type, e) => {
    const val = e.target.value;
    this.setState({ [type]: val });
  };

  render() {
    const { classes } = this.props;
    const formComponents = [
      {
        id: "login-email-input",
        placeholder: "Enter Your Email",
        type: "email",
        stateVal: "email",
        autoFocus: true,
      },
      {
        id: "login-password-input",
        placeholder: "Enter Your Password",
        type: "password",
        stateVal: "password"
      },
    ];

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography components="h1" variant="h5">
            Login!
          </Typography>
          <UserForm
            formComponensts={formComponents}
            onChange={this.handleOnChange}
            onSubmit={this.handleOnSubmit}
            submitButtonName="Login"
            styleClass={classes}
          />
          {this.state.loginError ? (
            <Typography
              components="h1"
              variant="h6"
              className={classes.errorText}
            >
              {this.state.loginError}
            </Typography>
          ) : null}
          <Link className={classes.logInLink} to="/signup">
            Sign up!
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Login);
