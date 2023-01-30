import React from "react";
import Navigation from "./Navigation";
import Usuarios from "./Usuarios";

const Layout = () => {
  return (
    <div className="bg-gray">
      <Navigation />
      <Usuarios />
    </div>
  );
};

export default Layout;
