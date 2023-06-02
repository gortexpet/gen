module.exports =
    { 
        experimental: { appDir: true  },

    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'oaidalleapiprodscus.blob.core.windows.net',
            // port: '',
            // pathname: '/account123/**',
          },
          {
            protocol: 'https',
            hostname: 'clmauxireerjpgirlklz.supabase.co',
          }
        ],
      },

}
