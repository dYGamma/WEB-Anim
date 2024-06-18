import "./globals.css";
import { App } from "@/app/App";

export const metadata = {
  title: "Аниксартик",
  
};

export default async function RootLayout({ children }) {
  return (
    <html lang="ru">
      <App>{children}</App>
    </html>
  );
}
