const Navbar = () => (
  <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 border border-white/30 shadow-md">
    <div className="flex justify-between items-center px-6 py-4">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src="/Logo.png" alt="AIGnite Logo" className="h-8 w-auto mr-2" />
        <h1>AIgnite Learn</h1>
      </div>

      {/* Actions Section */}
      <div className="flex items-center space-x-4">
        <button
          className="text-white bg-blue-500/80 px-4 py-2 rounded-md hover:bg-blue-600/90 transition"
          onClick={() => (window.location.href = "/goals")}
        >
          Home
        </button>
        <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
          <img
            src="https://freesvg.org/img/abstract-user-flat-4.png"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
