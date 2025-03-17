import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Download, FileText, Headphones, MessageCircle, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTierSelect = (tier: string) => {
    setSelectedTier(tier);
  };

  const handleCheckout = () => {
    if (!selectedTier) {
      toast({
        title: "Please select a package",
        description: "Select one of our packages before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to checkout page with the selected tier
    navigate(`/checkout?product=ebook&tier=${selectedTier}`);
  };

  const handleLeadMagnetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: "Your free chapter has been sent to your email.",
      });
      setEmail("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Book Cover */}
            <div className="w-full md:w-1/3">
              <img 
                src="/lovable-uploads/8158b5c0-c97a-4d57-8890-83d666f63563.png" 
                alt="Node.js Book Cover"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            
            {/* Book Info */}
            <div className="w-full md:w-2/3 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Master Backend Development with Node.js & JavaScript
              </h1>
              <h2 className="text-2xl md:text-3xl mb-6">
                The Ultimate Beginner's Guide to Building Powerful Server-Side Applications
              </h2>
              <p className="text-lg mb-8">
                Transform from a complete beginner to a confident backend developer with practical, step-by-step guidance from industry experts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get the Ebook Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => document.getElementById('free-chapter')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get a Free Chapter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div>
              <p className="text-xl font-bold text-blue-900">500+</p>
              <p className="text-gray-600">Happy Readers</p>
            </div>
            <div className="h-10 border-r border-gray-300 hidden md:block"></div>
            <div>
              <p className="text-xl font-bold text-blue-900">4.8/5</p>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="h-10 border-r border-gray-300 hidden md:block"></div>
            <div>
              <p className="text-xl font-bold text-blue-900">25+</p>
              <p className="text-gray-600">Real-world Projects</p>
            </div>
            <div className="h-10 border-r border-gray-300 hidden md:block"></div>
            <div>
              <p className="text-xl font-bold text-blue-900">Lifetime</p>
              <p className="text-gray-600">Access & Updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* What You'll Learn */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">What You'll Learn</CardTitle>
            <CardDescription className="text-center text-lg">Master backend development from the ground up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <CheckCircle className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Node.js Fundamentals</h3>
                  <p className="text-gray-600">Master the core concepts of Node.js from installation to execution.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <CheckCircle className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">RESTful API Design</h3>
                  <p className="text-gray-600">Learn to build clean, efficient, and scalable APIs that clients love.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <CheckCircle className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Database Integration</h3>
                  <p className="text-gray-600">Connect and query SQL and NoSQL databases with confidence.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <CheckCircle className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Authentication & Security</h3>
                  <p className="text-gray-600">Implement secure user authentication and protect against common vulnerabilities.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <CheckCircle className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Deployment Strategies</h3>
                  <p className="text-gray-600">Take your application from development to production with confidence.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <CheckCircle className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Testing & Debugging</h3>
                  <p className="text-gray-600">Write robust tests and efficiently troubleshoot problems.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bonuses Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Exclusive Bonuses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="pb-4">
                <div className="rounded-full bg-yellow-100 p-3 w-fit mx-auto mb-4">
                  <Headphones className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-center">Backend Insights Podcast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Get access to our exclusive podcast featuring interviews with top Node.js developers sharing their insights and best practices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-4">
                <div className="rounded-full bg-yellow-100 p-3 w-fit mx-auto mb-4">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-center">Comprehensive Study Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  A printable study guide with key concepts, code snippets, and practical exercises to reinforce your learning.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-4">
                <div className="rounded-full bg-yellow-100 p-3 w-fit mx-auto mb-4">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-center">Community Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Join our private community of Node.js developers where you can ask questions, share projects, and collaborate.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Readers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4">"As a frontend developer looking to expand my skills, this book was exactly what I needed. Clear explanations and practical examples!"</p>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-gray-600">Frontend Developer</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4">"The best investment I've made in my development career. I went from knowing nothing about backend to building my own API in just weeks."</p>
                <div className="font-semibold">Mike Johnson</div>
                <div className="text-sm text-gray-600">Self-taught Developer</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4">"The bonus materials are worth the price alone. The study guide helped me structure my learning, and the community is incredibly supportive."</p>
                <div className="font-semibold">David Kumar</div>
                <div className="text-sm text-gray-600">Junior Developer</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Package</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Tier */}
            <Card className={`border-2 ${selectedTier === 'basic' ? 'border-blue-500' : 'border-transparent'} hover:border-blue-500 transition-all`}>
              <CardHeader>
                <CardTitle className="text-center">Basic</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$29.99</span>
                </div>
                <CardDescription className="text-center">Perfect for beginners</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Complete Ebook (PDF, EPUB, MOBI)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Code Examples & Repositories</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Future Updates</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    handleTierSelect('basic');
                    navigate(`/checkout?product=ebook&tier=basic`);
                  }}
                  className={`w-full ${selectedTier === 'basic' ? 'bg-blue-700' : ''}`}
                >
                  Select Basic
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Tier */}
            <Card className={`border-2 ${selectedTier === 'pro' ? 'border-blue-500' : 'border-transparent'} hover:border-blue-500 transition-all`}>
              <CardHeader>
                <div className="bg-blue-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full w-fit mx-auto mb-2">Most Popular</div>
                <CardTitle className="text-center">Pro</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$49.99</span>
                </div>
                <CardDescription className="text-center">For serious learners</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Backend Insights Podcast</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Comprehensive Study Guide</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Private Community Access</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    handleTierSelect('pro');
                    navigate(`/checkout?product=ebook&tier=pro`);
                  }}
                  className={`w-full ${selectedTier === 'pro' ? 'bg-blue-700' : ''}`}
                >
                  Select Pro
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Tier */}
            <Card className={`border-2 ${selectedTier === 'premium' ? 'border-blue-500' : 'border-transparent'} hover:border-blue-500 transition-all`}>
              <CardHeader>
                <CardTitle className="text-center">Premium</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$99.99</span>
                </div>
                <CardDescription className="text-center">Ultimate learning experience</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>1-hour Q&A Session with Author</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Code Review (1 project)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Early Access to New Content</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Personalized Learning Path</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    handleTierSelect('premium');
                    navigate(`/checkout?product=ebook&tier=premium`);
                  }}
                  className={`w-full ${selectedTier === 'premium' ? 'bg-blue-700' : ''}`}
                >
                  Select Premium
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              disabled={!selectedTier}
              onClick={handleCheckout}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            >
              Get the Ebook Now
            </Button>
          </div>
        </div>

        {/* Free Chapter - Lead Magnet */}
        <div id="free-chapter" className="mb-16 bg-blue-50 p-8 rounded-lg scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Get a Free Chapter</h2>
            <p className="text-center mb-6">
              Want to see what's inside before buying? Enter your email below to receive a free chapter on "Building Your First RESTful API with Node.js".
            </p>
            
            <form onSubmit={handleLeadMagnetSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <Label htmlFor="email" className="sr-only">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Get Free Chapter"}
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-center mt-4 text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Who is this book for?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This book is designed for beginners who want to learn backend development with Node.js. Whether you're a frontend developer looking to expand your skills, a student, or someone changing careers, this guide will take you from the basics to building complete backend applications.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Do I need prior JavaScript knowledge?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Basic JavaScript knowledge is helpful but not required. The book includes a JavaScript refresher section to get you up to speed with the necessary concepts for Node.js development.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What formats are available?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>The ebook is available in PDF, EPUB, and MOBI formats, making it compatible with all devices including Kindle, iPad, computers, and smartphones.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>How long do I have access to the content?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>You'll have lifetime access to all purchased content, including any future updates to the book and materials. Once you buy it, it's yours forever.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Can I get a refund if I'm not satisfied?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, contact us within 30 days for a full refund, no questions asked.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Master Backend Development?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of developers who have transformed their careers with our comprehensive guide to Node.js and JavaScript backend development.
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get the Ebook Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Book;
