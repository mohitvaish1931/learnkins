import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Portal from './components/Portal';
import Universe1 from './components/Universe1';
import Universe2 from './components/Universe2';
import Universe3 from './components/Universe3';
import Universe4 from './components/Universe4';
import SecretUniverse from './components/SecretUniverse';

type UniverseType = 'portal' | 'universe1' | 'universe2' | 'universe3' | 'universe4' | 'secret';

function App() {
  const [currentUniverse, setCurrentUniverse] = useState<UniverseType>('portal');

  const transitionVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentUniverse === 'portal' && (
          <motion.div
            key="portal"
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <Portal onEnter={() => setCurrentUniverse('universe1')} />
          </motion.div>
        )}

        {currentUniverse === 'universe1' && (
          <motion.div
            key="universe1"
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <Universe1 onNext={() => setCurrentUniverse('universe2')} />
          </motion.div>
        )}

        {currentUniverse === 'universe2' && (
          <motion.div
            key="universe2"
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <Universe2 onNext={() => setCurrentUniverse('universe3')} />
          </motion.div>
        )}

        {currentUniverse === 'universe3' && (
          <motion.div
            key="universe3"
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <Universe3 onNext={() => setCurrentUniverse('universe4')} />
          </motion.div>
        )}

        {currentUniverse === 'universe4' && (
          <motion.div
            key="universe4"
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <Universe4 onNext={() => setCurrentUniverse('secret')} />
          </motion.div>
        )}

        {currentUniverse === 'secret' && (
          <motion.div
            key="secret"
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <SecretUniverse />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
