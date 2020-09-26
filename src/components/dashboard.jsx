import React, { Component } from "react";
import Inbox from "./inbox";
import styles from "../styles/dashboard";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChatView from "./chatView";
import ChatTextBox from "./chatTextBox";
import NewChat from "./newChat";
const firebase = require("firebase");

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      selectedChatIndex: null,
      newChatFormVisible: true,
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
    this.setState({ newChatFormVisible: true, selectedChatIndex: null });
  };

  selectChatClicked = async (chatIndex) => {
    const chat = this.state.chats[chatIndex];
    const friend = chat.users.filter((user) => user !== this.state.email)[0];
    const docKey = [this.state.email, friend].sort().join(":");
    if (chat.messages.length) {
      if (chat.messages[chat.messages.length - 1].sender !== this.state.email)
        await firebase
          .firestore()
          .collection("chats")
          .doc(docKey)
          .update({ receiverHasRead: true });
    }
    this.setState({ newChatFormVisible: false, selectedChatIndex: chatIndex });
  };

  backBtnClick = () => {
    this.setState({ newChatFormVisible: true, selectedChatIndex: null });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.header}>
          <div className={classes.textHeader}>Chat App</div>
          <Fab
            size="small"
            className={classes.signOutBtn}
            onClick={this.signOut}
          >
            <ExitToAppIcon />
          </Fab>
        </div>
        <Inbox
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChatClicked}
          dashboardState={this.state}
        />
        {this.state.newChatFormVisible ? null : (
          <ChatView
            dashboardState={this.state}
            backBtnClick={this.backBtnClick}
          />
        )}
        <Fab
          className={classes.newChatBtn}
          onClick={this.newChatBtnClicked}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        {this.state.newChatFormVisible ? (
          <NewChat
            dashboardState={this.state}
            selectChatClicked={this.selectChatClicked}
          />
        ) : null}
        {this.state.newChatFormVisible ? null : (
          <ChatTextBox dashboardState={this.state} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
