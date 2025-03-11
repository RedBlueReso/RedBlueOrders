import React from 'react';
import QRimg from '../images/redblueqr.jpg';

const QRPage = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <img src={QRimg} alt="Checkout Image" className="max-w-full max-h-full" />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-md"
      >
        Close
      </button>
    </div>
  );
};

export default QRPage;
