import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function Modal({ title, children, onClose, returnFocusRef }) {
  const titleId = useId();
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;
    const panel = panelRef.current;

    const autofocusElement = panel?.querySelector("[data-autofocus]");
    const firstFocusableElement = panel?.querySelector(FOCUSABLE_SELECTOR);

    (autofocusElement ?? firstFocusableElement ?? panel)?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        panel?.querySelectorAll(FOCUSABLE_SELECTOR) ?? [],
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        panel?.focus();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      const focusIsOutsidePanel = !panel?.contains(document.activeElement);

      if (
        event.shiftKey &&
        (document.activeElement === firstFocusable || focusIsOutsidePanel)
      ) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastFocusable || focusIsOutsidePanel)
      ) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      const focusTarget = returnFocusRef?.current ?? previouslyFocusedElement;

      focusTarget?.focus?.();
    };
  }, [returnFocusRef]);

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <section
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button
          className={styles.closeButton}
          type="button"
          aria-label={`Close ${title}`}
          onClick={onClose}
        >
          ×
        </button>

        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>

        {children}
      </section>
    </div>,
    modalRoot,
  );
}

export default Modal;
