
import { GithubIcon, LinkedinIcon, Globe, Mail, Instagram } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Fredrick Abodunrin</h1>
              <p className="text-xl text-emerald-100">Backend Developer & Node.js Expert</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="/lovable-uploads/f8f0eedd-b204-4c92-a5a6-c94d3d1261fe.png"
                alt="Fredrick Abodunrin"
                className="rounded-full w-48 h-48 object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Biography Section */}
          <div className="md:col-span-2 space-y-8">
            <section className="prose prose-emerald lg:prose-lg">
              <h2 className="text-3xl font-bold text-gray-900">About Me</h2>
              <p className="text-gray-700">
                I'm a Backend Developer with over 4 years of experience designing scalable applications 
                and delivering high-performance solutions. My expertise lies in building secure payment 
                infrastructures, optimizing system efficiency, and leading backend teams in remote settings.
              </p>
              <p className="text-gray-700">
                As a passionate educator and mentor, I've dedicated myself to helping developers master 
                Node.js through comprehensive training programs and hands-on projects. This commitment 
                to teaching led me to create my ebook "Node.js Performance Optimization: From Fundamentals 
                to Advanced Techniques."
              </p>
            </section>

            {/* Experience Highlights */}
            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Professional Highlights</h3>
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-2">Technical Expertise</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Node.js, Express, TypeScript development</li>
                      <li>Database optimization (PostgreSQL, MongoDB)</li>
                      <li>CI/CD implementation and DevOps practices</li>
                      <li>Payment infrastructure development</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-2">Teaching & Mentorship</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Backend Development Instructor at multiple institutions</li>
                      <li>Curriculum development for Node.js fundamentals</li>
                      <li>Hands-on project guidance and mentorship</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Connect Section */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Let's Connect</h3>
              <div className="space-y-4">
                <a 
                  href="https://www.linkedin.com/in/fredrickabodunrin/"
                  className="flex items-center space-x-3 text-gray-700 hover:text-emerald-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/FredAbod/"
                  className="flex items-center space-x-3 text-gray-700 hover:text-emerald-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://beautiful-boluwatife-portfolio.lovable.app/"
                  className="flex items-center space-x-3 text-gray-700 hover:text-emerald-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-5 h-5" />
                  <span>Portfolio</span>
                </a>
                <a 
                  href="mailto:fredrickbolutife@gmail.com"
                  className="flex items-center space-x-3 text-gray-700 hover:text-emerald-600"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
                <a 
                  href="https://www.instagram.com/fredrickabodunrin/"
                  className="flex items-center space-x-3 text-gray-700 hover:text-emerald-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              </div>
            </section>

            {/* Education Section */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Bachelor's Degree in Software Engineering</h4>
                  <p className="text-sm text-gray-600">Miva Open University (In Progress)</p>
                  <p className="text-sm text-gray-600">Expected Completion: March 2025</p>
                </div>
                <div>
                  <h4 className="font-semibold">Diploma in Mechatronics Engineering</h4>
                  <p className="text-sm text-gray-600">Lagos State Polytechnic</p>
                  <p className="text-sm text-gray-600">Graduated: October 2019</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
