import { cn } from "@/lib/utils";
import { Marquee } from "../../components/magicui/marquee";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Aman",
    username: "Aman, RCA Selected 2024",
    body: "Selected. Thank you so much to @Tanweer Ahmad Sir for all your help. Also thanks to all my friends who shared their transcripts ",
    img: "https://avatar.vercel.sh/jack",
    rating: 5,
  },
  {
    name: "Akansha Biswas",
    username: "Akansha Biswas, RCA Selected 2024 ",
    body: "Selected! Thank you to all for sharing your interview transcripts and @Wetoo Media for sharing previous transcripts because I did get questions from those! Very grateful!",
    img: "https://avatar.vercel.sh/jill",
    rating: 4,
  },
  {
    name: "Rozy Parveen",
    username: "Rozy Parveen, RCA Selected 2024",
    body: "Selected 🤩... Thanks @Tanweer Ahmad sir.",
    img: "https://avatar.vercel.sh/john",
    rating: 5,
  },
  {
    name: "Naved",
    username: "Naved, RCA Selected 2024 ",
    body: "Selected!! Thank you sir, for interview guidance.",
    img: "https://avatar.vercel.sh/jane",
    rating: 4,
  },
  {
    name: "ANA Musharraf",
    username: "ANA Musharraf, RCA selected 2024 ",
    body: "WeToo’s RCA interview guidance program was really helpful in giving the direction in which the interview prep should be done, specially the transcript were really useful. Thank you Tanweer sir for the initiative.",
    img: "https://avatar.vercel.sh/james",
    rating: 4,
  },
  {
    name: "Kritika ",
    username: "Kritika",
    body: "I would really like to thank WeToo for providing guidance and resource during preparation. This was the mostly relied on for almost everything",
    img: "https://avatar.vercel.sh/jenny",
    rating: 4,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body, rating }) => {
  return (
    <figure
      className={cn(
        "relative h-min w-96 bg-[#2a4f6f0d] cursor-pointer overflow-hidden rounded-xl border p-5",
        // light styles
        "border-secondary/30 bg-[#2a4f6f0d] hover:bg-[#2a4f6f0d]",
        // dark styles
        "dark:border-secondary/30 dark:bg-[#2a4f6f0d] dark:hover:bg-[#2a4f6f0d]"
      )}
    >
      <div className="absolute top-3 right-3 text-accent">
        <Quote size={18} className="opacity-40" />
      </div>
      <div className="flex flex-row items-center gap-3">
        <img className="rounded-full" width="40" height="40" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <div className="flex mt-3 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              "mr-0.5",
              i < rating
                ? "fill-accent text-accent"
                : "fill-background text-secondary/30"
            )}
          />
        ))}
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Testimonial() {
  return (
    <div className="relative flex w-full max-w-7xl pb-16 mx-auto flex-col items-center justify-center overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
          What Our Students Say
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-4"></div>
        <p className="text-text/80 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what people are saying about
          our products and services.
        </p>
      </div>
      <Marquee pauseOnHover className="[--duration:20s] [--gap:2rem]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s] [--gap:2rem]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
