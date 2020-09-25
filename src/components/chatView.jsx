import React, { PureComponent } from "react";
import styles from "../styles/chatView";
import { withStyles } from "@material-ui/core/styles";

class ChatView extends PureComponent {
  render() {
    const { classes } = this.props;
    return <div className={classes.content}>Hello From ChatView</div>;
  }
}

export default withStyles(styles)(ChatView);
