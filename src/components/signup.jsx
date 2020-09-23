import React, { Component } from "react";
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
  handleOnSubmit = (e) => {
    console.log("SUBMITTED");
  };

  handleOnChange = (type, e) => {
    console.log(type, e);
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography components="h1" variant="h5">
            {" "}
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
              {" "}
              Submit{" "}
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Signup);
