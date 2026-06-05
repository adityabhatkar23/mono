"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  async function loadLinks(profileId) {
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at");

    if (error) {
      console.error(error);
      return;
    }

    setLinks(data || []);
  }

  useEffect(() => {
    if (!isLoaded || !user) return;

    async function loadProfile() {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setProfile(profileData);

      if (profileData) {
        await loadLinks(profileData.id);
      }
    }

    loadProfile();
  }, [isLoaded, user]);

  async function saveLink() {
    if (isSaving) return;

    if (!profile) return;

    if (!title.trim() || !url.trim()) {
      alert("Please fill in both title and URL");
      return;
    }

    setIsSaving(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from("links")
          .update({
            title,
            url,
          })
          .eq("id", editingId);

        if (error) throw error;

        setEditingId(null);
      } else {
        const { error } = await supabase.from("links").insert([
          {
            profile_id: profile.id,
            title,
            url,
          },
        ]);

        if (error) throw error;
      }

      setTitle("");
      setUrl("");

      await loadLinks(profile.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteLink(id) {
    const { error } = await supabase.from("links").delete().eq("id", id);

    if (error) {
      console.error("Error deleting link:", error);
      return;
    }

    if (profile) {
      await loadLinks(profile.id);
    }
  }

  function editLink(link) {
    setEditingId(link.id);
    setTitle(link.title);
    setUrl(link.url);
  }

  async function uploadAvatar(e) {
    if (!isLoaded || !user || !profile) return;

    const file = e.target.files?.[0];

    if (!file) return;

    const fileName = `${profile.id}-${Date.now()}`;

    const { error } = await supabase.storage.from("avatars").upload(fileName, file);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar: imageUrl,
      })
      .eq("id", profile.id);

    if (updateError) {
      console.error(updateError);
      alert(updateError.message);
      return;
    }

    setProfile((prev) => ({
      ...prev,
      avatar: imageUrl,
    }));

    alert("Avatar uploaded successfully");
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mx-auto max-w-xl p-10">
      <div className="mb-8">
        {profile?.avatar && (
          <Image
            width={200}
            height={200}
            src={profile.avatar}
            alt="avatar"
            className="mb-4 h-20 w-20 rounded-full object-cover"
          />
        )}

        <input type="file" accept="image/*" onChange={uploadAvatar} className="block" />
      </div>

      <h1 className="mb-10 text-4xl">Manage Links</h1>

      <input
        value={title}
        placeholder="Github"
        className="mb-4 w-full border p-3"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        value={url}
        placeholder="https://..."
        className="mb-4 w-full border p-3"
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        type="button"
        onClick={saveLink}
        disabled={isSaving}
        className="mb-10 border px-5 py-2 disabled:opacity-50"
      >
        {isSaving ? "Saving..." : editingId ? "Update" : "Add"}
      </button>

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="flex items-center justify-between border p-4">
            <div>
              <p>{link.title}</p>
              <p className="text-sm text-neutral-500">{link.url}</p>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => editLink(link)}>
                Edit
              </button>

              <button type="button" onClick={() => deleteLink(link.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
