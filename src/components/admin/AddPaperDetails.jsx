import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAddPaperDetailsMutation } from "../../slices/adminApiSlice";
import toast from "react-hot-toast";

function AddPaperDetails(props) {
  const [addPaperDetails] = useAddPaperDetailsMutation();
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addPaperDetails(formData).unwrap();
      if(res.success){
        toast.dismiss();
        toast.success(res.msg)
      }
      else{
        toast.dismiss();
        toast.error(res.msg)
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.data?.msg);
      console.log(`Error in adding paper details ${JSON.stringify(error)}`);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add New</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              onChange={handleChange}
              value={formData.type}
              placeholder="120"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              name="size"
              onChange={handleChange}
              value={formData.size}
              placeholder="20*30"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              onChange={handleChange}
              value={formData.price}
              required
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" variant="secondary" size="lg">
              Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddPaperDetails;
