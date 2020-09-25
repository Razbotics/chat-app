import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";

function ChatOverview({
  chat,
  index,
  classes,
  email,
  selectedChatIndex,
  selectChatFn,
}) {
  return (
    <React.Fragment>
      <ListItem
        className={classes.listItem}
        onClick={() => selectChatFn(index)}
        selected={selectedChatIndex === index}
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp">
            {chat.users
              .filter((user) => user !== email)[0]
              .split("")[0]
              .toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={chat.users.filter((user) => user !== email)[0]}
          secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                {chat.messages[chat.messages.length - 1].message.substring(
                  0,
                  25
                ) + " ..."}
              </Typography>
            </React.Fragment>
          }
        ></ListItemText>
      </ListItem>
      <Divider></Divider>
    </React.Fragment>
  );
}

export default ChatOverview;
