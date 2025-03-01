import { useState } from "react";

export default function ToggleSwitch() {
  const [isVeg, setIsVeg] = useState(true);

  const handleToggle = () => {
    const newState = !isVeg;
    setIsVeg(newState);
    console.log(newState ? "Veg" : "Non-Veg");
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isVeg}
        onChange={handleToggle}
      />
      <div
        className={`relative w-11 h-6 rounded-full transition-all ${
          isVeg ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <div
          className={`absolute top-[2px] start-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-all ${
            isVeg ? "translate-x-full rtl:-translate-x-full" : ""
          }`}
        ></div>
      </div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {isVeg ? "Veg" : "Non-Veg"}
      </span>
    </label>
  );
}
