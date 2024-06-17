import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { TextEllipsis } from "../utils/lid";
import { Link } from "react-router-dom";

function ProductCard({ data, handleDelete, handleUpdate, authUser = false }) {
  return (
    <Card style={{ width: "18rem" }}>
      <div></div>
      <Link style={{ textDecoration: "none" }} to={`/details/${data._id}`}>
        <Card.Img
          variant="top"
          src={
            data.image ??
            "https://m.media-amazon.com/images/I/71dwW6Z3IvL._AC_UL320_.jpg"
          }
          style={{ height: "200px", objectFit: "contain" }}
        />
      </Link>
      <Card.Body>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/details/${data._id}`}
        >
          <Card.Title> {TextEllipsis(data.name, 6)}</Card.Title>
          <Card.Text style={{ height: 45, overflow: "clip" }}>
            {TextEllipsis(data.des, 9)}
          </Card.Text>

          <Card.Text
            className="mb-2"
            style={{
              backgroundColor: "#f8f9fa",
              width: "fit-content",
              padding: "2px 10px",
              borderRadius: 10,
            }}
          >
            {data.brand}
          </Card.Text>
          <Card.Title className="mb-2">Price: ₹ {data.price}</Card.Title>
        </Link>

        {/* Used Subtitle for price */}
        <Row>
          {authUser && (
            <Col style={{ display: "flex" }}>
              <Button
                variant="primary"
                className="me-auto"
                onClick={() => handleUpdate(data)}
              >
                Update
              </Button>
              <Button variant="danger" onClick={() => handleDelete(data)}>
                Delete
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
