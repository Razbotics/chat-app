import React, { Component } from "react";
import styles from "../styles/inbox";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ChatOverview from "./chatOverview";


class Inbox extends Component {

  render() {
    const { classes, selectChatFn, dashboardState } = this.props;

    const { selectedChatIndex, email, chats } = dashboardState;
    return (
      <main className={classes.root}>
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
