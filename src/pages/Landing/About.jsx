import { useEffect, useRef, useState } from "react";
import { Card } from "../../components/ui/card";
import { Trophy, Users, ThumbsUp, ClipboardList, Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

// Custom color palette
const colors = {
  text: "#333333",
  background: "#F8F9FA",
  primary: "#2A4E6E",
  secondary: "#8A9A5B",
  accent: "#CC5500",
};

const metrics = [
  {
    icon: <Calendar className="w-6 h-6" />,
    value: "20",
    label: "Year of Experience",
    color: colors.primary,
  },
  {
    icon: <ClipboardList className="w-6 h-6" />,
    value: "50+",
    label: "Successful Project",
    color: colors.secondary,
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "94",
    label: "Trusted Employees",
    color: colors.primary,
  },
  {
    icon: <ThumbsUp className="w-6 h-6" />,
    value: "96%",
    label: "Positive Reviews",
    color: colors.secondary,
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    value: "20",
    label: "Achieve Awards",
    color: colors.accent,
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Parallax effect for the header image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
  const opacityOverlay = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.1, 0.2]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const [lightboxImage, setLightboxImage] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImage("");
  };

  // Close lightbox when clicking outside the image
  const handleLightboxClick = (e) => {
    if (e.target.classList.contains("lightbox")) {
      closeLightbox();
    }
  };

  return (
    <div
      className="w-full py-10 sm:py-20 overflow-hidden"
      ref={sectionRef}
      style={{ backgroundColor: colors.background }}
    >
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute opacity-5">
          <pattern
            id="diagonalHatch"
            width="10"
            height="10"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              style={{ stroke: colors.primary, strokeWidth: 1 }}
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>

        <div
          className="absolute top-1/4 left-0 w-64 h-64 rounded-full"
          style={{
            backgroundColor: `${colors.primary}05`,
            filter: "blur(60px)",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full"
          style={{
            backgroundColor: `${colors.secondary}10`,
            filter: "blur(80px)",
          }}
        ></div>
        <div
          className="absolute top-3/4 left-1/3 w-48 h-48 rounded-full"
          style={{
            backgroundColor: `${colors.accent}08`,
            filter: "blur(70px)",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10 px-5 sm:px-5 sm:space-y-16 relative z-10">
        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Text Content */}
          <div className="space-y-6">
            <motion.div className="mb-8" variants={itemVariants}>
              <motion.div
                className="inline-block px-3 py-1 rounded-full mb-2"
                style={{
                  backgroundColor: `${colors.secondary}20`,
                  border: `1px solid ${colors.secondary}40`,
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: colors.secondary }}
                >
                  About Us
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl font-bold mt-2 leading-tight"
                style={{ color: colors.text }}
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Uncover the Universe of{" "}
                <span style={{ color: colors.primary }}>
                  Financial Planners
                </span>
              </motion.h1>

              <div
                className="h-1 w-20 mt-4 rounded-full"
                style={{ backgroundColor: colors.accent }}
              ></div>
            </motion.div>

            <motion.p
              className="leading-relaxed text-lg"
              style={{ color: colors.text }}
              variants={itemVariants}
            >
              Financial planning is more than just managing money; it's about
              creating a roadmap for your financial future. A financial planner
              is a qualified professional who helps individuals and families
              make informed decisions about their finances, from budgeting and
              saving to investing and retirement planning.
            </motion.p>

            <motion.p
              className="leading-relaxed text-lg"
              style={{ color: colors.text }}
              variants={itemVariants}
            >
              One of the key benefits of working with a financial planner is
              receiving personalized financial advice tailored to your unique
              goals and circumstances. Whether you're planning for retirement,
              saving for a major purchase, or managing debt, a financial planner
              can develop a comprehensive strategy designed to help you achieve
              your objectives.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <div
                className="inline-flex items-center px-5 py-3 rounded-full cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: colors.primary,
                  border: `1px solid ${colors.primary}30`,
                  color: "white",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                }}
              >
                <span className="mr-2 font-medium">
                  Learn more about our services
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.16667 10H15.8333"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8333 5L15.8333 10L10.8333 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Metrics Grid - Centered horizontally */}
          <motion.div className="flex" variants={containerVariants}>
            <div className="grid sm:grid-cols-2 gap-5 auto-rows-min w-full">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="flex justify-center"
                >
                  <Card
                    className={cn(
                      "flex gap-4 p-4 items-center transition-all duration-300 w-full",
                      "transform-gpu relative overflow-hidden"
                    )}
                    style={{
                      backgroundColor: "white",
                      borderColor:
                        hoveredCard === index
                          ? `${metric.color}50`
                          : "transparent",
                      boxShadow:
                        hoveredCard === index
                          ? `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 2px ${metric.color}30`
                          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    {/* Decorative corner accent */}
                    <div
                      className="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8 rotate-45"
                      style={{
                        backgroundColor: metric.color,
                        opacity: hoveredCard === index ? 0.15 : 0.05,
                        transition: "opacity 0.3s ease",
                      }}
                    ></div>

                    <motion.div
                      className="rounded-lg p-3 relative z-10"
                      style={{
                        backgroundColor: `${metric.color}15`,
                        color: metric.color,
                      }}
                      animate={
                        hoveredCard === index
                          ? {
                              backgroundColor: `${metric.color}25`,
                              scale: 1.05,
                              rotate: [0, 5, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {metric.icon}
                    </motion.div>

                    <div className="relative z-10">
                      <div
                        className="text-xl font-bold"
                        style={{ color: metric.color }}
                      >
                        {isVisible ? (
                          <CountUpValue
                            value={metric.value}
                            isVisible={isVisible}
                          />
                        ) : (
                          metric.value
                        )}
                      </div>
                      <div
                        className="font-medium text-sm"
                        style={{ color: colors.text }}
                      >
                        {metric.label}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <style>
          {`
                  .lightbox {
                    display: none;
                    position: fixed;
                    z-index: 999;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                    background-color: rgba(0, 0, 0, 0.8);
                  }
                  .lightbox.active {
                    display: flex;
                  }
                  .lightbox-image {
                    display: block;
                    margin: auto;
                    max-width: 100%;
                    max-height: 100%;
                  }
                  .close {
                    color: #fff;
                    font-size: 3em;
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    cursor: pointer;
                  }
                  .gallery {
                    width: 90vw;
                    // max-width: 1200px;
                    margin: 0 auto;
                    grid-template-rows: 1fr;
                    grid-column-gap: 30px;
                    grid-row-gap: 30px;
                  }
                  .gallery img {
                    max-width: 100%;
                    cursor: pointer;
                  }
                  .gallery img:hover {
                    max-width: 100%;
                    cursor: pointer;
                  }
                `}
        </style>

        <section className="">
          <div className="gallery max-w-7xl mx-auto">
            <div className="flex flex-col mb-10">
              <div className="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
                <div className="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
                  <img
                    src="https://pagedone.io/asset/uploads/1713942989.png"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl transition-all duration-700 ease-in-out mx-auto lg:col-span-4 md:col-span-6 w-full h-full"
                    onClick={() =>
                      openLightbox(
                        "https://pagedone.io/asset/uploads/1713942989.png"
                      )
                    }
                  />
                </div>
                <div className="md:col-span-8 md:h-[404px] h-[277px] w-full rounded-3xl">
                  <img
                    src="https://pagedone.io/asset/uploads/1713943004.png"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl transition-all duration-700 ease-in-out mx-auto lg:col-span-8 md:col-span-6 w-full h-full"
                    onClick={() =>
                      openLightbox(
                        "https://pagedone.io/asset/uploads/1713943004.png"
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                {["1713943024", "1713943039", "1713943054"].map((id) => (
                  <div key={id} className="h-[277px] w-full rounded-3xl">
                    <img
                      src={`https://pagedone.io/asset/uploads/${id}.png`}
                      alt="Gallery image"
                      className="gallery-image object-cover rounded-3xl transition-all duration-700 ease-in-out mx-auto w-full h-full"
                      onClick={() =>
                        openLightbox(
                          `https://pagedone.io/asset/uploads/${id}.png`
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`lightbox ${isLightboxOpen ? "active" : ""}`}
            onClick={handleLightboxClick}
          >
            <span className="close" onClick={closeLightbox}>
              &times;
            </span>
            <img src={lightboxImage} alt="" className="lightbox-image" />
          </div>
        </section>
      </div>
    </div>
  );
}

// Separate component for count-up animation
function CountUpValue({ value, isVisible }) {
  const [count, setCount] = useState(0);
  const finalValue = Number.parseInt(value.replace(/\D/g, ""), 10) || 0;
  const hasPlus = value.includes("+");

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const counterIncrement = finalValue / totalFrames;

    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / totalFrames, 1);
      const currentCount = Math.floor(progress * finalValue);

      setCount(currentCount);

      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [finalValue, isVisible]);

  return <>{hasPlus ? `${count}+` : count}</>;
}
