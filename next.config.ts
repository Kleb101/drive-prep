import type { NextConfig } from 'next';
// @ts-expect-error: No types available for next-pwa
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig);
