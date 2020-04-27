import React from "react";

import { Table } from "react-bootstrap";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_PRODUCTS = gql`
  {
    products {
      name
      description
      price
      createdAt
    }
  }
`;

function Product() {
  const { loading, error, data } = useQuery(GET_PRODUCTS,{pollInterval:5});
  console.log(data)

  if (loading) return "Loading...";
  if (error) return `Error!`;

  return (
    <div>
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ width: "600px", margin: "auto auto" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Discription</th>
            <th>Price</th>
            <th>CreateDate</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map(product => (
            <tr>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Product;
