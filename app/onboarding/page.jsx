"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.replace("/sign-in");
      return;
    }

    async function checkProfile() {
      const { data } = await supabase.from("profiles").select("id").eq("user_id", user.id).single();

      if (data) {
        router.replace("/dashboard");
      } else {
        setChecking(false);
      }
    }

    checkProfile();
  }, [isLoaded, user, router]);

  async function saveProfile() {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .insert([{ user_id: user.id, username, name, bio }]);

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/${username}`);
  }

  if (!isLoaded || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        loading...
      </div>
    );
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
      <button type="button" onClick={saveProfile} className="border px-4 py-2">
        create
      </button>
    </div>
  );
}
