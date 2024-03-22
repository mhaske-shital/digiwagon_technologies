import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProduct } from "../features/slices/ProductSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function UserDashboard() {
  const [productImage, setProductImage] = useState(null);
  const [variants, setVariants] = useState([{ name: "", amount: "" }]);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productImage: null,
      variants: [{ name: "", amount: "" }],
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Product Name is required"),
      productDescription: Yup.string().required(
        "Product Description is required"
      ),
      productImage: Yup.mixed().required("Product Image is required"),
      variants: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required("Variant Name is required"),
            amount: Yup.number().required("Variant Amount is required"),
          })
        )
        .min(1, "At least one variant is required"),
    }),
    onSubmit: (values) => {
      console.log(values, productImage);
      const formData = {
        productName: values.productName,
        productDescription: values.productDescription,
        productImage: productImage,
        variants: values.variants,
      };
      dispatch(addProduct(formData));
      formik.resetForm();
      setProductImage(null);
      setVariants([{ name: "", amount: "" }]);
      formik.setFieldValue("productImage", null);
      toast.success("Product added successfully!");
    },
  });

  const handleImageChange = (e) => {
    console.log("e.target.files", productImage);
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
      formik.setFieldValue("productImage", file);
    }
  };

  const handleVariantChange = (index, key, value) => {
    const newVariants = [...variants];
    newVariants[index][key] = value;
    setVariants(newVariants);
    formik.setFieldValue("variants", newVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { name: "", amount: "" }]);
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={formik.values.productName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.productName && formik.errors.productName && (
            <div className="text-danger">{formik.errors.productName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Product Description:
          </label>
          <textarea
            id="productDescription"
            className="form-control"
            value={formik.values.productDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.productDescription &&
            formik.errors.productDescription && (
              <div className="text-danger">
                {formik.errors.productDescription}
              </div>
            )}
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Product Image:
          </label>
          <input
            type="file"
            id="productImage"
            className="form-control"
            onChange={handleImageChange}
          />
          {formik.touched.productImage && formik.errors.productImage && (
            <div className="text-danger">{formik.errors.productImage}</div>
          )}

          {productImage && (
            <div className="mt-2">
              <img
                src={productImage}
                alt="Product Preview"
                style={{ maxWidth: "60%", height: "30%" }}
              />
            </div>
          )}
        </div>
        <div className="mb-3">
          <h3>Variants:</h3>
          {variants.map((variant, index) => (
            <div key={index} className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  placeholder="Variant Name"
                  className="form-control"
                  value={variant.name}
                  onChange={(e) =>
                    handleVariantChange(index, "name", e.target.value)
                  }
                />
                {formik.touched.variants &&
                  formik.errors.variants &&
                  formik.errors.variants[index] &&
                  formik.errors.variants[index].name && (
                    <div className="text-danger">
                      {formik.errors.variants[index].name}
                    </div>
                  )}
              </div>
              <div className="col">
                <input
                  type="text"
                  placeholder="Variant Amount"
                  className="form-control"
                  value={variant.amount}
                  onChange={(e) =>
                    handleVariantChange(index, "amount", e.target.value)
                  }
                />
                {formik.touched.variants &&
                  formik.errors.variants &&
                  formik.errors.variants[index] &&
                  formik.errors.variants[index].amount && (
                    <div className="text-danger">
                      {formik.errors.variants[index].amount}
                    </div>
                  )}
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddVariant}
          >
            Add Variant
          </button>
        </div>
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserDashboard;
