import React, { useRef, useState, useEffect } from "react";
import TimelineContent from "./TimelineContent";
import TimelineRuller from "./TimelineRuller";

export const unit = 128;

export default function Timeline({ title = "", data = [], ...props }) {
  const refScroller = useRef();
  const [zeroPoint, setZeroPoint] = useState(0);
  const [isInit, setIsInit] = useState(false);

  const changeScrollHeight = (e) => {
    if (e === "next") {
      refScroller.current.scrollLeft =
        refScroller.current.scrollLeft + refScroller.current.scrollWidth / 8;
    } else {
      refScroller.current.scrollLeft =
        refScroller.current.scrollLeft - refScroller.current.scrollWidth / 8;
    }
  };

  const initScroll = () => {
    refScroller.current.scrollLeft =
      Number(refScroller?.current?.scrollWidth) / 3 - window.innerWidth / 3;
  };

  useEffect(() => {
    if (typeof refScroller?.current?.scrollLeft === "number") {
      initScroll();
    }
  }, [refScroller]);

  useEffect(() => {
    setInterval(() => {
      setZeroPoint((new Date().getHours() + 24 - 8) % 24);
      if (!isInit) {
        setIsInit(true);
      }
    }, 1000);
  }, []);
  return (
    <div className="relative pt-5 px-7 bg-gray-900 text-time-puple font-poppins overflow-hidden whitespace-nowrap">
      {!Boolean(isInit) && (
        <div className="absolute h-full w-full bg-gray-900 z-50 -mt-5 -mx-7 overflow-hidden"></div>
      )}
      {Boolean(title?.length) && (
        <span className="text-3xl font-bold">{title ?? ""}</span>
      )}
      <div
        ref={refScroller}
        className="w-full pt-8 overflow-x-auto h-full overflow-y-hidden"
        style={{ scrollBehavior: Boolean(isInit) ? "smooth" : "unset" }}
      >
        <TimelineRuller
          unit={unit}
          count={data?.length ?? 0}
          onNext={() => changeScrollHeight("next")}
          onBefore={() => changeScrollHeight("before")}
          zeroPoint={zeroPoint}
        />
        {(data ?? []).map((item, index) => {
          return (
            <TimelineContent
              key={index}
              heading={index + 1}
              data={item}
              unit={unit}
              zeroPoint={zeroPoint}
            />
          );
        })}
      </div>
    </div>
  );
}
