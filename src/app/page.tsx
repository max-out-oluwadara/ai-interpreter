"use client"; // ✅ Ensure this runs as a Client Component

import Container from "@/components/Container";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full sm:mx-0 sm:bg-[#EEEEEE] lg:bg-background">
      <Container />
    </div>
  );
}
