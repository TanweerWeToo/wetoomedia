import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-primary text-white px-5 md:px-8 py-8 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Content - Responsive layout */}
        <div className="flex flex-col lg:flex-row gap-5 md:gap-12 lg:gap-16 mb-12">
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
        <div className="relative w-full rounded-xl overflow-hidden shadow-xl group">
          <img
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format"
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
  );
};

export default Hero;
