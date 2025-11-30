import React from "react";

const NewsLetter = () => {
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe to our newsletter
      </p>
      <p className="text-gray-400 mt-3"> Lorem ipsum dolor sit amet.</p>

      {/* Form for the newsletter */}
      <form
        onSubmit={formSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
        action="#"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
        />
        <button
          className="bg-black text-white text-xs px-10 py-4 cursor-pointer"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
