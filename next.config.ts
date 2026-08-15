import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// 📱 PWA প্লাগইন কনফিগারেশন সেটআপ
const withPWA = withPWAInit({
  dest: "public",                // বিল্ড হওয়া PWA ফাইলগুলো public ফোল্ডারে জমা হবে
  disable: process.env.NODE_ENV === "development", // লোকাল ডেভলপমেন্টে যেন বারবার ক্যাশ ঝামেলা না করে সেজন্য এটি development-এ অফ থাকবে
  register: true,                // অটোমেটিকভাবে সার্ভিস ওয়ার্কার রেজিস্টার করবে
});

const nextConfig: NextConfig = {
  /* আপনার অন্য কোনো নেক্সট-জেএস কনফিগারেশন থাকলে এখানে বসবে */
};

// PWA প্লাগইন দিয়ে মূল কনফিগারেশনকে র‍্যাপ (Wrap) করে এক্সপোর্ট করা
export default withPWA(nextConfig);
