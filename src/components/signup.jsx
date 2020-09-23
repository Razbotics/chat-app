import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/signup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
    switch (type) {
      case "email":
        this.setState({ email: val });
        break;
      case "password":
        this.setState({ password: val });
        break;
      case "passwordConfirmation":
        this.setState({ passwordConfirmation: val });
        break;
    }
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
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography components="h1" variant="h5">
            Sign Up!
          </Typography>
          <form
            onSubmit={(e) => this.handleOnSubmit(e)}
            className={classes.form}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                autoComplete="email"
                onChange={(e) => this.handleOnChange("email", e)}
                autoFocus
                id="signup-email-input"
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">
                Enter Password
              </InputLabel>
              <Input
                autoComplete="new-password"
                type="password"
                onChange={(e) => this.handleOnChange("password", e)}
                id="signup-password-input"
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">
                Confirm Password
              </InputLabel>
              <Input
                autoComplete="new-password"
                type="password"
                onChange={(e) => this.handleOnChange("passwordConfirmation", e)}
                id="signup-password-confirmation-input"
              ></Input>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
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
