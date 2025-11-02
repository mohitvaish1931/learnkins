import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Universe2Props {
  onNext: () => void;
}

const timelineEvents = [
  {
    title: 'The Coffee Shop That Never Was',
    description: 'We bumped into each other, spilling coffee and laughter. An apology turned into hours of conversation.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    title: 'The Rain Dance',
    description: 'Caught in an unexpected storm, we danced in the rain instead of running for shelter. Our first kiss tasted like raindrops.',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    title: 'The Bookstore Encounter',
    description: 'Reaching for the same book, our hands touched. You smiled, I blushed. We spent the afternoon reading poetry to each other.',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    title: 'The Starlit Rooftop',
    description: 'A random rooftop party. We escaped the crowd to watch the stars, sharing dreams and secrets until sunrise.',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    title: 'The Train Platform',
    description: 'Two strangers waiting for delayed trains. A conversation that made us both miss our rides—on purpose.',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    title: 'The Art Gallery',
    description: 'Standing before the same painting, seeing different worlds. You showed me yours, I showed you mine. We\'ve been exploring together ever since.',
    gradient: 'from-rose-400 to-pink-500',
  },
];

export default function Universe2({ onNext }: Universe2Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : timelineEvents.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < timelineEvents.length - 1 ? prev + 1 : 0));
  };

  const currentEvent = timelineEvents[currentIndex];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Universe II
          </h2>
          <p className="text-xl md:text-2xl text-purple-200">
            The Timeline That Never Happened
          </p>
        </motion.div>

        <div className="w-full max-w-4xl relative">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-purple-600/30 hover:bg-purple-600/50 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="flex-1 mx-8">
              <div className="flex justify-center space-x-2 mb-4">
                {timelineEvents.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-8 bg-purple-400' : 'w-2 bg-purple-600/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-purple-600/30 hover:bg-purple-600/50 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-500/20">
              <motion.div
                className={`text-3xl md:text-4xl font-serif bg-gradient-to-r ${currentEvent.gradient} text-transparent bg-clip-text mb-6`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentEvent.title}
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-purple-100 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentEvent.description}
              </motion.p>

              <motion.div
                className="mt-8 flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                <span className="text-purple-300 text-sm">
                  {currentIndex + 1} of {timelineEvents.length}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.button
          className="mt-16 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Continue Journey →
        </motion.button>
      </div>
    </div>
  );
}
