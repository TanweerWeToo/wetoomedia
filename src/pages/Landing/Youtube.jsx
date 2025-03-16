import React, { memo, useEffect, useState } from "react";
import Heading from "../../components/Heading2";
import WordPullUp from "../../components/ui/word-pull-up2";
import NumberTicker from "../../components/ui/number-ticker";

const statsData = [
  { data: "1000+", title: "Subscribers" },
  { data: "1000+", title: "Views" },
  { data: "1000+", title: "Likes" },
  { data: "1000+", title: "Comments" },
];

const StatItem = memo(({ data, title }) => (
  <div className="flex flex-col items-center p-4">
    <div className="text-5xl font-bold text-white sm:text-6xl">
      <NumberTicker
        value={data}
        className="xs:text-4xl text-2xl font-bold text-white sm:text-6xl"
      />
      <span className="ml-1 xs:text-4xl text-2xl font-bold text-white sm:text-6xl">
        +
      </span>
    </div>
    <div className="mt-3 xs:text-sm text-xs font-medium text-gray-400 sm:text-xl">
      {title}
    </div>
  </div>
));

// Set display name for the component
StatItem.displayName = "StatItem";

const Stats = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src =
      "https://media.istockphoto.com/id/528198067/photo/asolo-ias.jpg?s=2048x2048&w=is&k=20&c=tSz8aqvucjSeYBcsbJOP76fC7-zZBP1bMPXNq8f2ARI=";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <section className="relative px-0 py-10 lg:py-28 md:py-12 sm:px-0">
      {imageLoaded && (
        <img
          src="https://media.istockphoto.com/id/528198067/photo/asolo-ias.jpg?s=2048x2048&w=is&k=20&c=tSz8aqvucjSeYBcsbJOP76fC7-zZBP1bMPXNq8f2ARI="
          alt="stats"
          className="absolute top-0 left-0 object-cover w-full h-full -z-10 blur-sm"
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="absolute inset-0 z-20 bg-black opacity-70" />
      <div className="relative z-30 max-w-screen-xl px-4 mx-auto md:px-8">
        <WordPullUp
          className="mb-8 xs:text-4xl text-3xl font-bold text-center text-white md:text-6xl sm:font-bold md:font-extrabold sm:text-5xl lg:text-6xl"
          words="WE TOO MEDIA"
        />
        <Heading
          subtitle="We Too Media is a media production company that specializes in creating high-quality media content for businesses and organizations."
          subtitleClassName="text-gray-300 xs:text-base text-sm md:text-lg"
        />
        <div className="grid grid-cols-2 xs:gap-8 gap-1 md:grid-cols-4 md:gap-0 md:divide-x-2 md:divide-red-700">
          {statsData.map((item, index) => (
            <StatItem key={index} data={item.data} title={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

Stats.displayName = "Stats";
export default memo(Stats);
