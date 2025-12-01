import { Navbar, SearchBar } from "../index.js";

const Header = () => {
  return (
    <div className="w-full mx-auto px-4 max-w-7xl">
      <Navbar />
      <SearchBar />
    </div>
  );
};

export default Header;
