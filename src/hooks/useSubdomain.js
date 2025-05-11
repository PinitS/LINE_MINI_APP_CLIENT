import { useMemo } from "react";

const getSubdomain = () => {
  const host = window.location.hostname;
  const parts = host.split(".");

  if (host.includes("localhost")) {
    return parts.length > 1 ? parts[0] : null;
  }

  if (parts.length === 3) {
    return parts[0]; // "tenant"
  }

  return null;
};

export const useSubdomain = () => {
  const subdomain = useMemo(() => getSubdomain(), []);
  return subdomain;
};
