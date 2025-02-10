
import { Zap, Code, Bot, Search, Shield, Cpu } from "lucide-react";

const features = [
  {
    name: "Performance Fundamentals",
    description: "Learn the core concepts of Node.js performance optimization and best practices.",
    icon: Zap,
  },
  {
    name: "Code Analysis",
    description: "Master techniques for identifying and resolving performance bottlenecks.",
    icon: Code,
  },
  {
    name: "Memory Management",
    description: "Understand memory leaks, garbage collection, and optimization strategies.",
    icon: Cpu,
  },
  {
    name: "Security Optimization",
    description: "Implement secure coding practices without sacrificing performance.",
    icon: Shield,
  },
  {
    name: "Monitoring & Debugging",
    description: "Set up comprehensive monitoring and debugging systems.",
    icon: Search,
  },
  {
    name: "Automated Testing",
    description: "Create automated performance tests and continuous monitoring.",
    icon: Bot,
  },
];

const Features = () => {
  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary uppercase tracking-wide">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need to optimize your Node.js applications
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Comprehensive guide covering all aspects of Node.js performance optimization
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="h-full relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-primary-light rounded-md">
                      <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
