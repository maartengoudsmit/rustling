const relativeDate = (input) => {
  const diff = new Date(input) - Date.now();
  const rel = new Intl.RelativeTimeFormat("en", {
    style: "long",
    numeric: "auto",
  });

  const units = [
    { unit: "year", ms: 1000 * 60 * 60 * 24 * 365 },
    { unit: "month", ms: 1000 * 60 * 60 * 24 * 30 },
    { unit: "week", ms: 1000 * 60 * 60 * 24 * 7 },
    { unit: "day", ms: 1000 * 60 * 60 * 24 },
    { unit: "hour", ms: 1000 * 60 * 60 },
    { unit: "minute", ms: 1000 * 60 },
  ];

  // Find the largest time unit that exceeds the corresponding ms thresholds
  const { unit, ms } =
    units.find(({ ms }) => Math.abs(diff) >= ms) ?? units.at(-1);
  return rel.format(Math.round(diff / ms), unit);
};

const updateRelativeDate = () => {
  const elements = document.querySelectorAll(".relative-date");
  elements.forEach((el) => {
    // The relative_data filter bakes the date for each post into
    // the span element as data-date
    el.textContent = relativeDate(el.dataset.date);
  });
};

export { relativeDate, updateRelativeDate };
