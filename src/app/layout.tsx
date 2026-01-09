import "./globals.css";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import { Montserrat } from 'next/font/google'

interface user {
    id: string;
    name: string;
    email: string;
}

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-montserrat', // Use a variable
})

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    const mockUser: user = {
        id: '1',
        name: 'HelloWorld',
        email: 'Apple@apple.com'
    }

    return (
      <html lang="en">
          <body
              className={`bg-neutral-900 text-gray-300 ${montserrat.className}`}
          >
            <Sidebar currentUser={mockUser}/>
            {children}
          </body>
      </html>
    );
}
