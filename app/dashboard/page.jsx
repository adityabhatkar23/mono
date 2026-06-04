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
  // const [avatar, setAvatar] = useState(null);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProfile();
  });

  async function loadProfile() {
    if (!user) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    setProfile(profileData);

    if (profileData) {
      loadLinks(profileData.id);
    }
  }

  async function loadLinks(profileId) {
    const { data } = await supabase
      .from("links")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at");

    setLinks(data || []);
  }

  async function saveLink() {
    if (!profile) return;

    if (editingId) {
      const { error } = await supabase
        .from("links")
        .update({
          title,
          url,
        })
        .eq("id", editingId);
      console.error(error);
      setEditingId(null);
    } else {
      await supabase.from("links").insert([
        {
          profile_id: profile.id,
          title,
          url,
        },
      ]);
    }

    setTitle("");
    setUrl("");

    loadLinks(profile.id);
  }

  async function deleteLink(id) {
    const { error } = await supabase.from("links").delete().eq("id", id);

    if (error) {
      console.error("Error deleting link:", error);
    }

    loadLinks(profile.id);
  }

  function editLink(link) {
    setEditingId(link.id);
    setTitle(link.title);
    setUrl(link.url);
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function uploadAvatar(e) {
    const file = e.target.files[0];

    if (!file || !profile) return;

    const fileName = `${profile.id}-${Date.now()}`;

    const { error } = await supabase.storage.from("avatars").upload(fileName, file);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar: imageUrl,
      })
      .eq("id", profile.id)
      .select();

    console.log("Updated profile:", data);
    console.log("Update error:", updateError);

    if (updateError) {
      alert(updateError.message);
      return;
    }

    if (updateError) {
      console.log(updateError);
      return;
    }

    setProfile({
      ...profile,
      avatar: imageUrl,
    });

    alert("uploaded");
  }

  return (
    <main className="mx-auto max-w-xl p-10">
      <div className="mb-8">
        {profile?.avatar && (
          <Image
            src={profile.avatar}
            alt="avatar"
            className="mb-4 h-20 w-20 rounded-full object-cover"
          />
        )}

        <input type="file" accept="image/*" onChange={uploadAvatar} className="block" />
      </div>
      <h1 className="mb-10 text-4xl">Manage Links</h1>

      <input type="file" accept="image/*" onChange={uploadAvatar} className="mb-6" />

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

      <button type="button" onClick={saveLink} className="mb-10 border px-5 py-2">
        {editingId ? "Update" : "Add"}
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
                edit
              </button>

              <button type="button" onClick={() => deleteLink(link.id)}>
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
