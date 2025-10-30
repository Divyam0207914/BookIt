import { connectToDatabase } from "@/lib/db";
import Experience from "@/models/Experience";

export async function GET() {
  await connectToDatabase();

  let experiences = await Experience.find();

  if (experiences.length === 0) {
    const sample = [
      {
        title: "Sunset Kayaking",
        description: "Experience the magic of sunset kayaking as you glide through calm waters painted in hues of orange and pink. This serene adventure offers breathtaking views, peaceful solitude, and a unique perspective of nature’s beauty. Perfect for all skill levels, it promises unforgettable moments and stunning photo opportunities. Don’t forget your camera and a light jacket for the cooler evening breeze. Embrace tranquility and let the setting sun guide your paddle.",
        price: 120,
        image: "/sunsetkayaking.jpg",
        availableSlots: [
          { date: "2025-11-01", time: "08:00", booked: false },
          { date: "2025-11-01", time: "10:00", booked: false },
          { date: "2025-11-02", time: "14:00", booked: false },
          { date: "2025-11-02", time: "16:00", booked: false },
        ],
      },
      {
        title: "Mountain Hike",
        description: "Mountain hiking offers an exhilarating journey through nature’s most breathtaking landscapes. With proper preparation, essential gear, and physical readiness, hikers can safely explore trails that challenge and inspire. Whether aiming for a summit or enjoying a scenic route, mountain hikes provide unforgettable experiences that connect you to the outdoors and test your endurance. Always plan carefully, stay aware of weather conditions, and respect the environment for a rewarding adventure.",
        price: 150,
        image: "/mountainhike.jpg",
        availableSlots: [
          { date: "2025-11-03", time: "06:00", booked: false },
          { date: "2025-11-03", time: "10:00", booked: false },
        ],
      },
      {
        title: "Desert Jeep Safari",
        description: "Thrilling ride through rolling sand dunes under a vast sky.",
        price: 180,
        image: "/desertjeepsafari.jpg",
        availableSlots: [
          { date: "2025-11-05", time: "07:00", booked: false },
          { date: "2025-11-05", time: "16:00", booked: false },
        ],
      },
      {
        title: "Scuba Diving Experience",
        description: "Dive deep and discover the hidden beauty of coral reefs.",
        price: 190,
        image: "/scubadiving.jpg",
        availableSlots: [
          { date: "2025-11-06", time: "09:00", booked: false },
          { date: "2025-11-06", time: "13:00", booked: false },
        ],
      },
      {
        title: "Trekking in the Himalayas",
        description: "An unforgettable journey through snow-kissed peaks and forests.",
        price: 170,
        image: "/trekinginhimalya.jpg",
        availableSlots: [
          { date: "2025-11-07", time: "07:00", booked: false },
          { date: "2025-11-07", time: "09:00", booked: false },
          { date: "2025-11-07", time: "15:00", booked: false },
        ],
      },
      {
        title: "Hot Air Balloon Ride",
        description: "Rise above the world and enjoy breathtaking sunrise views.",
        price: 120,
        image: "/hotairballon.jpg",
        availableSlots: [
          { date: "2025-11-08", time: "05:30", booked: false },
          { date: "2025-11-08", time: "06:30", booked: false },
        ],
      },
      {
        title: "Beach Yoga Retreat",
        description: "Relax your mind and body with a morning of yoga by the ocean.",
        price: 40,
        image: "/beachyogaretreat.jpg",
        availableSlots: [
          { date: "2025-11-09", time: "06:00", booked: false },
          { date: "2025-11-09", time: "08:00", booked: false },
          { date: "2025-11-09", time: "17:00", booked: false },
        ],
      },
      {
        title: "Rural Village Tour",
        description: "Experience authentic countryside life with local communities.",
        price: 25,
        image: "/ruralvillagetour.jpg",
        availableSlots: [
          { date: "2025-11-10", time: "09:00", booked: false },
          { date: "2025-11-10", time: "11:00", booked: false },
        ],
      },
      {
        title: "River Rafting Challenge",
        description: "Conquer thrilling rapids with our expert rafting guides.",
        price: 190,
        image: "/riverraftingchallenge.jpg",
        availableSlots: [
          { date: "2025-11-11", time: "09:00", booked: false },
          { date: "2025-11-11", time: "13:00", booked: false },
        ],
      },
      {
        title: "Forest Camping",
        description: "Spend a peaceful night surrounded by the sounds of nature.",
        price: 130,
        image: "/forestcamping.jpg",
        availableSlots: [
          { date: "2025-11-12", time: "18:00", booked: false },
          { date: "2025-11-13", time: "18:00", booked: false },
        ],
      },
      {
        title: "Cycling Through Old Town",
        description: "Discover the charm of cobbled streets and local cafes on a guided cycle tour.",
        price: 35,
        image: "/cyclingthrougholdtown.jpg",
        availableSlots: [
          { date: "2025-11-14", time: "07:00", booked: false },
          { date: "2025-11-14", time: "10:00", booked: false },
        ],
      },
      {
        title: "Paragliding Adventure",
        description: "Soar above the valleys and feel the thrill of flight.",
        price: 180,
        image: "/paraglidingadventure.jpg",
        availableSlots: [
          { date: "2025-11-15", time: "09:00", booked: false },
          { date: "2025-11-15", time: "12:00", booked: false },
        ],
      },
      {
        title: "Cave Exploration",
        description: "Adventure into mysterious caves and discover stunning rock formations.",
        price: 70,
        image:"/caveexploration.jpg",
        availableSlots: [
          { date: "2025-11-16", time: "10:00", booked: false },
          { date: "2025-11-16", time: "14:00", booked: false },
        ],
      },
      {
        title: "City Food Walk",
        description: "Taste the best local cuisines with a guided street food tour.",
        price: 50,
        image: "/cityfoodwalk.jpg",
        availableSlots: [
          { date: "2025-11-17", time: "12:00", booked: false },
          { date: "2025-11-17", time: "18:00", booked: false },
        ],
      },
      {
        title: "Snow Skiing Trip",
        description: "Hit the slopes for an unforgettable adventure in the snow.",
        price: 200,
        image: "/snowskiingtrip.jpg",
        availableSlots: [
          { date: "2025-11-18", time: "08:00", booked: false },
          { date: "2025-11-18", time: "11:00", booked: false },
          { date: "2025-11-18", time: "15:00", booked: false },
        ],
      },
    ];

    experiences = await Experience.insertMany(sample);
  }

  return Response.json(experiences);
}
