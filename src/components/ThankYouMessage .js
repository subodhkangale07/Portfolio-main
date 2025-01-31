import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper, X } from 'lucide-react'; 

const ThankYouMessage = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
          className="bg-[#1F2937] text-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg relative w-11/12 sm:w-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Rotating sparkles */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-[#4F46E5]" />
          </motion.div>

          {/* Party Popper Animation */}
          <motion.div
            animate={{ x: [-50, 50, -50], y: [-30, 30, -30], rotate: 360 }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2"
          >
            <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-[#A855F7]" />
          </motion.div>

          <motion.h3
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Thank You!
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl mb-6 text-center"
          >
            Your feedback is greatly appreciated!
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThankYouMessage;
