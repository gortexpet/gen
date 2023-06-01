module.exports =
    { 
        experimental: { appDir: true },

    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'oaidalleapiprodscus.blob.core.windows.net',
            // port: '',
            // pathname: '/account123/**',
          },
        ],
      },

}