import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_IDS, getRouteById } from "@/lib/routes";

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  const editable = target.isContentEditable;
  return editable || tagName === "input" || tagName === "textarea" || tagName === "select";
};

const getPath = (id: typeof ROUTE_IDS[keyof typeof ROUTE_IDS]) =>
  getRouteById(id)?.path ?? "/";

export const useShortcutNavigation = () => {
  const navigate = useNavigate();
  const pendingPrefix = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const lastKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const resetPrefix = () => {
      if (pendingPrefix.current) {
        window.clearTimeout(pendingPrefix.current);
      }
      pendingPrefix.current = null;
      lastKeyRef.current = null;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isEditableTarget(event.target)) return;

      const key = event.key.toLowerCase();

      if (key === "/") {
        event.preventDefault();
        document.getElementById("global-search-input")?.focus();
        resetPrefix();
        return;
      }

      if (key === "g") {
        event.preventDefault();
        lastKeyRef.current = "g";
        if (pendingPrefix.current) window.clearTimeout(pendingPrefix.current);
        pendingPrefix.current = window.setTimeout(resetPrefix, 1000);
        return;
      }

      if (lastKeyRef.current === "g") {
        event.preventDefault();
        resetPrefix();
        if (key === "p") {
          navigate(getPath(ROUTE_IDS.projects));
        }
        return;
      }

      const singleKeyRoutes: Record<string, typeof ROUTE_IDS[keyof typeof ROUTE_IDS]> = {
        u: ROUTE_IDS.upload,
        v: ROUTE_IDS.search,
        l: ROUTE_IDS.logEditor,
        t: ROUTE_IDS.templates,
        a: ROUTE_IDS.approvals,
      };

      const routeId = singleKeyRoutes[key];
      if (routeId) {
        event.preventDefault();
        navigate(getPath(routeId));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      resetPrefix();
    };
  }, [navigate]);
};

