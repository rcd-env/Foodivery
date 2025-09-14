import React from "react";
import { Link } from "react-router";

function Dashboard() {
  return (
    <>
      <h1 className="text-2xl text-center text-amber-600 font-bold py-8">
        Food Partner Dashboard
      </h1>
      <div className="flex flex-col sm:flex-row px-8 sm:px-34 gap-8 sm:justify-between justify-center items-center">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl text-center text-green-500 font-semibold">
            Foodivery
          </h3>
          <p>Greetings, From Foodivery.</p>
        </div>
        <Link
          to="/food-partner/create"
          className="text-center p-4 border rounded-2xl"
        >
          Create New Food Item
        </Link>
      </div>
      <hr className="my-10 mx-8 sm:mx-[10%] border-gray-500" />
    </>
  );
}

export default Dashboard;
