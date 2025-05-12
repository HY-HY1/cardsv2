import path from 'path';
import { Configuration } from 'webpack';

const nextConfig = {
  webpack(config: Configuration) {
    // Ensure config.resolve exists before modifying it
    if (!config.resolve) {
      config.resolve = {};
    }

    // Now it's safe to modify config.resolve.alias
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname), // Resolve @ to the project root
    };

    return config;
  },
};

export default nextConfig;
