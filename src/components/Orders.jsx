import React, { useEffect, useState } from "react";
import {
  Col,
  FloatingLabel,
  Row,
  Form,
  Container,
  InputGroup,
  Button,
} from "react-bootstrap";
import { calculateSheetCost } from "../utils/calcluate";
import moment from "moment";
import { useGetAllPaperdetailsQuery } from "../slices/paperApiSlice";
import "./Orders.css"; // Import your custom CSS file for additional styling
import jsPDF from "jspdf";
import "jspdf-autotable";
import { convertToBanglaNumber } from "../utils/helpers";
import toast from "react-hot-toast";

export default function Orders() {
  const { data } = useGetAllPaperdetailsQuery();
  const [types, setTypes] = useState([]);

  const [formData, setFormData] = useState({
    item_name: "লিফলেট",
    amount: 0,
    colors: 1,
    color_cost: 200,
    paper_type: "70",
    width: 0,
    height: 0,
    width1: 0,
    height1: 0,
    plate_cost: 200,
    compose_cost: 200,
    discount: 0,
    others: 0,
    sheetCost: 0,
    subtotal: 0,
    paid: 0,
    perPage: 0,
    sheetNeeded: 0,
    net_total: 0,
  });

  useEffect(() => {
    const filteredPaper = data?.data
      ?.filter((d) => d.size === `${formData.width1}*${formData.height1}`)
      ?.map((d) => d.type);
    setTypes(filteredPaper);
  }, [formData.width1, formData.height1]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //calculate sheet needed
    const {
      sheetCost = 0,
      perPage = 0,
      sheetNeeded = 0,
    } = calculateSheetCost(
      formData.width,
      formData.height,
      formData.amount,
      formData.width1,
      formData.height1,
      formData.paper_type,
      data?.data
    );

    if (sheetCost === 0) {
      toast.dismiss();
      toast.error("আপনার পেপারের সাইজ অথবা টাইপ চেক করুন");
    }

    setFormData({
      ...formData,
      sheetCost,
      perPage,
      sheetNeeded,
      subtotal:
        sheetCost +
        formData.compose_cost +
        formData.color_cost +
        formData.plate_cost,
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Description", "Amount"];
    const tableRows = [];

    tableRows.push(["Sheet Cost", formData.sheetCost.toFixed(2) + " Tk"]);
    tableRows.push(["Plate Cost", formData.plate_cost + " Tk"]);
    tableRows.push(["Color Cost", formData.color_cost + " Tk"]);
    tableRows.push(["Compose Cost", formData.compose_cost + " Tk"]);
    tableRows.push(["Subtotal Cost", formData.subtotal.toFixed(2) + " Tk"]);
    tableRows.push(["Discount", formData.discount + " Tk"]);
    tableRows.push([
      "Net Total",
      (formData.subtotal - formData.discount).toFixed(2) + " Tk",
    ]);
    tableRows.push(["Paid", formData.paid + " Tk"]);
    tableRows.push([
      "* Due",
      (formData.subtotal - formData.paid).toFixed(2) + " Tk",
    ]);

    // Add header
    doc.setFontSize(18);
    doc.text("Invoice", 14, 15);
    doc.setFontSize(12);
    doc.text(`Date: ${moment().format("DD-MM-YYYY / hh:mm a")}`, 14, 23);

    // Add the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "striped",
    });

    // Add footer
    doc.text(
      `Thanks for your business!`,
      14,
      doc.autoTable.previous.finalY + 10
    );

    doc.save("invoice.pdf");
  };

  return (
    <Container className="order-form-container">
      <form onSubmit={handleSubmit}>
        <Row className="g-2">
          <h6 className="mb-2">
            তারিখ :{" "}
            {convertToBanglaNumber(moment().format("DD-MM-YYYY : hh:mm a"))}
          </h6>

          <Col md>
            <FloatingLabel
              controlId="floatingInputGrid"
              label="অর্ডার নাম"
              className="floating-label"
            >
              <Form.Select
                aria-label="Paper type"
                onChange={handleChange}
                value={formData.item_name}
                name="item_name"
                className="rounded-0 form-select"
              >
                <option value="লিফলেট">লিফলেট</option>
                <option value="পোস্টার">পোস্টার</option>
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col md>
            <FloatingLabel
              controlId="floatingInputGrid"
              label="পরিমাণ"
              className="floating-label"
            >
              <Form.Control
                type="text"
                placeholder="Amount"
                onChange={handleChange}
                name="amount"
                value={formData.amount}
                className="rounded-0 form-control"
              />
            </FloatingLabel>
          </Col>

          <Col sm={12} md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="input-group-text">
                {formData.item_name} সাইজ
              </InputGroup.Text>
              <Form.Control
                placeholder="18"
                name="width"
                onChange={handleChange}
                value={formData.width}
                className="form-control"
              />
              <Form.Control
                placeholder="23"
                name="height"
                onChange={handleChange}
                value={formData.height}
                className="form-control"
              />
            </InputGroup>
          </Col>

          <Col sm={12} md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="input-group-text">
                মূল কাগজের সাইজ
              </InputGroup.Text>
              <Form.Control
                placeholder="25"
                name="width1"
                onChange={handleChange}
                value={formData.width1}
                className="form-control"
              />
              <Form.Control
                placeholder="36"
                name="height1"
                onChange={handleChange}
                value={formData.height1}
                className="form-control"
              />
            </InputGroup>
          </Col>

          <Col md>
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="কাগজের ধরন"
              className="floating-label"
            >
              <Form.Select
                aria-label="Paper type"
                onChange={handleChange}
                value={formData.paper_type}
                name="paper_type"
                className="rounded-0 form-select"
              >
                {types?.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col md>
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="রং"
              className="floating-label"
            >
              <Form.Select
                aria-label="Colors"
                onChange={handleChange}
                value={formData.colors}
                name="colors"
                className="rounded-0 form-select"
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
            <FloatingLabel
              controlId="floatingInputGrid"
              label="প্লেটের খরচ"
              className="floating-label"
            >
              <Form.Control
                type="text"
                placeholder="Plate Cost"
                onChange={handleChange}
                name="plate_cost"
                value={formData.plate_cost}
                className="rounded-0 form-control"
              />
            </FloatingLabel>
          </Col>

          <Col md>
            <FloatingLabel
              controlId="floatingInputGrid"
              label="কম্পোজ  খরচ"
              className="floating-label"
            >
              <Form.Control
                type="text"
                placeholder="Compose Cost"
                onChange={handleChange}
                name="compose_cost"
                value={formData.compose_cost}
                className="rounded-0 form-control"
              />
            </FloatingLabel>
          </Col>

          <Col md>
            <FloatingLabel
              controlId="floatingInputGrid"
              label="রং এর খরচ"
              className="floating-label"
            >
              <Form.Control
                type="text"
                placeholder="Color Cost"
                onChange={handleChange}
                name="color_cost"
                value={formData.color_cost}
                className="rounded-0 form-control"
              />
            </FloatingLabel>
          </Col>

          <Col md>
            <FloatingLabel
              controlId="floatingInputGrid"
              label="ডিসকাউন্ট"
              className="floating-label"
            >
              <Form.Control
                type="text"
                placeholder="Discount"
                onChange={handleChange}
                name="discount"
                value={formData.discount}
                className="rounded-0 form-control"
              />
            </FloatingLabel>
          </Col>
        </Row>

        <div className="d-flex justify-content-center">
          <Button type="submit" className="m-3">
            হিসাব করুন
          </Button>
        </div>

        
          <>
            <Col md={6} className="mx-auto">
              <h6 className="text-center p-2 bg-secondary bg-gradient text-white">
                {convertToBanglaNumber(formData.amount)} {formData.item_name} ,{" "}
                {convertToBanglaNumber(formData.colors)} রং -{" "}
                {convertToBanglaNumber(formData.paper_type)} gsm ,{" "}
                {`${convertToBanglaNumber(
                  formData.width
                )} X ${convertToBanglaNumber(formData.height)}`}
              </h6>
            </Col>
            <table className="table table-bordered order-summary">
              <tbody>
                <tr className="bg-light">
                  <td>প্রতি শীটে ধরে</td>
                  <td>
                    {" "}
                    {convertToBanglaNumber(formData.perPage.toFixed(2))} টি
                  </td>
                </tr>
                <tr className="bg-light">
                  <td>মোট শীট লাগবে</td>
                  <td>
                    {" "}
                    {convertToBanglaNumber(
                      formData.sheetNeeded.toFixed(2)
                    )} ={" "}
                    {convertToBanglaNumber(Math.ceil(formData.sheetNeeded))} টি
                  </td>
                </tr>
                <tr className="bg-info">
                  <td>শীটের খরচ</td>
                  <td>
                    {" "}
                    {convertToBanglaNumber(formData.sheetCost?.toFixed(2))} টাকা
                  </td>
                </tr>
                <tr className="bg-dark text-white">
                  <td>প্লেটের খরচ</td>
                  <td> {convertToBanglaNumber(formData.plate_cost)} টাকা</td>
                </tr>
                <tr className="bg-danger text-white">
                  <td>রং এর খরচ</td>
                  <td> {convertToBanglaNumber(formData.color_cost)} টাকা</td>
                </tr>
                <tr className="bg-primary text-white">
                  <td>কম্পোজ এর খরচ</td>
                  <td> {convertToBanglaNumber(formData.compose_cost)} টাকা</td>
                </tr>
                <tr className="bg-secondary text-white">
                  <td>মোট খরচ</td>
                  <td>
                    {" "}
                    {convertToBanglaNumber(formData.subtotal.toFixed(2))} টাকা
                  </td>
                </tr>
                <tr className="bg-warning">
                  <td>ডিসকাউন্ট</td>
                  <td> {convertToBanglaNumber(formData.discount)} টাকা</td>
                </tr>
                <tr className="bg-success text-white">
                  <td>সর্বমোট</td>
                  <td>
                    {" "}
                    {convertToBanglaNumber(
                      (formData.subtotal - formData.discount)?.toFixed(2)
                    )}{" "}
                    টাকা
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => generatePDF()}
                variant="info"
                type="submit"
              >
                Print
              </Button>
            </div>
          </>
      
      </form>
    </Container>
  );
}
