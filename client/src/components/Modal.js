import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

function Modals({ lgShow, handleClose, updateDate, clearUpdataDAta }) {
  const [data, setData] = useState({
    name: "",
    price: "",
    des: "",
    brand: "",
    image: "",
  });

  useEffect(() => {
    // Ensure updateDate is defined before setting state
    if (updateDate) {
      setData({
        name: updateDate.name,
        brand: updateDate.brand,
        des: updateDate.des,
        image: updateDate.image,
        price: updateDate.price,
      });
    }
  }, [updateDate]);

  const [resData, setResData] = useState({ status: "", message: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const clearData = () => {
    setData({ name: "", brand: "", des: "", image: "", price: "" });
    setResData({ message: "", status: "" });
    handleClose();
    setValidated(false);
    setShowAlert(false);
    updateDate && clearUpdataDAta();
  };

  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setShowAlert(true);
      return;
    }

    setLoading(true);

    try {
      await axios
        .post("http://localhost:8000/api/task/create", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 201) {
            setResData({
              status: 201,
              message: "Product Created successfully",
            });

            setTimeout(() => {
              setLoading(false);
              clearData();
            }, 1000);
          }
        });
    } catch (error) {
      console.log(error);
      console.log(token);
      setLoading(false);
      setResData({
        status: 500,
        message: "Something went wrong",
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setValidated(true);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setShowAlert(true);
      return;
    }

    setLoading(true);

    try {
      await axios
        .put(`http://localhost:8000/api/task/update/${updateDate._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setResData({
              status: 201,
              message: "Product Updated successfully",
            });
            setTimeout(() => {
              setLoading(false);
              clearData();
            }, 1000);
          }
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setResData({
        status: 500,
        message: "Something went wrong",
      });
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => {
          handleClose();
          clearData();
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {updateDate ? "Update Product" : "Create Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {resData.status &&
              (resData.status === 201 ? (
                <Alert variant="success" dismissible>
                  {resData.message}
                </Alert>
              ) : (
                <Alert variant="danger" dismissible>
                  {resData.message}
                </Alert>
              ))}
            {!resData.status && showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                Please fill out all fields.
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                placeholder="Mobile..."
                required
              />
              <Form.Control.Feedback type="invalid">
                Product name is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="des"
                value={data.des}
                onChange={handleInputChange}
                placeholder="Product description..."
                required
              />
              <Form.Control.Feedback type="invalid">
                Product description is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={data.price}
                onChange={handleInputChange}
                min={0}
                placeholder="₹ 299"
                required
              />
              <Form.Control.Feedback type="invalid">
                Product price is required and should be a non-negative number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productBrand">
              <Form.Label>Product Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={data.brand}
                onChange={handleInputChange}
                placeholder="Samsung..."
                required
              />
              <Form.Control.Feedback type="invalid">
                Product brand is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productImage">
              <Form.Label>Product Image Link</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={data.image}
                onChange={handleInputChange}
                placeholder="http://placeimg.com/640/480/sample"
                required
              />
              <Form.Control.Feedback type="invalid">
                Product image link is required.
              </Form.Control.Feedback>
            </Form.Group>
            {updateDate ? (
              <Button onClick={(e) => handleUpdate(e)} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Update"}
              </Button>
            ) : (
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Create"}
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modals;
