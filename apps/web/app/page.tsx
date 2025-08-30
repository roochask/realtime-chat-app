"use client"
import { useRouter } from "next/navigation";
import SignupPage from "./signin/page";

export default function Page() {
  const router = useRouter();

  return (
    <SignupPage />
  );
}
