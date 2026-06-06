// app/_components/UsernameForm.jsx
"use client";
import { ArrowRight } from "lucide-react";

export default function UsernameForm() {
  return (
    <form
      action="/sign-up"
      method="GET"
      onSubmit={(e) => {
        const username = e.currentTarget.username.value;
        localStorage.setItem("pending_username", username);
      }}
    >
      <div className="group flex items-center border-b border-white py-2.5 transition-colors focus-within:border-white">
        <span className="pr-0.5 text-sm font-light tracking-wider lowercase">mono.me/</span>
        <input
          type="text"
          name="username"
          placeholder="username"
          className="w-full bg-black text-sm font-light tracking-[0.15em] text-white uppercase placeholder:opacity-50 focus:outline-none"
        />
        <button type="submit" className="pl-2 text-white transition-colors">
          <ArrowRight size={15} strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
}
