// Makes the "listening to" widget on the homepage draggable.
import { makeDraggable } from './draggable_maker.js';

const widget = document.querySelector('.listening_to');
if (widget) makeDraggable(widget);
