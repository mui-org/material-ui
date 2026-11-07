// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/0907244256d923807c3a4e55f4ea606b9558d0ca/js/modal.js#L214-L221
// and https://github.com/twbs/bootstrap/blob/0907244256d923807c3a4e55f4ea606b9558d0ca/less/modals.less#L122-L128
export default function getScrollbarSize(win: Window = window): number {
  const scrollDiv = win.document.createElement('div');

  scrollDiv.style.setProperty('position', 'absolute');
  scrollDiv.style.setProperty('top', '-9999px');
  scrollDiv.style.setProperty('width', '50px');
  scrollDiv.style.setProperty('height', '50px');
  scrollDiv.style.setProperty('overflow', 'scroll');
  // Invert the zoom level to get 100% sized scrollbars for the element
  scrollDiv.style.setProperty('zoom', `${1 / win.devicePixelRatio}`);

  win.document.body.append(scrollDiv);

  const unZoomedScrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  win.document.body.removeChild(scrollDiv);

  const zoomedScrollbarWidth = unZoomedScrollbarWidth / win.devicePixelRatio;

  return zoomedScrollbarWidth;
}
