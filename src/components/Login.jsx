import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/slices/LoginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginStatus, setloginStatus] = useState("");
  const appDispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const admins = useSelector((state) => state.admin.admins);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const foundAdmin = admins.find((admin) => admin.email === values.email);

      if (foundAdmin) {
        if (foundAdmin.password === values.password) {
          setloginStatus("Login successful. Admin access granted.");
          appDispatch(loginSuccess());
          navigate("/admin-dash");
        } else {
          setloginStatus("Incorrect password. Please try again.");
        }
      } else {
        const foundUser = users.find((user) => user.email === values.email);

        if (foundUser) {
          appDispatch(loginSuccess());
          navigate("/user-dashbord");
        } else {
          setloginStatus("You don't have an account. Please register first.");
        }
      }
    },
  });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          {loginStatus && (
            <div className="alert alert-warning my-2">{loginStatus}</div>
          )}
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    id="email"
                    name="email"
                    placeholder="Your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    id="password"
                    placeholder="Your password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-dark w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
