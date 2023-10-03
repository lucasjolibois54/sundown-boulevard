import "../globals.css";
import { Inter } from "next/font/google";

import Navbar from "@/app/components/main/Navbar";

import CursorComponent from "@/cursor/CursorComponent";
import { CursorProvider } from "@/cursor/CursorContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Le Faim  | Restaurant",
  description: "Your favorite restaurant in town",
};

export default function RootLayout({ children }) {
  return (
    <CursorProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <div className="none hidden md:block">
            <CursorComponent />
          </div>
          {children}
          {/* <Footer/> */}
        </body>
      </html>
    </CursorProvider>
  );
}
