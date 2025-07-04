import type React from "react";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="main-title">
        <span className="title-icon">📦</span>
        Order Dashboard
      </h1>
      <p className="subtitle">Manage your orders and track performance</p>
    </header>
  );
};

export default Header;
