import "./globals.css";
import Sidebar from "@/components/common/Sidebar/Sidebar";

interface user {
    id: string;
    name: string;
    email: string;
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    const mockUser: user = {
        id: '1',
        name: 'HelloWorld',
        email: 'Apple@apple.com'
    }

    return (
      <html lang="en">
          <body
              className={"bg-neutral-900 text-gray-300 "}
          >
            <Sidebar currentUser={mockUser}/>
            {children}
          </body>
      </html>
    );
}
