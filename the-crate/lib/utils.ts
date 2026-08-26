export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function statusTone(status: string) {
  if (status === "On track" || status === "Delivered" || status === "complete" || status === "resolved") {
    return "lime";
  }
  if (status === "At risk" || status === "watch" || status === "current") return "orange";
  if (status === "Delayed" || status === "critical" || status === "alert") return "red";
  return "muted";
}
