(function () {
  var MAX = 8, GAP = 56, SIZE = 20;
  var nodes = [], next = 0, lastX = 0, lastY = 0, side = 1;
  var doc = document;
  var svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("class", "paw");
  svg.innerHTML = '<path d="M12 22c-3.5 0-6-2-6-4.6 0-1.9 1.3-3.2 2.5-4.6S10.5 10 12 10s2.3 1.4 3.5 2.8S18 15.5 18 17.4C18 20 15.5 22 12 22zM6.4 11.2c-1.2.3-2.5-.8-2.8-2.4s.4-3.1 1.6-3.4 2.5.8 2.8 2.4-.4 3.1-1.6 3.4zm11.2 0c-1.2-.3-1.9-1.8-1.6-3.4s1.6-2.7 2.8-2.4 1.9 1.8 1.6 3.4-1.6 2.7-2.8 2.4zM9.3 8.3c-1.2 0-2.2-1.3-2.2-3s1-3 2.2-3 2.2 1.3 2.2 3-1 3-2.2 3zm5.4 0c-1.2 0-2.2-1.3-2.2-3s1-3 2.2-3 2.2 1.3 2.2 3-1 3-2.2 3z"/>';
  function step(e) {
    var x = e.clientX, y = e.clientY, dx = x - lastX, dy = y - lastY;
    if (dx * dx + dy * dy < GAP * GAP) return;
    var angle = Math.atan2(dy, dx) + Math.PI / 2;
    side = -side;
    var ox = Math.cos(angle) * 10 * side, oy = Math.sin(angle) * 10 * side;
    var node = nodes[next];
    if (!node) {
      node = svg.cloneNode(true);
      nodes[next] = node;
    } else {
      node.remove();
    }
    node.style.transform = "translate3d(" + (x - SIZE / 2 + ox) + "px," + (y - SIZE / 2 + oy) + "px,0) rotate(" + (angle * 180 / Math.PI) + "deg)";
    doc.body.appendChild(node);
    next = (next + 1) % MAX;
    lastX = x;
    lastY = y;
  }
  doc.addEventListener("pointermove", step, { passive: true });
})();
