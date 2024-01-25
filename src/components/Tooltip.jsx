import React, { useState } from "react";

const Tooltip = ({ text, children, mouseEnter = true }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => {
          if (mouseEnter) setShowTooltip(true);
        }}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <span className=" top-0 tooltip rounded shadow-lg p-1 bg-white text-secondary absolute  z-100 -mt-8">
          {text}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
