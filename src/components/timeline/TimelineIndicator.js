import React from "react";
import { daySecond } from "./TimelineEvent";

export default function TimelineIndicator({
  unit = 128,
  count = 0,
  zeroPoint = 0,
  ...props
}) {
  const fullWidth = unit * 24;
  const now = new Date();
  const currentTime =
    ((now.getHours() + 24 - zeroPoint) % 24) * 3600 +
    now.getMinutes() * 60 +
    now.getSeconds();
  return (
    <>
      <div
        className="absolute z-30"
        style={{
          left: (fullWidth * currentTime) / daySecond - 24,
          top: -30,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="43"
          height="43"
          viewBox="0 0 43 43"
        >
          <g id="LayzrLogo" transform="translate(0 -0.217)">
            <circle
              id="Ellipse_16"
              data-name="Ellipse 16"
              cx="21.5"
              cy="21.5"
              r="21.5"
              transform="translate(0 0.217)"
              fill="#ff0f50"
            />
            <path
              id="Path_14"
              data-name="Path 14"
              d="M472.709,316.444,467,310l6.348,3.194-3.473-5.35,4.432,2.076-.838-2.795,3.893,2.1L478.838,287h.719l1.5,22.218,3.893-2.1-.838,2.815,4.452-2.116-3.493,5.37L491.594,310l-5.929,6.448Z"
              transform="translate(-457.678 -281.133)"
              fill="#fff"
            />
          </g>
        </svg>
      </div>
      <div
        className="absolute border-r-4 border-time-puple overflow-hidden z-20 pointer-events-none"
        style={{
          width: (fullWidth * currentTime) / daySecond,
          // h-16 my-2 : 64 + 16 : 80
          height: count * 80 + 3,
        }}
      >
        <div className="h-full w-full mix-blend-hard-light bg-gray-900 opacity-10 pointer-events-none">
          &nbsp;
        </div>
      </div>
    </>
  );
}
