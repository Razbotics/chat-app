import React from "react";
import { Paper, withStyles, CssBaseline, Typography } from "@material-ui/core";
import styles from "../styles/newChat";
import UserForm from "./common/userForm";
const firebase = require("firebase");

class NewChat extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      newChatrror: "",
    };
  }

  handleOnSubmit = async (e) => {
    e.preventDefault();
    const userExists = await this.usersExists();
    if (!userExists) {
      this.setState({ newChatrror: "Email does not exists" });
      return;
    }
    const chatExists = await this.chatExists();
    chatExists ? this.goToChat() : await this.createChat();
  };

  createChat = async () => {
    const docKey = this.buildDocKey();
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        receiverHasRead: false,
        users: [firebase.auth().currentUser.email, this.state.email],
        messages: [],
      });
    this.goToChat();
  };

  goToChat = () => {
    const { chats } = this.props.dashboardState;
    const chatIndex = chats.findIndex(
      (chat) => chat.users.findIndex((user) => user === this.state.email) >= 0
    );
    this.props.selectChatClicked(chatIndex);
  };

  buildDocKey = () => {
    return [firebase.auth().currentUser.email, this.state.email]
      .sort()
      .join(":");
  };

  chatExists = async () => {
    const dockKey = this.buildDocKey();
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(dockKey)
      .get();
    return chat.exists;
  };

  usersExists = async () => {
    if (firebase.auth().currentUser.email === this.state.email) {
      this.setState({ newChatrror: "Enter others Email" });
      return;
    }
    const userSnapshot = await firebase.firestore().collection("users").get();
    const exists = userSnapshot.docs
      .map((doc) => doc.data().email)
      .includes(this.state.email);
    return exists;
  };

  handleOnChange = (type, e) => {
    const val = e.target.value;
    this.setState({ [type]: val, newChatrror: "" });
  };

  render() {
    const formComponents = [
      {
        id: "new-message-email-input",
        placeholder: "Enter Friends Email",
        type: "email",
        stateVal: "email",
        autoFocus: true,
      },
    ];

    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography components="h1" variant="h5">
            New Chat
          </Typography>
          <UserForm
            formComponensts={formComponents}
            onChange={this.handleOnChange}
            onSubmit={this.handleOnSubmit}
            submitButtonName="Start Chat"
            styleClass={classes}
          />
          {this.state.newChatrror ? (
            <Typography
              components="h1"
              variant="h6"
              className={classes.errorText}
            >
              {this.state.newChatrror}
            </Typography>
          ) : null}
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(NewChat);
