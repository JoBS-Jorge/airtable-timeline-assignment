import React, { useState } from "react";
import assignLanes from "../../assignLanes";
import { getTimelineRange, getItemStyle, getDateStyle } from "../../utils/timelineUtils";
import "./Timeline.css";

const Timeline = ({ items }) => {
  const lanes = assignLanes(items);
  const [timelineStart, timelineEnd] = getTimelineRange(items);
  const [zoom, setZoom] = useState(1);

  // Generate dates at intervals to avoid clutter
  const generateDates = (interval = 3) => {
    const dates = [];
    let current = new Date(timelineStart);
    const end = new Date(timelineEnd);
    let count = 0;

    while (current <= end) {
      if (count % interval === 0) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
      count++;
    }

    return dates;
  };

  const dates = generateDates(3);

  return (
    <div className="timeline-wrapper">
      {/* Zoom controls */}
      <div className="zoom-controls">
        <button onClick={() => setZoom((z) => Math.min(z + 0.2, 5))}>+</button>
        <button onClick={() => setZoom((z) => Math.max(z - 0.2, 0.2))}>-</button>
      </div>

      {/* Timeline header */}
      <div className="timeline-header">
        {dates.map((date, idx) => {
          const topOffset = idx % 2 === 0 ? 0 : 15;
          return (
            <div
              key={idx}
              className="timeline-date"
              style={{ ...getDateStyle(date, timelineStart, timelineEnd, zoom), top: `${topOffset}px` }}
            >
              {date.toISOString().slice(0, 10)}
            </div>
          );
        })}
      </div>

      {/* Timeline lanes */}
      <div className="timeline-container">
        {lanes.map((lane, index) => (
          <div key={index} className="lane">
            {lane.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="item"
                style={getItemStyle(item, timelineStart, timelineEnd, zoom)}
                title={`${item.name} (${item.start} → ${item.end})`}
              >
                {item.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
