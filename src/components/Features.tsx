
import { Zap, Code, Bot, Search, Shield, Cpu } from "lucide-react";

const features = [
  {
    name: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience.",
    icon: Code,
  },
  {
    name: "Practical Projects",
    description: "Build real-world applications and expand your portfolio.",
    icon: Zap,
  },
  {
    name: "Self-Paced Learning",
    description: "Study at your own pace with lifetime access to course materials.",
    icon: Cpu,
  },
  {
    name: "Industry-Standard Content",
    description: "Stay up-to-date with the latest technologies and best practices.",
    icon: Shield,
  },
  {
    name: "Interactive Learning",
    description: "Engage with hands-on exercises and real-time feedback.",
    icon: Search,
  },
  {
    name: "Community Support",
    description: "Join our community of learners and get help when you need it.",
    icon: Bot,
  },
];

const Features = () => {
  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary uppercase tracking-wide">Why Choose FredAbod TechEd</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need to advance your tech career
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            We provide comprehensive tech education with a focus on practical skills and industry relevance
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
