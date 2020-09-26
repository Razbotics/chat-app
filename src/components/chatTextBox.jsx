import React from "react";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import styles from "../styles/chatTextBox";
import { withStyles } from "@material-ui/core/styles";
const firebase = require("firebase");

class ChatTextBox extends React.Component {
  constructor() {
    super();
    this.state = {
      chatText: "",
    };
  }

  userClickedInput = () => {};

  buildDocKey = (email, friend) => {
    return [email, friend].sort().join(":");
  };

  userTyping = (e) => {
    e.keyCode === 13
      ? this.submitMessage()
      : this.setState({ chatText: e.target.value });
  };

  messageValid = (txt) => {
    return txt && txt.replace(/\s/g, "").length;
  };

  submitMessage = () => {
    const { selectedChatIndex, email, chats } = this.props.dashboardState;
    if (this.messageValid(this.state.chatText)) {
      const friend = chats[selectedChatIndex].users.filter(
        (user) => user !== email
      )[0];
      const docKey = this.buildDocKey(email, friend);
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            sender: email,
            message: this.state.chatText,
            timeStamp: Date.now(),
          }),
          receiverHasRead: false,
        });
      document.getElementById("chattextbox").value = "";
    } else {
      document.getElementById("chattextbox").value = "";
    }
  };

  render() {
    const { classes, dashboardState } = this.props;
    const { selectedChatIndex } = dashboardState;
    return selectedChatIndex !== null ? (
      <div className={classes.chatTextBoxContainer}>
        <TextField
          id="chattextbox"
          placeholder="Type your message ..."
          onKeyUp={(e) => this.userTyping(e)}
          className={classes.chatTextBox}
          onFocus={this.userClickedInput}
        ></TextField>
        <Send onClick={this.submitMessage} className={classes.sendBtn}></Send>
      </div>
    ) : null;
  }
}

export default withStyles(styles)(ChatTextBox);
