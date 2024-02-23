import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Suspense } from "react";
import Loading from "@/components/Loading";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Photo Album",
  description: "Arindam's assignment for Founder and Lighntening",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className='album_main'>
          <h1>Photo Album</h1>
          <Breadcrumbs />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
