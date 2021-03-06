import React, { PureComponent } from "react";
import styles from "../styles/chatView";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import Avatar from "@material-ui/core/Avatar";

class ChatView extends PureComponent {
  componentDidUpdate = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };

  componentDidMount = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };

  getMessageClass = (senderEmail, email) => {
    return senderEmail === email
      ? this.props.classes.userSent
      : this.props.classes.friendSent;
  };

  render() {
    const { classes, backBtnClick, dashboardState } = this.props;
    const { selectedChatIndex, email, chats } = dashboardState;

    return selectedChatIndex !== null ? (
      <div>
        <div className={classes.chatHeader}>
          <Button onClick={backBtnClick} size="large" className={classes.backBtn}>
            <ArrowBackRoundedIcon className={classes.backIcon} />
          </Button>
          <div className={classes.chatUser}>
            {chats[selectedChatIndex].users.filter((user) => user !== email)[0]}
          </div>
          <Avatar className={classes.avatar} alt="Remy Sharp">
            {chats[selectedChatIndex].users
              .filter((user) => user !== email)[0]
              .split("")[0]
              .toUpperCase()}
          </Avatar>
        </div>
        <main id="chatview-container" className={classes.content}>
          {chats[selectedChatIndex].messages.map((msg, index) => (
            <div
              key={index}
              className={this.getMessageClass(msg.sender, email)}
            >
              {msg.message}
            </div>
          ))}
        </main>
      </div>
    ) : null;
  }
}

export default withStyles(styles)(ChatView);
