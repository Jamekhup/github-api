import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { AiFillCloseSquare } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="absolute inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      <div
        className="absolute top-20 lg:right-[25%] lg:left-[25%] md:right-[20%] md:left-[20%] sm:right-[10%] sm:left-[10%] left-[5%] right-[5%] z-50 flex items-start
      justify-center bg-red-200 rounded-md"
      >
        <div
          className={`bg-white rounded-lg shadow-xl w-full relative animate-fadeInUp`}
        >
          <div className="p-3 bg-gray-200 rounded-t-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={onClose}
            >
              <AiFillCloseSquare className="text-red-500" />
            </button>
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
