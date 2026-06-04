import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient.js";

export default async function ProfilePage({ params }) {
	const { username } = await params;

	const { data: profile } = await supabase
		.from("profiles")
		.select("*")
		.eq("username", username)
		.single();

	if (!profile) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				not found
			</main>
		);
	}
	const { data: links } = await supabase
		.from("links")
		.select("*")
		.eq("profile_id", profile.id)
		.order("position");

	return (
		<main className="min-h-screen bg-black text-white">
			<div className="mx-auto max-w-md px-6 pt-32">
				{profile.avatar && (
					<Image
						src={profile.avatar}
						alt="avatar"
						className="mb-6 h-24 w-24 rounded-full object-cover"
					/>
				)}
				<h1 className="mb-2 text-5xl">{profile.name}</h1>
				<p className="mb-12 text-neutral-500">{profile.bio}</p>

				<div className="flex flex-col space-y-4">
					{links?.map((link) => (
						<Link
							key={link.id}
							href={link.url}
							target="_blank"
							className="block border-b border-neutral-800 py-4 transition hover:translate-x-1"
						>
							{link.title}
						</Link>
					))}
				</div>

				<div className="mt-20 text-sm text-neutral-700">↗ made with mono</div>
			</div>
		</main>
	);
}
