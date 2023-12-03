import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Networking Project',
  description: 'A simple social networking project with React',
}

import { AuthContextProvider } from "./_utils/auth-context";
import { StylingContextProvider } from './_utils/styling-context';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <StylingContextProvider>  
                {children}
          </StylingContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
