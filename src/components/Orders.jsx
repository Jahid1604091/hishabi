import React, { useState } from "react";
import {
  Col,
  FloatingLabel,
  Row,
  Form,
  Container,
  InputGroup,
} from "react-bootstrap";
import { calculateSheetCost } from "../utils/calcluate";
import moment from "moment";

export default function Orders() {
  const [formData, setFormData] = useState({
    item_name: "leaflet",
    amount: 0,
    colors: 1,
    color_cost: 200,
    paper_type: "70",
    width: 0,
    height: 0,
    width1: 0,
    height1: 0,
    plate_cost: 100,
    compose_cost: 100,
    discount: 0,
    others: 0,
    sheetCost: 0,
    total: 0,
    paid: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //calculate sheet needed
    const sheetCost = calculateSheetCost(
      formData.width,
      formData.height,
      formData.amount,
      formData.width1,
      formData.height1,
      formData.paper_type
    );

    setFormData({
      ...formData,
      sheetCost: sheetCost,
      total:
        sheetCost +
        formData.compose_cost +
        formData.plate_cost -
        formData.discount,
    });

    console.log(formData);
  };

  return (
    <Container>
      <form action="" onSubmit={handleSubmit}>
        <Row className="g-2 my-4">
          <h6> তারিখ : {moment().format("DD-MM-YYYY / hh:mm a")}</h6>
          <h5 className="text-capitalize">
            {" "}
            অর্ডার ধরন : {formData.item_name}
          </h5>
          <h6>রং : {formData.colors}</h6>
          <h6>কাগজের ধরন : {formData.paper_type}</h6>
          <hr />

          <table>
            <tbody>
              <tr>
                <td>শীটের খরচ</td> <td> = {formData.sheetCost} টাকা</td>
              </tr>

              <tr>
                <td className="py-4">
                  <h5> মোট খরচ</h5>
                </td>
                <td className="py-4">
                  <h5>
                    = <span className="text-info">{formData.total} টাকা</span>
                  </h5>
                </td>
              </tr>
              <tr>
                <td>*ডিসকাউন্ট</td>{" "}
                <td className="text-danger"> = {formData.discount} টাকা </td>
              </tr>
              <tr>
                <td>
                  <h6> মোট জমা</h6>
                </td>
                <td>
                  <h6>
                    = <span>{formData.paid} টাকা</span>
                  </h6>
                </td>
              </tr>
              <tr className="text-danger">
                <td>
                  <h5>* মোট বাকি</h5>
                </td>
                <td>
                  <h5>
                    = <span>{formData.total - formData.paid} টাকা</span>
                  </h5>
                </td>
              </tr>
            </tbody>
          </table>

          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="অর্ডার নাম">
              <Form.Select
                aria-label="Paper type"
                onChange={handleChange}
                value={formData.item_name}
                name="item_name"
              >
                <option value="leaflet">লিফলেট</option>
                <option value="poster">পোস্টার</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="পরিমাণ">
              <Form.Control
                type="text"
                placeholder="Amount"
                onChange={handleChange}
                name="amount"
                value={formData.amount}
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingSelectGrid" label="কাগজের ধরন">
              <Form.Select
                aria-label="Paper type"
                onChange={handleChange}
                value={formData.paper_type}
                name="paper_type"
              >
                <option value="70">৭০ gsm</option>
                <option value="80">৮০ gsm</option>
                <option value="art">আর্ট পেপার</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingSelectGrid" label="রং">
              <Form.Select
                aria-label="Colors"
                onChange={handleChange}
                value={formData.colors}
                name="colors"
              >
                <option value="1">১</option>
                <option value="2">২</option>
                <option value="3">৩</option>
                <option value="4">৪</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="g-2 my-4">
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="প্লেটের খরচ">
              <Form.Control
                type="text"
                placeholder="Plate Cost"
                onChange={handleChange}
                name="plate_cost"
                value={formData.plate_cost}
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="ছাপার  খরচ">
              <Form.Control
                type="text"
                placeholder="Compose Cost"
                onChange={handleChange}
                name="compose_cost"
                value={formData.compose_cost}
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="রং এর খরচ">
              <Form.Control
                type="text"
                placeholder="Color Cost"
                onChange={handleChange}
                name="color_cost"
                value={formData.color_cost}
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="ডিসকাউন্ট">
              <Form.Control
                type="text"
                placeholder="Discount"
                onChange={handleChange}
                name="discount"
                value={formData.discount}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="text-capitalize">
                {formData.item_name} সাইজ
              </InputGroup.Text>
              <Form.Control
                placeholder="18"
                name="width"
                onChange={handleChange}
                value={formData.width}
              />
              <Form.Control
                placeholder="23"
                name="height"
                onChange={handleChange}
                value={formData.height}
              />
            </InputGroup>
          </Col>
          <Col sm={12} md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text>মূল কাগজের সাইজ</InputGroup.Text>
              <Form.Control
                placeholder="23"
                name="width1"
                onChange={handleChange}
                value={formData.width1}
              />
              <Form.Control
                placeholder="36"
                name="height1"
                onChange={handleChange}
                value={formData.height1}
              />
            </InputGroup>
          </Col>

          <Col sm={12} md={6} lg={3}>
            <FloatingLabel controlId="floatingInputGrid" label="জমা">
              <Form.Control
                type="text"
                placeholder="Color Cost"
                onChange={handleChange}
                name="paid"
                value={formData.paid}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>
        <div className="text-center p-2">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </Container>
  );
}
