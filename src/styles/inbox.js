const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 70px)",
    position: "absolute",
    top: "70px",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 1px black",
  },
  listItem: {
    cursor: "pointer",
  },
  unreadMessage: {
    backgroundColor: "#3A4691",
    fontSize: "15px",
    color: "white",
    position: "absolute",
    height: "25px",
    width: "25px",
    top: "35px",
    right: "10px",
  },
});

export default styles;
