import React from "react";
import ReactTooltip from "react-tooltip";

export const daySecond = 86400;

export const getTodayOffset = (date = new Date()) => {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
};

export default function TimelineEvent({
  unit = 128,
  data,
  zeroPoint,
  ...props
}) {
  const startPosition = zeroPoint * 3600;
  const fullWidth = unit * 24;

  // calc time
  let startedDate = new Date(data?.started * 1000);
  let endedDate = new Date(data?.ended * 1000);
  let start = getTodayOffset(startedDate);
  let end = getTodayOffset(endedDate);
  let style = {};
  let widthCnt = 0;
  if (end - start < 0) {
    widthCnt = daySecond - (start - end);
  } else {
    widthCnt = end - start;
  }

  let _left = (fullWidth * (start - startPosition)) / daySecond;
  let _width = (fullWidth * widthCnt) / daySecond;

  if (_left + _width > fullWidth) {
    _width = fullWidth - _left;
  }

  if (start < startPosition) {
    start = startPosition;
    _left = 0;
    _width = fullWidth - (fullWidth * (startPosition - end)) / daySecond;
  }

  // calc event type
  const border = data?.type === "PLANNED";
  const eventType =
    data?.type === "PLANNED" || data?.type === "STREAMED"
      ? 1
      : data?.type === "PREDICTED"
      ? 2
      : data?.type === "LIVE"
      ? 3
      : 4;

  const borderClasses = `${
    Boolean(_left + _width >= fullWidth) ? "border-r-0 rounded-r-none" : ""
  } ${Boolean(start <= startPosition) ? "border-l-0 rounded-l-none" : ""}`;

  return (
    <div
      className={`flex flex-row absolute h-16 flex-shrink-0 flex-grow-0 whitespace-nowrap overflow-hidden`}
      style={
        Number(eventType) === 1
          ? {
              left: _left,
              width: _width,
              flexBasis: _width,
            }
          : eventType === 2
          ? {
              left: _left - 64,
              width: _width,
              flexBasis: _width,
            }
          : eventType === 3
          ? {
              left: (fullWidth * (start - startPosition)) / daySecond,
            }
          : {
              left: (fullWidth * (start - startPosition)) / daySecond,
            }
      }
    >
      {Boolean(eventType === 2) && (
        <div
          className={`w-16 bg-gradient-to-r from-transparent via-event-dark to-event-dark border-0 ${borderClasses}`}
        >
          &nbsp;
        </div>
      )}
      <div
        className={`px-2 w-full flex flex-col justify-around bg-event-dark cursor-pointer overflow-x-hidden z-10 ${
          eventType === 2 // both grad
            ? "rounded-none border-0"
            : eventType === 3 // right grad
            ? "rounded-l-lg"
            : "rounded-lg border-2"
        } ${
          Boolean(border) ? "border-red-600" : "border-transparent"
        } ${borderClasses}`}
      >
        <div
          className={`font-bold w-full overflow-hidden text-sm  ${
            Boolean(!border) ? "text-white" : ""
          }`}
        >
          {data?.title ?? ""}
        </div>
        <div className="flex flex-row">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex justify-flex-start items-center">
              <span
                className={`${
                  Boolean(!border) && Number(eventType) !== 3
                    ? "text-event-no-active"
                    : "text-white"
                } text-xs`}
              >
                ⬤
              </span>
              <span className="text-xs px-2" data-tip={data?.type ?? ""}>
                {data?.type ?? ""}
              </span>
              <ReactTooltip />
            </div>
            {eventType !== 4 ? (
              <div
                className={`${
                  Boolean(!border) && Number(eventType) !== 3
                    ? "text-event-no-active"
                    : "text-white"
                } text-xs`}
                data-tip={data?.views}
              >
                {data?.views}
                <ReactTooltip />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {eventType !== 4 ? (
          <div className="flex flex-row">
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex justify-flex-start items-center">
                <span className="text-xs" data-tip={data?.searchterms}>
                  {data?.searchterms}
                </span>
                <ReactTooltip />
                <span
                  className={`${
                    Boolean(!border) && Number(eventType) !== 3
                      ? "text-event-no-active"
                      : "text-white"
                  } text-xs px-2`}
                  data-tip={data?.searchterms}
                >
                  {data?.searchterms}
                </span>
                <ReactTooltip />
              </div>
              <div
                className={`${
                  Boolean(!border) && Number(eventType) !== 3
                    ? "text-event-no-active"
                    : "text-white"
                } text-xs`}
                data-tip={data?.title}
              >
                {data?.title}
              </div>
              <ReactTooltip />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {Boolean(eventType < 4 && eventType >= 2) && (
        <div className="w-16 bg-gradient-to-l from-transparent via-event-dark to-event-dark border-r-0">
          &nbsp;
        </div>
      )}
      {Boolean(eventType === 4) && (
        <div className="flex flex-row justify-start items-center">
          <div className="h-2/3 rounded-r-full w-6 -m-3 z-0 bg-time-puple">
            &nbsp;
          </div>
        </div>
      )}
    </div>
  );
}
