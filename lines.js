console.log('lines.js is executed');

class Line {
  constructor(x, y, direction, segments) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.segments = segments;
    this.path = `M${this.x},${this.y}`;
  }

  update() {
    this.segments.forEach((segment) => {
      this.x += segment.length * Math.cos(segment.angle);
      this.y += segment.length * Math.sin(segment.angle);
      this.path += ` L${this.x},${this.y}`;
    });
  }
}

function createLine() {
  const direction = Math.random() > 0.5 ? 1 : -1;
  const startY = Math.random() * 480;
  const x = direction > 0 ? 0 : 100;
  const y = startY;
  const numSegments = Math.floor(Math.random() * 5) + 3;
  const segments = [];

  for (let i = 0; i < numSegments; i++) {
    let angle;
    if (i === 0 || i === numSegments - 1) {
      angle = Math.PI / 2 * direction;
    } else {
      angle = (direction > 0 ? Math.PI / 2 : (3 * Math.PI) / 2) + (Math.random() * Math.PI - Math.PI / 2);
    }

    const length = Math.random() * 10 + 5;
    segments.push({ angle, length });
  }

  return new Line(x, y, direction, segments);
}

const lines = [];
const svg = document.getElementById('circuit-lines');
svg.setAttribute('viewBox', `0 0 100 480`);
svg.setAttribute('preserveAspectRatio', 'none');

function updateLines() {
  if (lines.length < 10) {
    const line = createLine();
    line.update();

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#fff');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('d', line.path);
    svg.appendChild(path);

    lines.push({ line, path });
  }

  lines.forEach(({ line, path }) => {
    line.update();
    path.setAttribute('d', line.path);
  });
}

setInterval(updateLines, 20);