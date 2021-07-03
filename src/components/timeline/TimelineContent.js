import React from "react";
import TimelineAvatar from "./TimelineAvatar";
import TimelineEvent, { daySecond, getTodayOffset } from "./TimelineEvent";

export const filterEventByToday = (event, zeroPoint) => {
  const now = new Date().getTime() / 1000 - getTodayOffset(new Date());
  if (event.started) {
    if (event.started > now + daySecond) {
      return false;
    }
  }
  if (event.ended) {
    if (event.ended < now) {
      return false;
    }
  }
  return true;
};

export default function TimelineContent({
  heading = "",
  unit = 128,
  data = {},
  zeroPoint = 0,
  ...props
}) {
  const events = data?.Priority2Creator?.contents?.items ?? [];

  return (
    <div className="h-16 flex flex-row my-2 relative">
      <div className="w-18 sm:w-28 fixed z-20 h-16 flex flex-row justify-start bg-event-content">
        <div className="h-full w-10 p-2 text-3xl font-bold bg-event-dark rounded-l-lg justify-center items-center hidden sm:flex">
          {heading ?? ""}
        </div>
        <div className="w-16">
          <TimelineAvatar
            className={""}
            src={data?.Priority2Creator?.platformProfileImageUrl ?? ""}
          />
        </div>
      </div>
      <div className="ml-28 fixed w-full h-16 bg-event-content">&nbsp;</div>
      <div className="ml-28 relative w-full">
        {(events ?? [])
          .filter((item) => filterEventByToday(item, zeroPoint))
          .map((item, index) => (
            <TimelineEvent key={index} unit={unit} data={item} />
          ))}
      </div>
    </div>
  );
}
