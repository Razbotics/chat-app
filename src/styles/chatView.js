const styles = (theme) => ({
  content: {
    height: "calc(100vh - 100px)",
    overflow: "auto",
    padding: "25px",
    marginLeft: "300px",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "70px",
    width: "calc(100% - 300px)",
    position: "absolute",
  },

  userSent: {
    float: "right",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#3A4691",
    color: "white",
    minWidth: "300px",
    maxWidth: "500px",
    borderRadius: "10px",
  },

  friendSent: {
    float: "left",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#707BC4",
    color: "white",
    minWidth: "300px",
    maxWidth: "500px",
    borderRadius: "10px",
  },

  chatHeader: {
    width: "calc(100% - 301px)",
    height: "70px",
    backgroundColor: "#344195",
    position: "fixed",
    marginLeft: "301px",
    boxSizing: "border-box",
  },

  chatUser: {
    backgroundColor: "#344195",
    position: "fixed",
    marginTop: "25px",
    marginLeft: "70px",
    fontSize: "18px",
    textAlign: "center",
    color: "white",
    boxSizing: "border-box",
  },

  avatar: {
    marginTop: "10px",
    marginLeft: "10px",
    height: "50px",
    width: "50px",
  },
});

export default styles;
