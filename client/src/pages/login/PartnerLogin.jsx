import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router";
import axios from "axios";

function PartnerLogin() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8080/api/auth/food-partner/login", values, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("Server response:", response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error logging in the food partner!",
            error
          );
        });
    },
  });
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-[85%] lg:w-[33%] sm:w-[60%]  sm:rounded-lg sm:px-10 sm:py-8 sm:bg-gray-800 sm:shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-amber-500">
          Login Food Partner
        </h1>
        <p className="text-sm text-red-400 text-center mb-6 mt-2">
          Switch :{" "}
          <Link
            to="/user/login"
            className="text-green-600 hover:text-green-500"
          >
            User
          </Link>{" "}
          &bull;{" "}
          <Link
            to="/food-partner/login"
            className="text-green-500 hover:text-green-600"
          >
            Food Partner
          </Link>
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-400 text-center">
          New to Foodivery?{" "}
          <Link
            to="/food-partner/register"
            className="text-amber-500 hover:text-amber-600 font-medium"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default PartnerLogin;
