/**
 * Generate a wobbly, hand-drawn looking SVG line
 *
 * @param {number} x1 - Start X
 * @param {number} y1 - Start Y
 * @param {number} x2 - End X
 * @param {number} y2 - End Y
 * @param {object} opts - Options
 * @param {number} opts.wobble - Max perpendicular displacement (default: 3)
 * @param {number} opts.segments - Number of segments (default: auto based on length)
 * @param {number} opts.roughness - How jagged vs smooth (0-1, default: 0.5)
 * @param {string} opts.stroke - Stroke color (default: "currentColor")
 * @param {number} opts.strokeWidth - Stroke width (default: 1.5)
 * @returns {string} SVG path d attribute or full <path> element
 */
function wobblyLine(x1, y1, x2, y2, opts = {}) {
  const {
    wobble = 3,
    segments = null,
    roughness = 0.5,
    stroke = "currentColor",
    strokeWidth = 1,
    asPath = true, // return full <path> element vs just d attribute
  } = opts;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Auto-calculate segments: roughly 1 per 10-15px
  const numSegments = segments ?? Math.max(4, Math.round(length / 12));

  // Unit vector along the line
  const ux = dx / length;
  const uy = dy / length;

  // Perpendicular vector
  const px = -uy;
  const py = ux;

  // Generate wobble offsets with some smoothing
  const offsets = [];
  for (let i = 0; i <= numSegments; i++) {
    if (i === 0 || i === numSegments) {
      // Keep endpoints close to exact
      offsets.push((Math.random() - 0.5) * wobble * 0.2);
    } else {
      offsets.push((Math.random() - 0.5) * 2 * wobble);
    }
  }

  // Smooth offsets based on roughness (lower roughness = more smoothing)
  const smoothed = [...offsets];
  const passes = Math.round((1 - roughness) * 4);
  for (let p = 0; p < passes; p++) {
    for (let i = 1; i < smoothed.length - 1; i++) {
      smoothed[i] =
        smoothed[i] * 0.5 + (smoothed[i - 1] + smoothed[i + 1]) * 0.25;
    }
  }

  // Build points
  const points = [];
  for (let i = 0; i <= numSegments; i++) {
    const t = i / numSegments;
    const x = x1 + dx * t + px * smoothed[i];
    const y = y1 + dy * t + py * smoothed[i];
    points.push({ x, y });
  }

  // Build a smooth cubic bezier path through points (Catmull-Rom → Bezier)
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    // Catmull-Rom to cubic bezier conversion
    const tension = 0.3 + roughness * 0.3;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(
      2,
    )} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  if (!asPath) return d;

  return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

const container = document.querySelector("#wobbly-divider");
const svg = container.querySelector("svg");
const width = container.clientWidth;
svg.setAttribute("viewBox", `0 0 ${width} 20`);
svg.setAttribute("preserveAspectRatio", "none");
const wobbly = wobblyLine(0, 10, width, 10, {
  wobble: 1.5,
  roughness: 0.4,
  asPath: false,
});
const fillPath = `M 0 0 L 0 10 ${wobbly.replace("M", "L")} L ${width} 0 Z`;
svg.innerHTML = `<path id="wobbly-divider-fill" d="${fillPath}" stroke="none"/>
  <path id="wobbly-divider-line" d="${wobbly}" fill="none" stroke-width="1.5" stroke-linecap="round"/>`;
