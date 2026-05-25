"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const { user } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  async function saveProfile() {
    if (!user) return;

    const { error } = await supabase.from("profiles").insert([
      {
        user_id: user.id,
        username,
        name,
        bio,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/${username}`);
  }

  return (
    <div className="mx-auto max-w-md p-10">
      <h1 className="mb-6 text-3xl">create profile</h1>

      <input
        placeholder="username"
        className="mb-4 w-full border p-2"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="name"
        className="mb-4 w-full border p-2"
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="bio"
        className="mb-4 w-full border p-2"
        onChange={(e) => setBio(e.target.value)}
      />

      <button onClick={saveProfile} className="border px-4 py-2">
        create
      </button>
    </div>
  );
}
