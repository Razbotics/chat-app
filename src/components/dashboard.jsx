import React, { Component } from "react";
import Inbox from "./inbox";
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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) this.props.history.push("/login");
      else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _usr.email)
          .onSnapshot(async (res) => {
            const chats = res.docs.map((_doc) => _doc.data());
            await this.setState({
              email: _usr.email,
              chats: chats,
            });
            console.log(this.state);
          });
      }
    });
  }

  newChatBtnClicked = () => {
    this.setState({ newChatFormVisible: true });
  };

  selectChat = (chatIndex) => {
    console.log("Selected a chat", chatIndex);
  };

  render() {
    return (
      <div>
        <div>Hello World From Dashboard</div>
        <Inbox
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          state={this.state}
        />
      </div>
    );
  }
}

export default Dashboard;
