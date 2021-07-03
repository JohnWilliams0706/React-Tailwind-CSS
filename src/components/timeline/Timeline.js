import React, { useRef, useState, useEffect } from 'react'
import TimelineContent from './TimelineContent'
import TimelineRuller from './TimelineRuller'

export const unit = 128

export default function Timeline({ title = '', data = [], ...props }) {
  const refScroller = useRef()
  const [zeroPoint, setZeroPoint] = useState(0)

  const changeScrollHeight = (e) => {
    if (e === 'next') {
      refScroller.current.scrollLeft =
        refScroller.current.scrollLeft + refScroller.current.scrollWidth / 8
    } else {
      refScroller.current.scrollLeft =
        refScroller.current.scrollLeft - refScroller.current.scrollWidth / 8
    }
  }

  const initScroll = () => {
    refScroller.current.scrollLeft =
      Number(refScroller?.current?.scrollWidth) / 3 - window.innerWidth / 3
  }

  useEffect(() => {
    if (typeof refScroller?.current?.scrollLeft === 'number') {
      initScroll()
    }
  }, [refScroller])

  useEffect(() => {
    setInterval(() => {
      setZeroPoint((new Date().getHours() + 24 - 8) % 24)
    }, 1000)
  }, [])
  return (
    <div className="pt-5 px-7 bg-gray-900 text-time-puple font-poppins overflow-hidden whitespace-nowrap">
      {Boolean(title?.length) && (
        <span className="text-3xl font-bold">{title ?? ''}</span>
      )}
      <div
        ref={refScroller}
        className="w-full pt-8 overflow-x-auto h-full overflow-y-hidden"
        style={{ scrollBehavior: 'smooth' }}
      >
        <TimelineRuller
          unit={unit}
          count={data?.length ?? 0}
          onNext={() => changeScrollHeight('next')}
          onBefore={() => changeScrollHeight('before')}
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
          )
        })}
      </div>
    </div>
  )
}
