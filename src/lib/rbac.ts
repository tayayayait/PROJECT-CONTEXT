import { useEffect, useState } from "react";

export type Role = "admin" | "pm" | "contributor" | "auditor";

export const roles: Role[] = ["admin", "pm", "contributor", "auditor"];

export const permissionMatrix = {
  project: {
    view: ["admin", "pm", "contributor", "auditor"],
    edit: ["admin", "pm"],
    manageMembers: ["admin", "pm"],
  },
  uploadQueue: {
    view: ["admin", "pm", "contributor", "auditor"],
    upload: ["admin", "pm", "contributor"],
    cancelOrRetry: ["admin", "pm", "contributor"],
  },
  vectorSearch: {
    search: ["admin", "pm", "contributor", "auditor"],
    sendToLogEditor: ["admin", "pm", "contributor"],
  },
  logEditor: {
    view: ["admin", "pm", "contributor", "auditor"],
    edit: ["admin", "pm", "contributor"],
    approveSentence: ["admin", "pm"],
  },
  templateMapping: {
    view: ["admin", "pm", "contributor", "auditor"],
    editMapping: ["admin", "pm", "contributor"],
  },
  approval: {
    requestApproval: ["admin", "pm"],
    approveOrReject: ["admin", "pm"],
  },
  export: {
    download: ["admin", "pm", "contributor", "auditor"],
    createExpiringLink: ["admin", "pm"],
  },
  settings: {
    view: ["admin"],
    edit: ["admin"],
  },
  auditLog: {
    view: ["admin", "auditor"],
    exportCsv: ["admin", "auditor"],
  },
} as const;

export type Resource = keyof typeof permissionMatrix;
export type Action<R extends Resource> = keyof (typeof permissionMatrix)[R];

export const canPerform = <R extends Resource>(role: Role, resource: R, action: Action<R>) =>
  permissionMatrix[resource][action].includes(role);

export const canAccessRoute = (role: Role, rolesAllowed?: Role[]) => {
  if (!rolesAllowed || rolesAllowed.length === 0) return true;
  return rolesAllowed.includes(role);
};

const resolveStoredRole = (): Role => {
  if (typeof window === "undefined") return "admin";
  const stored = window.localStorage.getItem("role") as Role | null;
  if (stored && roles.includes(stored)) return stored;
  return "admin";
};

export const useCurrentRole = () => {
  const [role, setRole] = useState<Role>(resolveStoredRole);

  useEffect(() => {
    const handleStorage = () => setRole(resolveStoredRole());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return role;
};

export const setCurrentRole = (role: Role) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("role", role);
};

