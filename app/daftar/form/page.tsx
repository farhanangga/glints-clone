import type { Metadata } from "next";
import { DaftarFormContent } from "./DaftarFormContent";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function DaftarFormPage() {
  return <DaftarFormContent />;
}