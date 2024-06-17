import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailsPage() {
  const [data, setData] = useState({});
  let { id } = useParams();
  console.log(data);
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/task/product/${id}`
        );
        setData(res.data.ProductDeatils);
      } catch (err) {
        console.error(err);
      }
    };
    getProductDetails();
  }, [id]);

  return (
    <div className="container">
      <h1 style={{ marginTop: 50 }}>Product Details</h1>
      {data ? (
        <div
          style={{
            height: 400,
            backgroundColor: "#f6f1d5",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: 20,
              gap: 40,
            }}
          >
            <div style={{}}>
              {" "}
              <img
                src={data.image}
                style={{ objectFit: "contain", marginLeft: 50, width: 200 }}
              />
            </div>
            {/* <img
              src="https://m.media-amazon.com/images/I/71dwW6Z3IvL._AC_UL320_.jpg"
              style={{ objectFit: "cover", marginLeft: 50 }}
            />{" "} */}

            <div
              style={{ width: "100%", marginTop: "auto", marginBottom: "auto" }}
            >
              <h4>
                Name: <span style={{}}>{data.name}</span>{" "}
              </h4>
              <h4>
                Description: <span style={{ fontSize: 18 }}>{data.des}</span>{" "}
              </h4>
              <h4>
                Brand: <span style={{}}>{data.brand}</span>{" "}
              </h4>
              <h4>
                Price: <span style={{}}>₹ {data.price}</span>{" "}
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DetailsPage;
