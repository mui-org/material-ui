export default {
  webpack5: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\/node_modules\/@mui\//,
      use: [defaultLoaders.babel],
    });
    return config;
  },
};
