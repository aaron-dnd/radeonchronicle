import './globals.css'
import Header from '../components/Header/Header'

export const metadata = {
  title: 'RadeonChronicle - Stay Informed with Latest News',
  description:
    'Browse top news headlines, search for articles, and stay updated with the latest news from around the world.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://radeonchronicle.example.com',
    title: 'RadeonChronicle - Stay Informed',
    description: 'Latest news from around the world',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors" suppressHydrationWarning={true}>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>© 2025 RadeonChronicle. Powered by NewsAPI.org</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
