import React, { useState } from "react";
import { Navbar, Nav, Button, Form, Modal } from "react-bootstrap";

import "./Home_all_1.css"; //ดึงไฟล์ css มาใช้
import LogoIndex from "../images/logo/logo-index.png";

import { Icon } from "react-icons-kit";

import { ic_person } from "react-icons-kit/md/ic_person";

import Product from './product/porduct'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      bsPrefix="modal-login"
      dialogAs="modal-login"
    >
      <Modal.Body style={{ margin: "auto" }}>
        <img
          src={LogoIndex}
          height="200"
          width="200"
          style={{ margin: "0px 56px 50px 56px" }}
        />

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
            <Form.Control type="text" placeholder="ชื่อผู้ใช้งาน" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>รหัสผ่าน</Form.Label>
            <Form.Control type="password" placeholder="รหัสผ่าน" />
          </Form.Group>

          <Form.Group style={{ float: "right" }}>
            <a href="#">ลืมรหัสผ่าน กดที่นี่</a>
          </Form.Group>

          <Button variant="primary" style={{ width: "100%" }} href="/loginseccess">
            เข้าสู่ระบบ
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "space-between" }}>
        <div>
          หากท่านไม่เป็นสมาชิก <a href="#">กดเพื่อสมัคร</a>
        </div>
        <Button bsPrefix="lo-buttonClose" onClick={props.onHide}>
          ปิด
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Home_all_1 = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="bg-base">
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
            <Button bsPrefix="nabl-button" onClick={() => setModalShow(true)}>
              {" "}
              <Icon icon={ic_person} size="30" />
              เข้าสู่ระบบ
            </Button>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Product/>

    </div>
  );
};

export default Home_all_1;
