import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center">
        {/* Display 404 error code */}
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
        {/* Error message */}
        <p className="text-xl text-white/80 mb-6">Page Not Found</p>
        {/* Link to navigate back to the homepage */}
        <Link to="/" className="text-yellow-400 hover:underline text-lg">
          Go back to Home →
        </Link>
      </div>
    </section>
  );
};

export default NotFound;