import React from "react";

const Header = ({ title }) => {
  //inline css
  //   const headerStyle = {
  //     backgroundColor: "royalblue",
  //     color: "#fff",
  //   };
  return (
    // <header style={headerStyle}>
    //   <h1>Groceries List</h1>
    // </header>

    <header>
      <h1>{title}</h1>
    </header>
  );
};

Header.defaultProps = {
  title: "List",
};

export default Header;
