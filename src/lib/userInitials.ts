/**
 * Two-letter nav avatar initials from a display name or email local part.
 * - Multiple tokens (spaces, or dots in email locals): first letter of first + first of last token.
 * - Single token: first + last letter (e.g. "Admin" -> "AN", not "AD").
 */
export function initialsFromVisibleLabel(raw: string): string {
  const t: string = raw.trim();
  if (t.length === 0) {
    return "";
  }
  const parts: string[] = t.split(/\s+/).filter((p) => p.length > 0);
  if (parts.length >= 2) {
    const a: string = parts[0]!.charAt(0);
    const b: string = parts[parts.length - 1]!.charAt(0);
    return (a + b).toUpperCase();
  }
  const w: string = parts[0] ?? t;
  if (w.length <= 1) {
    return w.toUpperCase();
  }
  return (w.charAt(0) + w.charAt(w.length - 1)).toUpperCase();
}

/** Email local part before @, strips plus-addressing (e.g. user+tag@ -> user). */
export function emailLocalPart(email: string): string {
  const at: number = email.indexOf("@");
  const local: string = (at === -1 ? email : email.slice(0, at)).trim();
  const plus: number = local.indexOf("+");
  return plus === -1 ? local : local.slice(0, plus);
}

/**
 * Initials for nav chip: display name tokens, or dotted local part (john.doe -> JD), else single-token rule.
 */
export function navAvatarInitialsFromUser(displayName: string | undefined, email: string | undefined): string {
  const dn: string | undefined = displayName?.trim();
  if (dn && dn.length > 0) {
    return initialsFromVisibleLabel(dn);
  }
  const em: string | undefined = email?.trim();
  if (em && em.length > 0) {
    const local: string = emailLocalPart(em);
    if (local.includes(".")) {
      const segs: string[] = local.split(".").filter((s) => s.length > 0);
      if (segs.length >= 2) {
        return (segs[0]!.charAt(0) + segs[segs.length - 1]!.charAt(0)).toUpperCase();
      }
    }
    return initialsFromVisibleLabel(local);
  }
  return "RZ";
}
