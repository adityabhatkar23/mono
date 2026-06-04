"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RedirectPage() {
	const { user, isLoaded } = useUser();
	const router = useRouter();

	useEffect(() => {
		async function checkProfile() {
			if (!isLoaded || !user) return;

			const { data } = await supabase
				.from("profiles")
				.select("id")
				.eq("user_id", user.id)
				.single();

			if (data) {
				router.replace("/dashboard");
			} else {
				router.replace("/onboarding");
			}
		}

		checkProfile();
	}, [isLoaded, user, router]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-black text-white">
			loading...
		</div>
	);
}
