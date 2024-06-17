import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import { useModal } from "../ModalContext";
import Modals from "../components/Modal";
import ProductCard from "../components/card";

function ProductList() {
  const [data, setData] = useState([]);
  const { lgShow, handleShow, handleClose } = useModal();

  const [updateDate, setUpdateDate] = useState(null);

  useEffect(() => {
    fetchApi();
  }, [!lgShow]);

  const handleUpdate = async (data) => {
    handleShow();

    setUpdateDate(data);
  };
  const handleDelete = async (data) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/task/delete/${data._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await fetchApi();
    } catch (error) {
      console.error(error);
    }
  };
  const clearUpdataDAta = () => {
    setUpdateDate(null);
  };

  const token = localStorage.getItem("token");
  const fetchApi = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/task/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (
        response.data.allProductDetails &&
        Array.isArray(response.data.allProductDetails)
      ) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const filteredData = response.data.allProductDetails.filter(
          (item) => item.user === userId
        );

        setData(filteredData);
      } else {
        console.error("ProductList is undefined or not an array");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Product list</h1>
      <Row xs={1} md={2} xl={4} className="gy-5 gx-5">
        {data.length > 0 ? (
          <>
            {data.map((item, index) => (
              <Col key={index}>
                <ProductCard
                  authUser={true}
                  data={item}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              </Col>
            ))}
          </>
        ) : (
          <p
            style={{
              width: 500,
              height: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 300,
            }}
          >
            No products found.
          </p>
        )}
      </Row>
      <Modals
        updateDate={updateDate}
        lgShow={lgShow}
        handleShow={handleShow}
        handleClose={handleClose}
        clearUpdataDAta={clearUpdataDAta}
      />
    </div>
  );
}

export default ProductList;
