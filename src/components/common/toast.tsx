import { useEffect } from "react";
import toast, { type Toast } from "react-hot-toast";

function ToastComponent({
  t,
  text,
  children,
  duration = 3000,
}: {
  t: Toast;
  text?: string;
  children?: React.ReactNode;
  duration?: number;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.remove(t.id);
    }, duration);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } w-full bg-container-brown-400 pointer-events-auto flex items-start ring-1 ring-black ring-opacity-5 p-3 pl-5 -translate-y-4 scale-110`}
    >
      <div className="flex-1">
        <div className="flex items-start">
          {children ? (
            children
          ) : (
            <div className="ml-3 flex-1">
              <p className="text-base font-normal text-primary">{text}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
          className="w-full p-2 flex items-center justify-center text-sm font-medium text-white rounded-none bg-transparent hover:bg-transparent"
        >
          {/* <CloseIcon size={20} /> */}
        </button>
      </div>
    </div>
  );
}

export default ToastComponent;
