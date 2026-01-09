import ReactDom from "react-dom";

/**
 * A function that allows you to render a React component if the render DOM element is not present on
 * initial page load, but is added in later.
 * @param {Element} observedElement - The element that the MutationObserver watches for changes.
 * @param {string} renderElementID - The ID of the DOM element that the component will render inside of.
 * @param {react} component - The React component to be rendered.
 */

const renderReactPostInit = (observedElement, renderElementID, component) => {
  if (observedElement) {
    const observer = new MutationObserver(() => {
      const domRenderTarget = document.getElementById(renderElementID);
      if (domRenderTarget) {
        ReactDom.render(component, domRenderTarget);
      }
    });
    observer.observe(observedElement, {
      childList: true,
      subtree: true,
    });
  }
};

export default renderReactPostInit;
