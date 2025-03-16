import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const Dummy = () => {
  return (
    <div className="w-full bg-background text-text font-sans">
      {/* Navigation Bar - Responsive with mobile menu */}
      <nav className="bg-primary text-white px-4 md:px-8 py-4 md:py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-bold">
            <div className="bg-secondary rounded-full w-8 h-8 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 5L21 12L13 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12H3"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="tracking-wide">Digiboost</span>
          </div>

          {/* Menu - Responsive */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto">
            <div className="flex items-center justify-center gap-6 md:gap-8 text-sm md:text-base">
              <a
                href="#"
                className="hover:text-secondary transition-colors duration-300 relative py-1"
              >
                Home
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors duration-300 relative py-1"
              >
                Services
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors duration-300 relative py-1"
              >
                Project
              </a>
              <a
                href="#"
                className="relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary"
              >
                About Us
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button className="bg-secondary hover:bg-secondary/90 text-white border-none transition-all duration-300 shadow-md hover:shadow-lg">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/10 transition-all duration-300"
              >
                Let's Talk
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-primary text-white px-4 md:px-8 py-8 md:py-16">
        <div className="container mx-auto">
          {/* Main Content - Responsive layout */}
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 mb-12">
            {/* Left Column */}
            <div className="w-full lg:w-1/2">
              <div className="mb-4 md:mb-6">
                <p className="text-white/80 mb-1">Establish</p>
                <p className="text-3xl md:text-4xl font-bold">2011</p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8">
                We Are <span className="text-secondary">Creative</span>
                <br className="hidden md:block" /> Digital Agency
              </h1>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/2">
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                we are a creative agency with several services that focused on
                quality and innovations for your business
              </p>

              {/* Stats - Responsive grid */}
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {/* Stat 1 */}
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold">12</span>
                    <span className="text-secondary text-xl md:text-2xl font-bold">
                      +
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-white/70 mt-1">
                    Years of
                    <br />
                    Experience
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold">83K</span>
                    <span className="text-secondary text-xl md:text-2xl font-bold">
                      +
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-white/70 mt-1">
                    Completed
                    <br />
                    Project
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold">4.2K</span>
                    <span className="text-secondary text-xl md:text-2xl font-bold">
                      +
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-white/70 mt-1">
                    Trusted
                    <br />
                    Companies
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Image Section */}
          <div className="relative rounded-xl overflow-hidden shadow-xl group">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Team collaboration"
              className="w-full h-auto object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
            />

            {/* Play Button with hover effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary/90 text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
              <Play className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-70"></div>
          </div>
        </div>
      </section>

      {/* Services Preview Section (Added for enhanced UX) */}
      <section className="bg-background py-12 md:py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Expertise
            </h2>
            <p className="text-text/70 max-w-2xl mx-auto">
              Delivering innovative digital solutions that drive growth and
              transform businesses
            </p>
          </div>

          {/* Services Cards - Responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                Web Development
              </h3>
              <p className="text-text/70">
                Custom websites and web applications built with the latest
                technologies and best practices.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                Mobile Apps
              </h3>
              <p className="text-text/70">
                Native and cross-platform mobile applications that deliver
                exceptional user experiences.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                Digital Marketing
              </h3>
              <p className="text-text/70">
                Strategic marketing solutions that increase visibility,
                engagement, and conversion rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Added for enhanced UX) */}
      <section className="bg-primary/5 py-12 md:py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-text/70 max-w-2xl mx-auto">
              Talented professionals dedicated to bringing your vision to life
            </p>
          </div>

          {/* Team Members - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Team Member"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-primary">
                  Sarah Johnson
                </h3>
                <p className="text-secondary text-sm">Creative Director</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Team Member"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-primary">
                  Michael Chen
                </h3>
                <p className="text-secondary text-sm">Lead Developer</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Team Member"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-primary">
                  Jessica Patel
                </h3>
                <p className="text-secondary text-sm">UX Designer</p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Team Member"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-primary">
                  David Wilson
                </h3>
                <p className="text-secondary text-sm">Marketing Strategist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <motion.div
          ref={imageRef}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={imageVariants}
          className="relative overflow-hidden rounded-xl shadow-lg group"
          style={{
            borderRadius: "1rem",
            boxShadow: `0 10px 30px -5px rgba(42, 78, 110, 0.15), 0 4px 6px -2px rgba(42, 78, 110, 0.05)`,
          }}
        >
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(to right, ${colors.primary}80 0%, transparent 20%, transparent 80%, ${colors.primary}80 100%)`,
              mixBlendMode: "multiply",
              opacity: 0.3,
            }}
          ></motion.div>

          <motion.img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EQhAqQAqWebitswLxfnGCPagoPNPLW.png"
            alt="Financial planners collaborating"
            className="w-full h-full object-cover"
            style={{
              y: imageY,
              scale: imageScale,
              transition: "transform 0.7s cubic-bezier(0.33, 1, 0.68, 1)",
              filter: "saturate(1.1)",
            }}
          />

          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${colors.primary}90 0%, transparent 50%)`,
              opacity: opacityOverlay,
              mixBlendMode: "multiply",
            }}
          ></motion.div>

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ backgroundColor: `${colors.primary}20` }}
          ></div>

          {/* Image caption */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{
              background: `linear-gradient(to top, ${colors.primary} 0%, transparent 100%)`,
              backdropFilter: "blur(4px)",
            }}
          >
            <p className="text-sm font-medium">
              Our team of expert financial planners
            </p>
            <div
              className="h-1 w-20 mt-2 rounded-full"
              style={{ backgroundColor: colors.accent }}
            ></div>
          </div>
        </motion.div>
    </div>
  );
};

export default Dummy;
