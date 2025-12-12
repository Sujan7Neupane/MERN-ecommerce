import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl text-gray-700 mb-4">STAY UPDATED</h2>
        <p className="text-gray-600">
          Join our newsletter for the latest updates and insights.
        </p>
      </div>

      {/* Form Section */}
      {isSubmitted ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="inline-block p-3 bg-gray-900 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Thank You!
          </h3>
          <p className="text-gray-600">You've been successfully subscribed.</p>
        </div>
      ) : (
        <form onSubmit={formSubmitHandler} className="space-y-4">
          <div className="relative">
            <input
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Simple decoration */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full"></div>
          </div>

          <button
            className={`w-full py-3 px-6 font-medium rounded-lg transition-all ${
              email
                ? "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!email}
          >
            Subscribe
          </button>
        </form>
      )}

      {/* Benefits List */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          What you'll get:
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-gray-900 mr-3 mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-600">Weekly updates on new content</span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-gray-900 mr-3 mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-600">Exclusive tips and resources</span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-gray-900 mr-3 mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-600">No spam, unsubscribe anytime</span>
          </li>
        </ul>
      </div>

      {/* Privacy Note */}
      <p className="mt-6 text-center text-sm text-gray-500">
        We respect your privacy. Your email is safe with us.
      </p>
    </div>
  );
};

export default NewsLetter;
