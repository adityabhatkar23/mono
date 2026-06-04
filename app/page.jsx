import { ArrowRight, ArrowUpRight, CornerDownRight } from "lucide-react";
import Link from "next/link";

export default function MonoLandingRefined() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-black p-8 font-sans text-white antialiased selection:bg-white selection:text-black md:p-16">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-3.5 focus:outline-none">
          <div className="flex h-7 w-7 items-center justify-center border border-white transition-colors duration-200 group-hover:bg-white group-hover:text-black">
            <ArrowUpRight size={15} strokeWidth={1.5} />
          </div>
          <span className="text-xs font-light tracking-[0.4em] uppercase">Mono</span>
        </Link>
        <div className="flex items-center gap-8 text-[11px] font-light tracking-[0.2em] uppercase">
          <Link href="/sign-in" className="opacity-100 transition-opacity hover:opacity-80">
            Login
          </Link>
          <Link
            href="/sign-up"
            className="border border-white px-4 py-1.5 transition-all hover:bg-white hover:text-black"
          >
            Join
          </Link>
        </div>
      </header>

      <main className="mx-auto my-auto flex w-full max-w-5xl flex-col items-start justify-between gap-20 py-16 lg:flex-row lg:items-center">
        <div className="w-full space-y-10 lg:w-1/2">
          <div className="max-w-lg space-y-5">
            <h1 className="text-4xl leading-[1.1] font-extralight tracking-tight uppercase md:text-5xl">
              Identity without <br />
              <span className="font-semibold">structural noise.</span>
            </h1>
            <p className="max-w-sm text-[11px] leading-relaxed font-light tracking-[0.08em] uppercase">
              Link single link hub built entirely in pitch black and stark white. No colorful
              canvases, no analytical profiling. Just bare, functional redirection.
            </p>
          </div>

          <form action="/sign-up" method="GET" className="w-full max-w-sm">
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
        </div>

        <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
          <div className="relative flex min-h-95 w-full max-w-[320px] flex-col items-center justify-between border border-white bg-black p-8 shadow-[4px_4px_0px_0px_#fff]">
            <div className="mt-4 flex h-5 w-5 items-center justify-center border border-white">
              <ArrowUpRight size={10} strokeWidth={1.5} className="text-white" />
            </div>

            <div className="my-auto w-full space-y-4">
              {["instagram", "facebook", "github"].map((item) => (
                <div
                  key={item}
                  className="flex w-full cursor-pointer items-center justify-between border-b border-white pb-2 text-[10px] font-light tracking-[0.25em] uppercase transition-opacity hover:opacity-80"
                >
                  <div className="flex items-center gap-1.5">
                    <CornerDownRight size={8} strokeWidth={1.5} className="text-white" />
                    <span className="text-white">{item}</span>
                  </div>
                  <ArrowUpRight size={10} strokeWidth={1.5} className="text-white" />
                </div>
              ))}
            </div>

            <span className="mb-2 text-[8px] font-light tracking-[0.3em] text-white uppercase">
              [ made with mono ↗]
            </span>
          </div>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-4 border-t border-white pt-6 text-[9px] font-light tracking-[0.3em] uppercase sm:flex-row sm:items-center">
        <div className="flex items-center gap-6">
          <span className="text-white">Mono</span>
          <span className="text-white">minimal link ecosystem</span>
        </div>
        <Link
          href="https://adityabhatkar.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white"
        >
          <span>made by aditya ❤︎⁠</span>
        </Link>
      </footer>
    </div>
  );
}
