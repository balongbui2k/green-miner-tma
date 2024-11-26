import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/components/icon";

const modalVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: "100%", opacity: 0 },
};

const BottomModal = ({
  title,
  isOpen,
  children,
  handleCloseBottomModal,
}: {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  handleCloseBottomModal: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseBottomModal}
          />

          {/* Modal */}
          <motion.section
            className="absolute bottom-10 left-4 right-4 bg-white rounded-xl shadow-lg py-8 px-10"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center dm-mono-medium">
              <h2 className="text-xl">{title}</h2>
              <button
                className="p-1.5 text-black bg-[#43FF46] rounded-lg border transition-all ease-linear duration-75 will-change-auto border-black shadow-[3px_3px_black]
                active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
                onClick={handleCloseBottomModal}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Nội dung */}
            <div className="mt-4">{children}</div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BottomModal;
