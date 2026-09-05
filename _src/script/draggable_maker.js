function makeDraggable(div) {
  let isDragging = false;
  let offsetX, offsetY;

  div.style.position = 'absolute';
  div.style.cursor = 'move';
  div.style.touchAction = 'none';

  const startDrag = (clientX, clientY) => {
    isDragging = true;
    offsetX = clientX - div.offsetLeft;
    offsetY = clientY - div.offsetTop;
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    div.style.left = clientX - offsetX + 'px';
    div.style.top = clientY - offsetY + 'px';
  };

  const stopDrag = () => {
    isDragging = false;
  };

  // --- Mouse ---
  div.addEventListener('mousedown', (e) => {
    startDrag(e.clientX, e.clientY);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    moveDrag(e.clientX, e.clientY);
  }

  function onMouseUp() {
    stopDrag();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  // Make sure we don't get stuck "dragging" if the mouse leaves the
  // window/tab loses focus (e.g. alt-tabbing) while the button is held.
  window.addEventListener('blur', onMouseUp);
  document.addEventListener('mouseleave', onMouseUp);

  // --- Touch ---
  div.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('touchcancel', onTouchEnd);
  });

  function onTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    moveDrag(touch.clientX, touch.clientY);
  }

  function onTouchEnd() {
    stopDrag();
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    document.removeEventListener('touchcancel', onTouchEnd);
  }
}

