import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/:username"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isAppRoute = createRouteMatcher(["/dashboard(.*)", "/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (!userId && isAppRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (userId && (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/redirect", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
