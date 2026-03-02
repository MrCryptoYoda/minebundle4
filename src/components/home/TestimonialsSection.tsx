import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TESTIMONIALS = [
  {
    id: 1,
    name: "James Wilson",
    role: "Mining Project Director",
    quote: "The Minexchange has completely transformed how we source capital for our exploration projects. The platform's ability to match us with qualified investors who understand the mining lifecycle is unmatched. We closed our Series A funding in record time.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Investment Analyst",
    quote: "Finding verified mining assets used to take months of due diligence before we even spoke to a seller. With The Minexchange's standardized data rooms and verification process, we can screen opportunities in minutes. It's a game-changer for our firm.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Senior Geologist",
    quote: "The technical depth of the listings on this platform is impressive. Unlike general marketplaces, The Minexchange provides the specific geological data and reporting standards we need to make initial assessments immediately.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -20 : 20,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            What Our Users Say About Us
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            Real Stories Real Users, Backed by Real Results.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-20">
          
          {/* Navigation Buttons - Absolute Positioning Outside Content */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={handlePrev}
              className="h-14 w-14 rounded-full bg-slate-950 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 transition-transform hover:scale-110"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleNext}
              className="h-14 w-14 rounded-full bg-slate-950 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 transition-transform hover:scale-110"
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Main Content Area - Detached Cards */}
          <div className="flex flex-col md:flex-row gap-6 md:h-[450px]">
            
            {/* Image Card */}
            <div className="w-full md:w-[400px] h-[300px] md:h-full relative overflow-hidden rounded-[2.5rem] shrink-0">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={TESTIMONIALS[currentIndex].id}
                  src={TESTIMONIALS[currentIndex].image}
                  alt={TESTIMONIALS[currentIndex].name}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            {/* Text Card */}
            <div className="flex-1 bg-slate-50 p-8 md:p-12 rounded-[2.5rem] relative flex flex-col justify-center">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={TESTIMONIALS[currentIndex].id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col h-full"
                  >
                    <blockquote className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8 flex-grow">
                      "{TESTIMONIALS[currentIndex].quote}"
                    </blockquote>
                    
                    <div className="mt-auto">
                      <h4 className="text-2xl font-bold text-slate-900 mb-1">
                        {TESTIMONIALS[currentIndex].name}
                      </h4>
                      <p className="text-slate-500 font-medium text-lg">
                        {TESTIMONIALS[currentIndex].role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Blocky Quote Icon Decoration */}
              <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-10 pointer-events-none select-none">
                <svg width="100" height="80" viewBox="0 0 100 80" fill="currentColor" className="text-slate-900">
                  <path d="M0 0H30V30H10V50H30V80H0V0ZM50 0H80V30H60V50H80V80H50V0Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center gap-4 mt-8">
            <Button
              variant="secondary"
              size="icon"
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-slate-950 text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-slate-950 text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "w-8 bg-slate-500" 
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
