function makeDraggable(div) {
  let isDragging = false;
  let offsetX, offsetY;

  div.style.position = 'absolute';
  div.style.cursor = 'move';

  div.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - div.offsetLeft;
    offsetY = e.clientY - div.offsetTop;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    div.style.left = e.clientX - offsetX + 'px';
    div.style.top = e.clientY - offsetY + 'px';
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}
