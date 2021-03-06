import React, { useState } from "react";
// import React from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Pagination,
} from "react-bootstrap";
// import Pagination from "react-bootstrap/Pagination";
import { FaList } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import Slider from "rc-slider";
import "../../../node_modules/rc-slider/assets/index.css";
import { ProductStarsRatings, ReviewSold, WishList } from "../product/product";
import { Link } from "react-router-dom";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

function ShowProducts({
  products,
  addCarts,
  searchQuery,
  filterNow,
  setfilterNow,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setpriceFilter] = useState([0, 2000]);
  const [confirmFilter, setconfirmFilter] = useState([0, 2000]);

  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filterQuery = (product) => {
    return (
      product.price.raw >= priceFilter[0] &&
      product.price.raw <= priceFilter[1] &&
      product.name.toLowerCase().match(searchQuery.toLowerCase())
    );
  };
  const productsOnPage =
    filterNow &&
    products.filter((product) => {
      return filterQuery(product);
    });
  // Filter Products By Price
  const currentProducts =
    filterNow &&
    products
      .filter((product) => {
        return filterQuery(product);
      })
      .slice(indexOfFirstPost, indexOfLastPost);

  const productsViewing = currentProducts.length;

  const pagesNumber = Math.ceil(productsOnPage.length / postsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const CategoriesFilter = () => (
    <div className="categories">
      <h6 className="fw-bold mb-4">All Categories</h6>
      <div className="categories-filter">
        <p className="mb-2">
          Computer & Laptop{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (25)
          </Badge>
        </p>
        <p className="mb-2">
          Mobile & Tablet{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (06)
          </Badge>
        </p>
        <p className="mb-2">
          Camera{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (12)
          </Badge>
        </p>
        <p className="mb-2">
          TV & Smart Box{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (04)
          </Badge>
        </p>
        <p className="mb-2">
          Home Appliance{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (31)
          </Badge>
        </p>
        <p className="mb-2">
          Other Categories{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (03)
          </Badge>
        </p>
        <p className="mb-2">
          Computer & Laptop{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (25)
          </Badge>
        </p>
        <p className="mb-2">
          Mobile & Tablet{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (06)
          </Badge>
        </p>
        <p className="mb-2">
          Camera{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (12)
          </Badge>
        </p>
        <p className="mb-2">
          TV & Smart Box{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (04)
          </Badge>
        </p>
        <p className="mb-2">
          Home Appliance{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (31)
          </Badge>
        </p>
        <p className="mb-2">
          Other Categories{" "}
          <Badge bg="white" className="text-black-50 px-0">
            (03)
          </Badge>
        </p>
      </div>
      <hr className="my-4" />
    </div>
  );

  // =========================:Search Result Section:===============================

  const ViewingProducts = () =>
    filterNow && (
      <p className="text-black-50 small mb-0">
        Viewing <span className="text-black">{productsViewing}</span> of{" "}
        <span className="text-black">{productsOnPage.length}</span> products
      </p>
    );

  const SortBy = () =>
    filterNow && (
      <>
        <Button variant="link">
          <FaList />
        </Button>
        <Button variant="link">
          <IoGridSharp />
        </Button>
        <Row>
          <Form.Label column="sm" md="auto" className="text-black-50">
            Sort by
          </Form.Label>
          <Col>
            <Form.Select size="sm">
              <option value="new">Newest Items</option>
              <option value="old">Oldest Items</option>
              <option value="high">High Price</option>
              <option value="low">Low Price</option>
            </Form.Select>
          </Col>
        </Row>
      </>
    );

  const ListViewProduct = () => (
    <>
      {filterNow ? (
        currentProducts.map(
          (product, key) =>
            key <= postsPerPage && (
              <Col sm="12" className="p-4 border" key={key}>
                <div className="d-flex align-items-center">
                  <Image
                    src={product.image.url}
                    alt={product.name}
                    className="img_products_search"
                  />
                  <div className="ms-4">
                    <div className="d-flex align-items-center mb-4">
                      <ProductStarsRatings />
                      <ReviewSold />
                    </div>
                    <Row className="align-items-end row">
                      <Col md="8">
                        <h5 className="fw-bold lh-base mb-4">
                          <Link
                            to={"/product/" + product.id}
                            className="text-decoration-none"
                          >
                            {product.name}
                          </Link>
                        </h5>
                        <div
                          className="text-black-50 fw-normal truncate-500"
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        ></div>
                        <Button
                          variant="primary"
                          className="px-4"
                          onClick={() => addCarts(product.id, 1)}
                        >
                          Add to Cart
                        </Button>
                      </Col>
                      <Col md="4" className="text-end">
                        <h5 className="text-black-50 text-decoration-line-through">
                          $39.99
                        </h5>
                        <h3 className="text-primary mb-4">
                          {product.price.formatted_with_symbol}
                        </h3>
                        <WishList />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            )
        )
      ) : (
        <div className="text-center">
          <h1>Oops, sorry!</h1>{" "}
          <p>
            The product you are looking for is currently unavailable or try to
            search using other keywords
          </p>{" "}
        </div>
      )}
    </>
  );

  let items = [];
  for (let number = 1; number <= pagesNumber; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const PaginationButtons = () => (
    <div className="d-flex justify-content-center mt-5">
      <Pagination>{items}</Pagination>
    </div>
  );

  const SearchReasult = () => (
    <>
      <Row className="mb-4">
        <Col>
          <ViewingProducts />
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <SortBy />
        </Col>
      </Row>
      <Row className="gap-y-20">
        <ListViewProduct />
      </Row>
      <PaginationButtons />
    </>
  );

  // =========================:Main Section:===============================

  return (
    <Container className="py-5">
      <Row>
        {/* FILTER LEFT BAR */}
        <Col md="3">
          <Card>
            <Card.Body>
              <CategoriesFilter />
              <h6 className="mb-3">Filter by Price</h6>
              <Range
                min={0}
                max={2000}
                defaultValue={[0, 2000]}
                tipFormatter={(value) => `$${value}`}
                step={100}
                onChange={(value) => setconfirmFilter(value)}
                className="mb-3"
                value={confirmFilter}
              />
              <p className="text-black-50 small mb-0">
                Price:{" "}
                <span className="text-black">
                  {"$"}
                  {priceFilter[0]} - {"$"}
                  {priceFilter[1]}
                </span>
              </p>
              <hr className="my-4" />
              <div className="d-grid mx-5">
                <Button
                  variant="primary"
                  className="mb-3"
                  onClick={() => setpriceFilter(confirmFilter)}
                >
                  Filter
                </Button>
                <Button
                  variant="link"
                  className="text-primary text-decoration-none"
                >
                  Reset Filter
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* RIGHT BAR SEARCH RESULTS */}
        <Col md="9">
          <SearchReasult />
        </Col>
      </Row>
    </Container>
  );
}

export default ShowProducts;
