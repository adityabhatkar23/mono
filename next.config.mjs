/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [new URL("https://nqrpuafewjblfylgwxqf.supabase.co/**")],
  },
};

export default nextConfig;
