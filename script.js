// Smooth scroll for buttons/links with data-scroll
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-scroll]');
  if (!t) return;
  const sel = t.getAttribute('data-scroll');
  const el = document.querySelector(sel);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Simple parallax on the left hero background on scroll (very light)
const leftHalf = document.querySelector('.hero-left img');
if (leftHalf) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.15;
    leftHalf.style.transform = `translateY(${y}px)`;
  });
}

// Tiny timeline chart (canvas) — illustrative declining trend
(function initTimeline(){
  const box = document.getElementById('timeline');
  if (!box) return;
  const c = document.createElement('canvas');
  box.appendChild(c);
  const ctx = c.getContext('2d');

  // Resize handling
  function sizeCanvas() {
    c.width = box.clientWidth * window.devicePixelRatio;
    c.height = box.clientHeight * window.devicePixelRatio;
    draw();
  }
  window.addEventListener('resize', sizeCanvas, { passive: true });
  sizeCanvas();

  function drawAxes() {
    ctx.save();
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    const w = box.clientWidth;
    const h = box.clientHeight;
    // y axis
    ctx.beginPath(); ctx.moveTo(24, 8); ctx.lineTo(24, h - 8); ctx.stroke();
    // x axis
    ctx.beginPath(); ctx.moveTo(24, h - 16); ctx.lineTo(w - 16, h - 16); ctx.stroke();
    ctx.restore();
  }

  function drawLine() {
    const w = c.width;
    const h = c.height;
    const padL = 24 * window.devicePixelRatio;
    const padB = 16 * window.devicePixelRatio;

    // Build a smooth declining path
    const pts = [];
    const n = 12;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = padL + t * (w - padL - 16 * window.devicePixelRatio);
      const y = 0.25*h + 0.1*h * Math.sin(t*2*Math.PI) + t * 0.55*h; // general decline
      pts.push({x,y});
    }

    // Area
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.lineTo(pts[pts.length-1].x, h - padB);
    ctx.lineTo(pts[0].x, h - padB);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(52, 211, 153, 0.6)');
    grad.addColorStop(1, 'rgba(52, 211, 153, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(52, 211, 153)';
    ctx.stroke();
  }

  function drawTicks() {
    const w = c.width / window.devicePixelRatio;
    const h = c.height / window.devicePixelRatio;
    const ctx2 = c.getContext('2d');
    ctx2.save();
    ctx2.fillStyle = 'rgba(255,255,255,0.6)';
    ctx2.font = '10px system-ui, sans-serif';
    ctx2.fillText('2010', 16, h - 2);
    ctx2.fillText('2025', w/2 - 12, h - 2);
    ctx2.fillText('2045', w - 36, h - 2);
    ctx2.restore();
  }

  function draw() {
    ctx.clearRect(0,0,c.width,c.height);
    drawAxes();
    drawLine();
    drawTicks();
  }
})();