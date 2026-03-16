"use client";

import HomeCover from "@/components/HomeCover";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <main className="min-h-screen">
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen onComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>
      <HomeCover />
    </main>
  );
}
