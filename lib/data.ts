export interface TimeSlot {
  time: string;
  available: number;
  soldOut?: boolean;
}

export interface DateSlot {
  date: string;
  available: number;
  times: TimeSlot[];
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  about: string;
  dates: DateSlot[];
}

export const experiences: Experience[] = [
  {
    id: "kayaking-udupi",
    title: "Kayaking",
    location: "Udupi",
    price: 999,
    image: "/images/kayaking-1.jpg",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    about: "Scenic routes, trained guides, and safety briefing. Minimum age 10.",
    dates: [
      {
        date: "Oct 22",
        available: 4,
        times: [
          { time: "07:00 am", available: 4 },
          { time: "9:00 am", available: 2 },
          { time: "11:00 am", available: 5 },
          { time: "1:00 pm", soldOut: true, available: 0 },
        ],
      },
      {
        date: "Oct 23",
        available: 3,
        times: [
          { time: "07:00 am", available: 3 },
          { time: "9:00 am", available: 1 },
          { time: "11:00 am", soldOut: true, available: 0 },
          { time: "1:00 pm", soldOut: true, available: 0 },
        ],
      },
      {
        date: "Oct 24",
        available: 6,
        times: [
          { time: "07:00 am", available: 6 },
          { time: "9:00 am", available: 4 },
          { time: "11:00 am", available: 2 },
          { time: "1:00 pm", available: 1 },
        ],
      },
      {
        date: "Oct 25",
        available: 2,
        times: [
          { time: "07:00 am", available: 2 },
          { time: "9:00 am", soldOut: true, available: 0 },
          { time: "11:00 am", soldOut: true, available: 0 },
          { time: "1:00 pm", soldOut: true, available: 0 },
        ],
      },
      {
        date: "Oct 26",
        available: 5,
        times: [
          { time: "07:00 am", available: 5 },
          { time: "9:00 am", available: 3 },
          { time: "11:00 am", available: 2 },
          { time: "1:00 pm", available: 1 },
        ],
      },
    ],
  },
  {
    id: "nandi-hills-sunrise",
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    price: 899,
    image: "/images/nandi-hills.jpg",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    about: "Early morning trek to catch the sunrise. Transportation included.",
    dates: [
      {
        date: "Oct 22",
        available: 8,
        times: [
          { time: "04:00 am", available: 8 },
          { time: "05:00 am", available: 4 },
        ],
      },
      {
        date: "Oct 23",
        available: 5,
        times: [
          { time: "04:00 am", available: 5 },
          { time: "05:00 am", available: 2 },
        ],
      },
    ],
  },
  {
    id: "coffee-trail",
    title: "Coffee Trail",
    location: "Coorg",
    price: 1299,
    image: "/images/coffee-trail.jpg",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    about: "Walk through coffee plantations and learn about coffee production.",
    dates: [
      {
        date: "Oct 22",
        available: 10,
        times: [
          { time: "08:00 am", available: 10 },
          { time: "02:00 pm", available: 6 },
        ],
      },
    ],
  },
  {
    id: "kayaking-karnataka",
    title: "Kayaking",
    location: "Udupi, Karnataka",
    price: 999,
    image: "/images/kayaking-2.jpg",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.",
    about: "Scenic routes, trained guides, and safety briefing. Minimum age 10.",
    dates: [
      {
        date: "Oct 22",
        available: 4,
        times: [
          { time: "07:00 am", available: 4 },
          { time: "9:00 am", available: 2 },
          { time: "11:00 am", available: 5 },
          { time: "1:00 pm", soldOut: true, available: 0 },
        ],
      },
    ],
  },
  {
    id: "boat-cruise",
    title: "Boat Cruise",
    location: "Sunderban",
    price: 999,
    image: "/images/boat-cruise.jpg",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    about: "Relaxing boat cruise through scenic waterways.",
    dates: [
      {
        date: "Oct 22",
        available: 12,
        times: [
          { time: "10:00 am", available: 12 },
          { time: "03:00 pm", available: 8 },
        ],
      },
    ],
  },
  {
    id: "bunjee-jumping",
    title: "Bunjee Jumping",
    location: "Manali",
    price: 999,
    image: "/images/bunjee.jpg",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    about: "Extreme adventure with professional safety equipment and instructors.",
    dates: [
      {
        date: "Oct 22",
        available: 6,
        times: [
          { time: "09:00 am", available: 6 },
          { time: "12:00 pm", available: 4 },
          { time: "03:00 pm", available: 2 },
        ],
      },
    ],
  },
  {
    id: "kayaking-dark",
    title: "Kayaking",
    location: "Udupi, Karnataka",
    price: 999,
    image: "/images/kayaking-3.jpg",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    about: "Scenic routes, trained guides, and safety briefing. Minimum age 10.",
    dates: [
      {
        date: "Oct 22",
        available: 4,
        times: [
          { time: "07:00 am", available: 4 },
          { time: "9:00 am", available: 2 },
        ],
      },
    ],
  },
];
