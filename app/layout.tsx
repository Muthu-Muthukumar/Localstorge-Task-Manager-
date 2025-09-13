import type { Metadata } from "next";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Team Task Manager",
  description: "Manage tasks with drag-and-drop and user roles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-100 text-gray-900">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
