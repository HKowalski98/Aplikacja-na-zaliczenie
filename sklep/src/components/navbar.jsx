import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark  bg-dark navbar-expand-lg ">
        <div className="navbar-nav">
          <div>
            <Link to="/" className="navbar-brand">
              SHOP
            </Link>
          </div>
          <div>
            <Link to="/product" className="nav-link">
              PRODUKTY
            </Link>
          </div>
          <div>
            <Link to="/product/create" className="nav-link">
              DODAJ PRODUKT
            </Link>
          </div>
          <div>
            <Link to="/product/edit" className="nav-link">
              EDYTUJ PRODUKT
            </Link>
          </div>
          <div>
            <Link to="/shopOrders" className="nav-link">
              ZAMÓWIENIA
            </Link>
          </div>
          <div>
            <Link to="/order" className="nav-link">
              KOSZYK
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

