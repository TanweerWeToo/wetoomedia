"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";

const WordPullUp = memo(
  ({
    words,
    wrapperFramerProps = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.3,
        },
      },
    },
    framerProps = {
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1 },
    },
    className,
  }) => {
    const { ref, inView } = useInView({
      threshold: 0.5,
      rootMargin: "-5% 0px -20% 0px",
      triggerOnce: true,
    });

    // Memoize words to prevent unnecessary computations
    const wordElements = useMemo(
      () =>
        words.split(" ").map((word, i) => (
          <motion.span
            key={i}
            variants={framerProps}
            style={{ display: "inline-block", paddingRight: "8px" }}
          >
            {word || <>&nbsp;</>}
          </motion.span>
        )),
      [words, framerProps]
    );

    return (
      <motion.h2
        ref={ref}
        variants={wrapperFramerProps}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className={cn(
          "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
          className
        )}
      >
        {wordElements}
      </motion.h2>
    );
  }
);
WordPullUp.displayName = "WordPullUp";

export default memo(WordPullUp);