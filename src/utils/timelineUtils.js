/**
 * Calculate the overall timeline range
 * @param {Array} items
 * @returns [timelineStart, timelineEnd]
 */
export const getTimelineRange = (items) => {
  const startDates = items.map((i) => new Date(i.start));
  const endDates = items.map((i) => new Date(i.end));
  const timelineStart = Math.min(...startDates.map((d) => d.getTime()));
  const timelineEnd = Math.max(...endDates.map((d) => d.getTime()));
  return [timelineStart, timelineEnd];
};

/**
 * Calculate item position and width according to zoom
 * @param {Object} item
 * @param {Number} timelineStart
 * @param {Number} timelineEnd
 * @param {Number} zoom
 * @returns {Object} style
 */
export const getItemStyle = (item, timelineStart, timelineEnd, zoom = 1) => {
  const start = new Date(item.start).getTime();
  const end = new Date(item.end).getTime();
  const totalDuration = timelineEnd - timelineStart;

  const leftPercent = ((start - timelineStart) / totalDuration) * 100 * zoom;
  const widthPercent = ((end - start) / totalDuration) * 100 * zoom;

  return {
    left: `${leftPercent}%`,
    width: `${widthPercent}%`,
  };
};

/**
 * Calculate date position according to zoom
 * @param {Date} date
 * @param {Number} timelineStart
 * @param {Number} timelineEnd
 * @param {Number} zoom
 * @returns {Object} style
 */
export const getDateStyle = (date, timelineStart, timelineEnd, zoom = 1) => {
  const time = date.getTime();
  const totalDuration = timelineEnd - timelineStart;
  const leftPercent = ((time - timelineStart) / totalDuration) * 100 * zoom;

  return { left: `${leftPercent}%` };
};
