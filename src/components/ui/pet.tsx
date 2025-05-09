"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const getRandomPosition = () => {
  const x = Math.floor(Math.random() * 90); // 0% - 80% horizontal
  const y = Math.floor(Math.random() * 70); // 0% - 40% vertical
  return { x, y };
};

export const Pet = () => {
  const [position, setPosition] = useState(getRandomPosition());

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(getRandomPosition());
    }, 2000); // bergerak setiap 2 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="text-4xl absolute"
      animate={{
        x: `${position.x}%`,
        y: `${position.y}%`,
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
      }}
    >
      <Image
        src="/horse.gif"
        alt="horse"
        width={2000}
        height={2000}
        className="w-32 h-32"
      />
    </motion.div>
  );
};
