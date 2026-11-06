import type { Metadata } from "next";
import { DaftarContent } from "./DaftarContent";

export const metadata: Metadata = {
  title: "Daftar ke Glints Sekarang | Glints",
};

export default function DaftarPage() {
  return <DaftarContent />;
}