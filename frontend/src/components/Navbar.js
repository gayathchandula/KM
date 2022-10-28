import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Button } from "flowbite-react";
import { useNavigate } from 'react-router-dom' ;

export default function Header(props) {
  const navigate = useNavigate();
  const logout = (e) =>{
    e.preventDefault();
    navigate("/login")
  }
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button onClick={logout} color="failure">Logout</Button>
        <Navbar.Toggle />
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href="/navbars" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        <Navbar.Link href="/navbars">Services</Navbar.Link>
        <Navbar.Link href="/navbars">Pricing</Navbar.Link>
        <Navbar.Link href="/navbars">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
