import React from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../features/slices/ProductSlice";

function AdminDashboard() {
  const products = useSelector(selectProducts);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Variants</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>
                <ul className="list-unstyled">
                  {product.variants.map((variant, index) => (
                    <>
                      <li>name: {variant.name}</li>
                      <li key={index}>amount: {variant.amount}</li>
                    </>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
