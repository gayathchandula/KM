import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tabs } from "flowbite-react";
import Assignment from "./assignment";
import Class from "./class";
import Students  from "./register";
import Header from "../../components/Navbar";

export default function Teacher() {
  return (
    <div className="">
      <Header />
      <div className="  w-1/2 justify-center items-center m-auto">
        <Tabs.Group aria-label="Full width tabs" style="fullWidth">
          <Tabs.Item title="Assignment">
            <Assignment />
          </Tabs.Item>
          <Tabs.Item title="Classes">
            <Class />
          </Tabs.Item>
          <Tabs.Item title="Students">
            <Students />
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
}
