import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function CreateFood() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      video: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      video: Yup.string().url("Invalid URL").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("https://foodivery.onrender.com/api/food", values, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("Server response:", response.data);
          navigate("/food-partner/dashboard");
        })
        .catch((error) => {
          confirm("Login failed. Please check your credentials and try again.");
          console.error("There was an error!", error);
        });
    },
  });
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-[85%] lg:w-[33%] sm:w-[60%]  sm:rounded-lg sm:px-10 sm:py-8 sm:bg-gray-800 sm:shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-amber-500 mb-4">
          Add New Food Item
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-orange-500 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
              placeholder="Food Item Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-orange-500 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              {...formik.getFieldProps("description")}
              className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
              placeholder="Food Item Description"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="video"
              className="block text-sm font-medium text-orange-500 mb-2"
            >
              Video URL
            </label>
            <input
              id="video"
              type="file"
              {...formik.getFieldProps("video")}
              className="w-full px-4 py-3 border border-orange-500 rounded-lg focus:outline-none text-gray-300 placeholder-gray-500"
              placeholder="eg. https://www.youtube.com/watch?v=example"
            />
            {formik.touched.video && formik.errors.video ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.video}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-3 px-4 rounded-lg hover:bg-orange-500 transition-colors font-medium text-lg mt-2 cursor-pointer"
          >
            Add Food Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateFood;
