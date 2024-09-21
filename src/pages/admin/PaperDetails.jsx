import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import AddPaperDetails from "../../components/admin/AddPaperDetails";
import {
  useDeletePaperDetailsMutation,
  useGetAllPaperdetailsQuery,
  useUpdatePaperDetailsMutation,
} from "../../slices/adminApiSlice";
import toast from "react-hot-toast";

function PaperDetails() {
  const { data } = useGetAllPaperdetailsQuery();
  const [modalShow, setModalShow] = useState(false);
  const [editingRow, setEditingRow] = useState(null); // Track which row is being edited
  const [updatedPrice, setUpdatedPrice] = useState(""); // Track the updated price
  const [updatePaperDetails] = useUpdatePaperDetailsMutation(); // Hook for updating price
  const [deletePaperDetails] = useDeletePaperDetailsMutation(); // Hook for deleting paper detail

  // Function to handle price update
  const handleSave = async (paperId) => {
    try {
      const res = await updatePaperDetails({
        id: paperId,
        data: { price: updatedPrice },
      }).unwrap();
      if (res.success) {
        toast.dismiss();
        toast.success(res.msg);
      } else {
        toast.dismiss();
        toast.error(res.msg);
      }
      setEditingRow(null); // Exit editing mode
    } catch (error) {
      toast.dismiss();
      toast.error(error?.data?.msg);
      console.log(`Error in Updating paper details ${JSON.stringify(error)}`);
    }
  };

  // Function to handle deletion of paper detail
  const handleDelete = async (paperId) => {
    if (window.confirm("Are you sure you want to delete this paper detail?")) {
      try {
        const res = await deletePaperDetails(paperId).unwrap();
        if (res.success) {
          toast.dismiss();
          toast.success(res.msg);
        } else {
          toast.dismiss();
          toast.error(res.msg);
        }
      } catch (error) {
        toast.dismiss();
        toast.error(error?.data?.msg);
        console.log(`Error in Deleting paper details ${JSON.stringify(error)}`);
      }
    }
  };

  // Function to handle canceling the editing mode
  const handleCancel = () => {
    setEditingRow(null);
    setUpdatedPrice(""); // Clear the updated price
  };

  return (
    <Container>
      <AddPaperDetails show={modalShow} onHide={() => setModalShow(false)} />
      <div className="d-flex justify-content-between my-4">
        <h3>Paper Details</h3>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add more
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Size</th>
            <th>Price</th>
            <th>Action</th> {/* Column for edit/delete actions */}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((d, idx) => (
            <tr key={d._id}>
              <td>{idx + 1}</td>
              <td>{d.type}</td>
              <td>{d.size}</td>
              <td className="text-primary"
                onClick={() => {
                  setEditingRow(d._id);
                  setUpdatedPrice(d.price); // Set current price as initial value
                }}
                style={{ cursor: "pointer" }}
              >
                {editingRow === d._id ? (
                  <input
                    type="number"
                    value={updatedPrice}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                    autoFocus
                  />
                ) : (
                  d.price
                )}
              </td>
              <td>
                {editingRow === d._id ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => handleSave(d._id)}
                      className="me-2"
                    >
                      Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(d._id)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default PaperDetails;
