
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-semibold text-xl">FredAbod TechEd</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">Courses</Link>
            <Link to="/blog" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">Blog</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">Contact</Link>
            <Link to="/courses" className="text-white bg-primary hover:bg-primary-hover px-4 py-2 rounded-lg font-medium transition-colors">
              Buy Free Courses
            </Link>
            <Link to="/book" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition-colors">
              Buy Ebook
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/courses"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/blog"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/courses"
            className="block px-3 py-2 text-base font-medium bg-primary text-white hover:bg-primary-hover rounded mt-2"
            onClick={() => setIsOpen(false)}
          >
            Buy Free Courses
          </Link>
          <Link
            to="/book"
            className="block px-3 py-2 text-base font-medium bg-yellow-500 text-black hover:bg-yellow-600 rounded mt-2"
            onClick={() => setIsOpen(false)}
          >
            Buy Ebook
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
