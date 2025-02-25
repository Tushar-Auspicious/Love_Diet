import ICONS from "../Assets/Icons";

export type SlideType = {
  id: string;
  image: any;
  title: string;
  subtitle: string;
};

const OnBoardingSlides: SlideType[] = [
  {
    id: "1",
    image: ICONS.Slide1,
    title: "70% of Dieters fail",
    subtitle:
      "70% of Dieters quit other weight loss programs due to discouragement, demotivation and lack of support",
  },
  {
    id: "2",
    image: ICONS.Slide2,

    title: "The Love Diet Challenge",
    subtitle: "Your love partner becomes your Personal Trainer (PT).",
  },
  {
    id: "3",
    image: ICONS.Slide3,

    title: "Diet becomes easier",
    subtitle:
      "Your PT will help you, support you and motivate you to reach your desired weight.",
  },
  {
    id: "4",
    image: ICONS.Slide4,

    title: "Reward each other",
    subtitle:
      "Give love rewards to each other when you meet the Challenge’s goals.",
  },
  {
    id: "5",
    image: ICONS.Slide5,

    title: "Reach your desired weight",
    subtitle:
      "Start the Love Diet Challenge now and reach your desired weight!",
  },
];

export default OnBoardingSlides;
