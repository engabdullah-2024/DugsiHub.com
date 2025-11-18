// app/api/account/update/route.ts
import { NextResponse } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Please provide name and email" }, { status: 400 });
    }

    // Update Clerk user
    await clerkClient.users.updateUser(userId, {
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" "),
      emailAddresses: [{ emailAddress: email, id: (await clerkClient.users.getUser(userId)).emailAddresses[0].id }],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Update Account Error:", error);
    return NextResponse.json({ error: "Failed to update account" }, { status: 500 });
  }
}
