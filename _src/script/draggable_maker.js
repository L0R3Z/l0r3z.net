function makeDraggable(div) {
  let isDragging = false;
  let startClientX, startClientY, startLeft, startTop;

  div.style.position = 'absolute';
  div.style.cursor = 'move';
  div.style.touchAction = 'none';

  const getContainingBlock = () => div.offsetParent || document.documentElement;

  const clampPosition = (left, top) => {
    const containingBlock = getContainingBlock();
    const containingBlockRect = containingBlock.getBoundingClientRect();
    const minLeft = -containingBlockRect.left;
    const maxLeft = Math.max(
      minLeft,
      window.innerWidth - containingBlockRect.left - div.offsetWidth,
    );

    return {
      left: Math.min(Math.max(left, minLeft), maxLeft),
      top: Math.max(top, -containingBlockRect.top),
    };
  };

  const startDrag = (clientX, clientY) => {
    startClientX = clientX;
    startClientY = clientY;
    startLeft = div.offsetLeft;
    startTop = div.offsetTop;
    div.style.right = 'auto';
    div.style.left = startLeft + 'px';
    div.style.top = startTop + 'px';
    isDragging = true;
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    const position = clampPosition(
      startLeft + clientX - startClientX,
      startTop + clientY - startClientY,
    );

    div.style.right = 'auto';
    div.style.left = position.left + 'px';
    div.style.top = position.top + 'px';
  };

  const reconcilePosition = () => {
    if (window.innerWidth <= 950) {
      isDragging = false;
      div.style.left = '';
      div.style.top = '';
      div.style.right = '';
      return;
    }

    const position = clampPosition(div.offsetLeft, div.offsetTop);

    div.style.right = 'auto';
    div.style.left = position.left + 'px';
    div.style.top = position.top + 'px';
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
  window.addEventListener('resize', reconcilePosition);
  reconcilePosition();

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

