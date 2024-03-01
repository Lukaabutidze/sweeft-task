const Navbar = (): any => {
  return (
    <nav className="bg-white p-7 shadow-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center flex-shrink-0 text-white mr-6"></div>
        <div className="flex-grow">
          <div className="flex space-x-4 justify-center gap-14">
            <a
              href="/"
              className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-medium"
            >
              Home
            </a>
            <a
              href="/history"
              className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-2xl font-medium"
            >
              History
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
