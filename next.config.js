module.exports =
    { 
        experimental: { appDir: false },

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