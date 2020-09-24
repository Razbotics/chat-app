import React, { Component } from "react";
import styles from "../styles/inbox";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";

class Inbox extends Component {
  newChat = () => {
    console.log("New chat clicked");
  };

  selectChat = (index) => {
    console.log("select chat", index);
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.root}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          className={classes.newChatButton}
          onClick={this.newChat}
        >New Chat</Button>
        <List>
          {this.props.chats.map((_chat, _index) => (
            <div key={_index}>
              <ListItem
                className={classes.listItem}
                onClick={() => this.selectChat(_index)}
                selected={this.props.selectedChatIndex === _index}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp">
                    {
                      _chat.users
                        .filter((_user) => _user !== this.props.userEmail)[0]
                        .split("")[0].toUpperCase()
                    }
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    _chat.users.filter(
                      (_user) => _user !== this.props.userEmail
                    )[0]
                  }
                  secondary={
                    <React.Fragment>
                      <Typography component="span" color="textPrimary">
                        {_chat.messages[
                          _chat.messages.length - 1
                        ].message.substring(0, 30)}
                      </Typography>
                    </React.Fragment>
                  }
                ></ListItemText>
              </ListItem>
              <Divider></Divider>
            </div>
          ))}
        </List>
      </main>
    );
  }
}

export default withStyles(styles)(Inbox);
