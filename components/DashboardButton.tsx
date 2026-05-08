"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardButton() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <Link href="/dashboard">
      <Button variant="outline">Dashboard</Button>
    </Link>
  );
}
