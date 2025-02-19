import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2025 SynchroFest | The Future of Music</p>
    </footer>
  );
};

const styles = {
  footer: {
    fontSize: "0.8rem",
    background: "#240046",
    color: "#00F0FF",
    textAlign: "center",
    padding: "45px 15px 100px 15px",
    fontFamily: "'Audiowide', cursive",
  },
};

export default Footer;
