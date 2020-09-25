const styles = (theme) => ({
  sendBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },
  },

  chatTextBoxContainer: {
    position: "absolute",
    bottom: "15px",
    left: "315px",
    boxSizing: "border-box",
    overflow: "auto",
    width: "calc(100% - 300px - 50px)",
    height: "50px",
    backgroundColor: "#d3d4db",
    borderRadius: "10px",
    padding: "10px",
  },

  chatTextBox: {
    width: "calc(100% - 40px)",
    height: "20px",
    marginRight: "10px"
  },
});

export default styles;
