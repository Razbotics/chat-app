import React, { Component } from "react";
import styles from "../styles/inbox";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ChatOverview from "./chatOverview";

class Inbox extends Component {
  newChat = () => {
    console.log("New chat clicked");
    this.props.newChatBtnFn()
  };

  selectChat = (index) => {
    console.log("selected chat", index);
    this.props.selectChatFn(index)
  };

  render() {
    const {
      classes,
      inboxState,
    } = this.props;

    return (
      <main className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.newChatButton}
          onClick={this.newChat}
        >
          New Message
        </Button>
        <List>
          {inboxState.chats.map((chat, index) => (
            <ChatOverview
              key={index}
              chat={chat}
              index={index}
              classes={classes}
              email={inboxState.email}
              selectedChatIndex={index}
              selectChatFn={this.selectChat}
            />
          ))}
        </List>
      </main>
    );
  }
}

export default withStyles(styles)(Inbox);
