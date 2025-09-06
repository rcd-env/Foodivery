import React, { useEffect } from "react";

function NotFoundPage() {
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-extralight opacity-60 flex items-center">
        <span>404</span>
        <span className="border-l-2 ml-4 pl-4">NOT FOUND</span>
      </h1>
    </div>
  );
}

export default NotFoundPage;
