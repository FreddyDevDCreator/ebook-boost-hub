
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container-custom relative z-10">
        <div className="relative z-10 pt-14 lg:pt-20 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main>
            <div className="text-center">
              <h1 className="animate-fade-up text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Welcome to</span>
                <span className="block text-primary">FredAbod TechEd</span>
              </h1>
              <p className="animate-fade-up mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Unlock your potential with our comprehensive tech courses. From beginners to advanced learners,
                we offer high-quality digital education to help you master modern technologies.
              </p>
              <div className="animate-fade-up mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/courses"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-hover md:py-4 md:text-lg md:px-10"
                  >
                    Buy Free Courses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/book"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-black bg-yellow-500 hover:bg-yellow-600 md:py-4 md:text-lg md:px-10"
                  >
                    Buy Ebook
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/about"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-secondary bg-secondary-50 hover:bg-secondary-100 md:py-4 md:text-lg md:px-10"
                  >
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-1/3 h-32 bg-primary opacity-10 rounded-tr-full"></div>
      <div className="absolute top-20 right-10 w-24 h-24 bg-yellow-500 opacity-20 rounded-full"></div>
      <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-purple-500 opacity-20 rounded-full"></div>
    </div>
  );
};

export default Hero;
