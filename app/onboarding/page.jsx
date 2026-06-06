"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("pending_username") || "";
  });
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [checking, setChecking] = useState(true);
  const [usernameStatus, setUsernameStatus] = useState("idle");

  useEffect(() => {
    localStorage.removeItem("pending_username");
  }, []);

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

  const checkUsername = useCallback(async (value) => {
    if (!value || value.length < 2) {
      setUsernameStatus("idle");
      return;
    }
    setUsernameStatus("checking");
    const { data } = await supabase.from("profiles").select("id").eq("username", value).single();
    setUsernameStatus(data ? "taken" : "available");
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkUsername(username);
    }, 500);
    return () => clearTimeout(timeout);
  }, [username, checkUsername]);

  async function saveProfile() {
    if (!user || usernameStatus !== "available") return;
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

      <div className="mb-4">
        <input
          value={username}
          placeholder="username"
          className="w-full border p-2"
          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
        />
        <p className="mt-1 text-xs">
          {usernameStatus === "checking" && <span className="text-neutral-500">checking...</span>}
          {usernameStatus === "taken" && <span className="text-red-400">username taken</span>}
          {usernameStatus === "available" && <span className="text-green-500">available</span>}
        </p>
      </div>

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
      <button
        type="button"
        onClick={saveProfile}
        disabled={usernameStatus !== "available"}
        className="border px-4 py-2 disabled:opacity-30"
      >
        create
      </button>
    </div>
  );
}
