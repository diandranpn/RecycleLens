import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RecycleLens",
  description: "AI base software to help you classify the trash",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          {children}
        </div>
        <div className="unsupported-text hidden">
          <p>This application is not supported above 720px resolution.</p>
        </div>
      </body>
    </html>
  );
}
