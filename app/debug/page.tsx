"use client";

import { useUser } from "@clerk/nextjs";

export default function DebugPage() {
  const { user } = useUser();

  console.log("Clerk User ID:", user?.id);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Debug</h1>
      <p>Your Clerk User ID:</p>
      <pre className="bg-gray-100 p-3 rounded">
        {user?.id ?? "Not logged in"}
      </pre>
    </div>
  );
}
