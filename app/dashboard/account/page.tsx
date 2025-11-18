"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Admin {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export default function AccountPage() {
  const { user } = useUser();
  const [name, setName] = useState<string>(user?.fullName || "");
  const [email, setEmail] = useState<string>(user?.emailAddresses?.[0]?.emailAddress || "");
  const [message, setMessage] = useState<string | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // fetch admins
  useEffect(() => {
    let mounted = true;
    const fetchAdmins = async () => {
      try {
        const res = await fetch("/api/admins");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (mounted) setAdmins(data.admins || []);
      } catch (err) {
        console.error(err);
        if (mounted) setMessage("Could not load admins. Check your API.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAdmins();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdate = async () => {
    // basic client validation
    setMessage(null);
    if (!name.trim() || !email.trim()) {
      setMessage("Please provide a valid name and email.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setMessage("Account updated successfully ✅");
      } else {
        setMessage(data?.error || "Update failed ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong ❌");
    } finally {
      setSaving(false);
    }
  };

  const accent = "#4a8c64"; // user-provided accent

  const renderedAdmins = useMemo(() => {
    return admins.map((a) => ({
      ...a,
      joined: new Date(a.createdAt).toLocaleDateString(),
    }));
  }, [admins]);

  return (
    <main className="min-h-screen py-10 px-4 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto space-y-8 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold" style={{ color: accent }}>Admin Dashboard</h1>
            <p className="text-sm opacity-70 mt-1">Manage your account and organization admins — modern SaaS style.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs opacity-70">Signed in as</div>
              <div className="font-medium">{user?.fullName || user?.primaryEmailAddress || "—"}</div>
            </div>
            <Avatar>
              {user?.imageUrl ? (
                <AvatarImage src={user.imageUrl} alt={user?.fullName || "avatar"} />
              ) : (
                <AvatarFallback className="bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-100">{(user?.fullName || "U").charAt(0)}</AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Card */}
          <Card className="col-span-1 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-gray-100">Your Account</span>
                <span className="text-xs opacity-80">Member</span>
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-gray-600 dark:text-gray-300">Edit your primary name and contact email.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Full name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Email</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" type="email" />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    onClick={handleUpdate}
                    disabled={saving}
                    style={{ background: accent }}
                    className="text-white hover:brightness-95"
                  >
                    {saving ? "Saving..." : "Update account"}
                  </Button>

                  <Button variant="ghost" onClick={() => { setName(user?.fullName || ""); setEmail(user?.emailAddresses?.[0]?.emailAddress || ""); }}>
                    Reset
                  </Button>
                </div>

                {message && (
                  <div className="text-sm mt-2" style={{ color: message.includes("failed") || message.includes("wrong") ? "#ff6b6b" : accent }}>
                    {message}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Admins list / table - spans 2 columns on lg */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Organization Admins</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-300">All admins with access to this workspace.</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-100 dark:bg-neutral-800 animate-pulse rounded" />
                    <div className="h-8 bg-gray-100 dark:bg-neutral-800 animate-pulse rounded w-3/4" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto text-left">
                      <thead>
                        <tr className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-neutral-800">
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Email</th>
                          <th className="py-3 px-4">Joined</th>
                          <th className="py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderedAdmins.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-6 px-4 text-center opacity-75">No admins yet.</td>
                          </tr>
                        ) : (
                          renderedAdmins.map((a) => (
                            <tr key={a.id} className="border-b border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/40">
                              <td className="py-3 px-4 align-middle text-gray-900 dark:text-gray-100">{a.fullName}</td>
                              <td className="py-3 px-4 align-middle opacity-80">{a.email}</td>
                              <td className="py-3 px-4 align-middle">{a.joined}</td>
                              <td className="py-3 px-4 align-middle">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="ghost" className="text-sm" onClick={() => navigator.clipboard.writeText(a.email)}>
                                    Copy
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-sm" onClick={() => alert('Open admin details - implement modal or nav')}>
                                    Details
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick actions card */}
            <Card className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Quick actions</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-300">Common admin tasks at a glance.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button style={{ background: accent }} className="text-white">Invite user</Button>
                  <Button variant="outline">Create API key</Button>
                  <Button variant="ghost">View logs</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="text-center text-xs opacity-60 pt-6">© {new Date().getFullYear()} Your SaaS — Built with ♥</footer>
      </div>
    </main>
  );
}
