import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.svg', 'icon-512.svg'],

      manifest: {
        name: 'AssesIN — Platform Asesmen Psikologi Digital',
        short_name: 'AssesIN',
        description: 'Platform asesmen psikologi digital untuk pemetaan potensi dan kepribadian individu maupun organisasi.',
        theme_color: '#d4a853',
        background_color: '#09090f',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'id',
        categories: ['education', 'productivity', 'business'],
        icons: [
          {
            src: '/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Tes MBTI',
            short_name: 'MBTI',
            url: '/tes',
            description: 'Mulai Tes Kepribadian MBTI',
          },
          {
            name: 'Tes DISC',
            short_name: 'DISC',
            url: '/tes-disc',
            description: 'Mulai Tes DISC',
          },
          {
            name: 'Tes DASS-21',
            short_name: 'DASS',
            url: '/tes-dass',
            description: 'Mulai Tes DASS-21',
          },
        ],
      },

      workbox: {
        // Cache semua asset app
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // Cache Google Fonts
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },

      devOptions: {
        enabled: false, // nonaktifkan di dev agar tidak ganggu HMR
      },
    }),
  ],
})
