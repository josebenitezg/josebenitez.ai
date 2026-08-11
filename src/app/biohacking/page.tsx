import { permanentRedirect } from "next/navigation";

export default function LegacyBiohackingPage() {
  permanentRedirect("/lab");
}
