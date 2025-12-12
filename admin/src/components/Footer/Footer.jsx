import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer className="border-t border-gray-200 dark:border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Admin Dashboard. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition"
            >
              Terms of Service
            </a>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              v1.0.0
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
