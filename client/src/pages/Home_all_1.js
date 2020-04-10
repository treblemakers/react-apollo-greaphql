import React from "react";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";

import "./Home_all_1.css";
import LogoIndex from "../images/logo/logo-index.png";

import { Icon } from "react-icons-kit";

import { ic_person } from "react-icons-kit/md/ic_person";

const Home_all_1 = () => {
  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "#003171",
          height: "50px",
          padding: "0px 0px 0px 8px"
        }}
      >
        <img src={LogoIndex} height="40" width="40" style={{ float: "left" }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="/"
              style={{
                color: "white",
                paddingTop: "13px",
                paddingLeft: "8px",
                float: "left",
                height: "50px"
              }}
            >
              ระบบจัดการฟาร์ม
            </Nav.Link>
          </Nav>
          <Form inline>
            <Button bsPrefix="nabl-button">
              {" "}
              <Icon icon={ic_person} size="30" />
              เข้าสู่ระบบ
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Home_all_1;
