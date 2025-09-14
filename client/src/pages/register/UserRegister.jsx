import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function UserRegister() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post(
          "https://foodivery.onrender.com/api/auth/user/register",
          {
            fullName: values.firstName + " " + values.lastName,
            email: values.email,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Server response:", response.data);
          navigate("/");
        })
        .catch((error) => {
          confirm(
            "Registration failed. Please check your details and try again."
          );
          console.error("There was an error!", error);
        });
    },
  });
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-[85%] lg:w-[33%] sm:w-[60%]  sm:rounded-lg sm:px-10 sm:py-8 sm:bg-gray-800 sm:shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-amber-500">
          Create User Account
        </h1>
        <p className="text-sm text-red-400 text-center mb-6 mt-2">
          Switch :{" "}
          <Link
            to="/user/register"
            className="text-green-500 hover:text-green-600"
          >
            User
          </Link>{" "}
          &bull;{" "}
          <Link
            to="/food-partner/register"
            className="text-green-600 hover:text-green-500"
          >
            Food Partner
          </Link>
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-orange-500 mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...formik.getFieldProps("firstName")}
                className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
                placeholder="eg. Rakesh"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-orange-500 mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...formik.getFieldProps("lastName")}
                className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
                placeholder="eg. Das"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-orange-500 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
              placeholder="eg. example@gmail.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-orange-500 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
              placeholder="Create a password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-3 px-4 rounded-lg hover:bg-orange-500 transition-colors font-medium text-lg mt-2 cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-amber-500 hover:text-amber-600 font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
