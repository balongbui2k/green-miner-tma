import { CopyIcon, PixelCloseIcon } from "./icon.tsx";
import walletModalBackground from "@/assets/images/wallet-modal.png";
import QrImage from "@/assets/images/qr.png";
import { AnimatePresence, motion } from "framer-motion";
import { truncateFromMiddle } from "@/utils/index.tsx";
import LongYellowButton from "@/assets/svgs/long-yellow-button.svg";
import { toast } from "react-hot-toast";
import { AC_KEY } from "@/utils/constants.ts";
import type { TonConnectUI } from "@tonconnect/ui-react";

const modalVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: "100%", opacity: 0 },
};

const WalletModal = ({
  isOpen,
  tonAddress,
  tonConnectUI,
  handleCloseWalletModal,
}: {
  isOpen: boolean;
  tonAddress: string;
  tonConnectUI: TonConnectUI;
  handleCloseWalletModal: () => void;
}) => {
  const handleDisconnectWalletClick = async () => {
    try {
      if (tonAddress) {
        await tonConnectUI.disconnect();
        localStorage.removeItem(AC_KEY);
        handleCloseWalletModal();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(tonAddress);
    toast.success("Wallet address copied to clipboard");
  };

  const truncateAddress = () => {
    return truncateFromMiddle(tonAddress, 25, "...");
  };
  return (
    <AnimatePresence>
      <motion.section
        className="z-10 relative flex justify-center items-center"
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        exit="exit"
        variants={modalVariants}
        transition={{ type: "spring", stiffness: 250, mass: 0.5 }}
      >
        <img
          src={walletModalBackground}
          alt="wallet modal background"
          className="w-[390px] h-[204px]"
        />
        <p className="absolute top-3 text-2xl font-pixelify-sans font-medium text-black">
          My wallet
        </p>
        <button
          className="absolute top-4 right-4 active:opacity-80"
          onClick={handleCloseWalletModal}
        >
          <PixelCloseIcon />
        </button>

        <div className="absolute flex items-center justify-between w-[calc(100%-60px)]">
          <div className="flex items-center gap-x-2">
            <img src={QrImage} alt="qr image" className="w-8 h-8" />
            <div className="text-base font-medium text-black line-clamp-2">
              {truncateAddress()}
            </div>
          </div>

          <button
            type="button"
            onClick={copyAddress}
            className="text-[#F4C0D7] hover:opacity-65 active:opacity-95"
          >
            <CopyIcon />
          </button>
        </div>

        <button
          type="button"
          onClick={handleDisconnectWalletClick}
          className="absolute bottom-7 flex justify-center items-center hover:opacity-85 active:opacity-95"
        >
          <span className="w-72 min-[390px]:w-80 flex justify-center">
            <LongYellowButton />
          </span>
          <p className="absolute font-pixelify-sans text-lg font-medium">
            Disconnect Wallet
          </p>
        </button>
      </motion.section>
    </AnimatePresence>
  );
};

export default WalletModal;
