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

  render() {
    const {
      classes,
      selectChatFn,
      dashboardState,
    } = this.props;

    const { selectedChatIndex, email, chats } = dashboardState;
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
          {chats.map((chat, index) => (
            <ChatOverview
              key={index}
              chat={chat}
              index={index}
              classes={classes}
              email={email}
              selectedChatIndex={selectedChatIndex}
              selectChatFn={selectChatFn}
            />
          ))}
        </List>
      </main>
    );
  }
}

export default withStyles(styles)(Inbox);
