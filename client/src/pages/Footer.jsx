import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="text-gray-300 w-full fixed bottom-0 z-50 shadow-lg sm:h-20 py-4 sm:py-0 flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center border-t border-t-[#1A202C] px-4 sm:px-54">
      {/* Mobile: Brand and links on same line, Desktop: Brand only */}
      <div className="flex items-center gap-12 sm:gap-0">
        <div>&copy; Foodivery</div>
        <div className="f-info-links sm:hidden">
          <Link to="/privacy" className="hover:underline">
            Privacy
          </Link>{" "}
          &bull;{" "}
          <Link to="/terms" className="hover:underline">
            Terms
          </Link>
        </div>
      </div>

      {/* Desktop: Privacy/Terms in center */}
      <div className="f-info-links hidden sm:block">
        <Link to="/privacy" className="hover:underline">
          Privacy
        </Link>{" "}
        &bull;{" "}
        <Link to="/terms" className="hover:underline">
          Terms
        </Link>
      </div>

      {/* Social icons */}
      <div className="f-info-socials flex justify-center items-center gap-3">
        <a
          href="https://github.com/rcd-env"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/rakesh-das001"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a
          href="https://www.x.com/rcd_env/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl"
        >
          <i className="fa-brands fa-x-twitter"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
