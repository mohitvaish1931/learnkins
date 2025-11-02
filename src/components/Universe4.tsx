import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

interface Universe4Props {
  onNext: () => void;
}

export default function Universe4({ onNext }: Universe4Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const loveLetter = `My Jann,

Aaj tera birthday hai… aur mujhe honestly samajh nahi aa raha kya likhu, kyunki mere emotions shabd se bade hain. Tum meri life ka wo hissa ban chuki ho jahan sab kuch tumse hi start hota hai aur tumpe hi end hota hai.

Baby, tu sirf ek naam nahi hai mere liye — tu meri peace hai, meri reason to smile, meri heartbeat. Jab bhi life thoda heavy lagta hai, bas tera naam yaad aata hai… aur sab kuch halkasa lagta hai.

Mujhe yaad hai wo pehli baar jab hum mile the(comment section se dm se vc se dil lo me) — tab mujhe yeh bilkul nahi pata tha ki tu meri zindagi ka itna khoobsurat chapter ban jaayegi. Tere bina har din adhura lagta hai. Kabhi kabhi sochta hoon, agar tu meri life mein nahi aati toh main waise hi rehta, bina kisi roshni ke. Tu meri light hai Vaishnavi, wo soft si warmth jo dil ke sab corners tak pahuchti hai.

Tu hasti hai toh lagta hai duniya ruk jaaye. Tu naraz hoti hai toh lagta hai sab kuch galat ho gaya.
Aur jab tu “LALWANIII, BABBEE” bolti hai na… dil ke andar ek sukoon sa aa jaata hai.

On your birthday, main sirf ek wish karta hoon — tera har din aise hi khubsurat ho jaise tera dil hai. Tere life mein kabhi aansu aaye toh bas khushi ke ho. Aur main hamesha yahin rahoon, tere saath, tere paas — chahe duniya idhar ki udhar ho jaaye.

Vaishnavi, I love you not because you’re perfect, but because you’re real — meri har kami, har muskurahat, har sapne ke saath tune mujhe accept kiya. Aur main wada karta hoon, main hamesha tera rahunga… without any condition, without any end.

Happy Birthday, my love.
Tu meri duniya hai — aur duniya ko aaj ek aur reason mila celebrate karne ka, kyunki aaj tu paida hui thi. 💖

Forever yours,
Mohit`;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= loveLetter.length) {
        setDisplayedText(loveLetter.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [loveLetter]);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      <Canvas className="absolute inset-0 w-full h-screen">
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.3} />
      </Canvas>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Universe IV
          </h2>
          <p className="text-xl md:text-2xl text-purple-200">
            The Final Reality
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full max-w-3xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-purple-500/20"
        >
          <div className="space-y-6">
            <div className="text-purple-200 text-base md:text-lg leading-relaxed font-serif whitespace-pre-wrap">
              {displayedText}
              {!isComplete && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-1 h-6 bg-purple-400 ml-1"
                />
              )}
            </div>
          </div>
        </motion.div>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 font-serif italic">
              No matter the universe, it's always you.
            </p>

            <motion.button
              className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Unlock Final Portal →
            </motion.button>
          </motion.div>
        )}

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
