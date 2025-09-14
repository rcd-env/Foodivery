import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router";
import axios from "axios";

function PartnerRegister() {
  const formik = useFormik({
    initialValues: {
      brandName: "",
      contactName: "",
      phone: "",
      location: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      brandName: Yup.string().required("Required"),
      contactName: Yup.string().required("Required"),
      phone: Yup.string()
        .min(10, "Must be 10 digits")
        .max(10, "Must be 10 digits")
        .required("Required"),
      location: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post(
          "https://foodivery.onrender.com/api/auth/food-partner/register",
          values,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Server response:", response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error registering the food partner!",
            error
          );
        });
    },
  });
  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="w-[85%] lg:w-[37%] sm:w-[60%]  sm:rounded-lg sm:px-10 sm:py-8 sm:bg-gray-800 sm:shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-amber-500">
          Food Partner Register
        </h1>
        <p className="text-sm text-red-400 text-center mb-6 mt-2">
          Switch :{" "}
          <Link
            to="/user/register"
            className="text-green-600 hover:text-green-500"
          >
            User
          </Link>{" "}
          &bull;{" "}
          <Link
            to="/food-partner/register"
            className="text-green-500 hover:text-green-600"
          >
            Food Partner
          </Link>
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="">
            <label
              htmlFor="brandName"
              className="block text-sm font-medium text-orange-500 mb-2"
            >
              Brand Name
            </label>
            <input
              id="brandName"
              type="text"
              {...formik.getFieldProps("brandName")}
              className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
              placeholder="Taste Buds"
            />
            {formik.touched.brandName && formik.errors.brandName ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.brandName}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="contactName"
                className="block text-sm font-medium text-orange-500 mb-2"
              >
                Contact Name
              </label>
              <input
                id="contactName"
                type="text"
                {...formik.getFieldProps("contactName")}
                className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
                placeholder="Rakesh Das"
              />
              {formik.touched.contactName && formik.errors.contactName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.contactName}
                </div>
              ) : null}
            </div>
            <div className="flex-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-orange-500 mb-2"
              >
                Phone
              </label>
              <input
                id="phone"
                type="text"
                {...formik.getFieldProps("phone")}
                className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
                placeholder="9874660384"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-orange-500 mb-2"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              {...formik.getFieldProps("location")}
              className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
              placeholder="Kolkata, West Bengal, India"
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.location}
              </div>
            ) : null}
          </div>
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
              placeholder="example@gmail.com"
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
            to="/food-partner/login"
            className="text-amber-500 hover:text-amber-600 font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default PartnerRegister;
