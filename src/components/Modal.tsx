import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useIsPresent } from "motion/react";
import { useMotionPreferences } from "./MotionPreferences";
import { motionSettings } from "../lib/motion";

// Native dialogs supply focus containment, inert background, and Escape.
export function Modal({
  children,
  onClose,
  labelledBy,
  className = "",
  returnFocus,
}: {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
  className?: string;
  returnFocus?: HTMLElement | null;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef(returnFocus);
  const isPresent = useIsPresent();
  const { enabled } = useMotionPreferences();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const trapFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, summary, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(
      (element) =>
        !element.hasAttribute("disabled") &&
        element.getClientRects().length > 0,
    );
    const first = controls[0],
      last = controls.at(-1);
    if (!first || !last) {
      event.preventDefault();
      return;
    }
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  useEffect(() => {
    const trigger =
      returnFocusRef.current ?? (document.activeElement as HTMLElement | null);
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    const firstControl =
      dialog.querySelector<HTMLElement>("[data-autofocus]") ??
      dialog.querySelector<HTMLElement>("button, a[href], input, textarea");
    firstControl?.focus({ preventScroll: true });
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      className={`modal ${className}`}
      data-state={isPresent ? "open" : "closing"}
      onKeyDown={trapFocus}
      onCancel={(e) => {
        e.preventDefault();
        if (isPresent) closeRef.current();
      }}
      onClick={(e) => {
        if (isPresent && e.target === e.currentTarget) closeRef.current();
      }}
    >
      <motion.div
        className="modal-surface"
        initial={enabled ? { opacity: 0, y: 28, scale: 0.97 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: enabled ? 16 : 0, scale: enabled ? 0.985 : 1 }}
        transition={{
          duration: enabled
            ? isPresent
              ? motionSettings.dialogOpen
              : motionSettings.dialogClose
            : 0,
          ease: motionSettings.ease,
        }}
      >
        {children}
      </motion.div>
    </dialog>,
    document.body,
  );
}
