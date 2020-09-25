import React, { Component } from "react";
import Inbox from "./inbox";
import styles from "../styles/dashboard";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ChatView from "./chatView";
const firebase = require("firebase");

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      chats: [],
    };
  }

  getChats = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push("/login");
        return;
      }
      firebase
        .firestore()
        .collection("chats")
        .where("users", "array-contains", user.email)
        .onSnapshot((res) => {
          const chats = res.docs.map((doc) => doc.data());
          this.setState({
            email: user.email,
            chats: chats,
          });
          console.log(this.state);
        });
    });
  };

  componentDidMount() {
    this.getChats();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  signOut = () => firebase.auth().signOut();

  newChatBtnClicked = () => {
    this.setState({ newChatFormVisible: true, selectedChat: null });
  };

  selectChat = (chatIndex) => {
    this.setState({ selectedChat: chatIndex });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Inbox
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          inboxState={this.state}
        />
        {this.state.newChatFormVisible ? null : <ChatView />}
        <Button className={classes.signOutBtn} onClick={this.signOut}>
          Sign Out
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
