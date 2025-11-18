"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

export default function AdminUploadPage() {
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!title || !name || !totalPages || !file) {
      toast.error("Fadlan buuxi dhammaan fields-ka");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File-ka waa inuu ka yaraado 10MB");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("name", name.trim());
      formData.append("totalPages", totalPages.toString());
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Document si guul leh ayaa loo upload gareeyay!");
        // Reset form
        setTitle("");
        setName("");
        setTotalPages("");
        setFile(null);
      } else {
        toast.error(data.error || "Upload-ka wuu fashilmay");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Waxaa dhacay qalad, fadlan isku day mar kale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 dark:bg-gray-900 p-6">
      <Toaster position="top-right" richColors />
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Upload Document
        </h1>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Document title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Author or uploader name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="totalPages">Total Pages</Label>
            <Input
              id="totalPages"
              type="number"
              placeholder="Number of pages"
              value={totalPages}
              onChange={(e) =>
                setTotalPages(e.target.value ? Number(e.target.value) : "")
              }
            />
          </div>

          <div>
            <Label htmlFor="file">File (PDF)</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file && <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Selected: {file.name}</p>}
          </div>

          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={loading || !file}
          >
            {loading ? "Uploading..." : "Upload Document"}
          </Button>
        </div>
      </div>
    </div>
  );
}
