'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function MentorPage() {
  const [showMentor, setShowMentor] = useState(false);

  // Show the page content after small delay
  useEffect(() => {
    const timer = setTimeout(() => setShowMentor(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!showMentor) return null; // hide page until ready

  return (
    <motion.main
      className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.2 }}
    >
      {/* Hero Section */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Badge variant="secondary" className="mb-4 inline-flex items-center gap-2">
          Mentor Spotlight
        </Badge>
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet Eng Abdalla
        </motion.h1>
        <motion.p
          className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Full-Stack Developer & Senior Mentor. Creator of this platform and Grade 12 exam questions and answers. Guiding students to excel in Somali National Exams with modern coding techniques and practical strategies.
        </motion.p>
      </motion.section>

      {/* Mentor Card */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="max-w-md border shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">
          <CardHeader className="p-0 relative h-64 w-full">
            <Image
              src="/eng.jpg"
              alt="Mentor Eng Abdalla"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </CardHeader>
          <CardContent className="text-center space-y-4 p-6">
            <CardTitle className="text-2xl font-bold text-foreground">
              Eng Abdalla
            </CardTitle>
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Creator of the platform and Grade 12 exam content. Passionate about modern web development, mentoring learners, and improving exam readiness for Somali students.
            </motion.p>
            <motion.div
              className="flex justify-center gap-4 mt-4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <a
                href="https://wa.me/252613169435"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
              >
                Contact WhatsApp
              </a>
              <a
                href="https://eng-abdalla-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition-colors dark:border-white dark:text-white"
              >
                Portfolio
              </a>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.main>
  );
}
