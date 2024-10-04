import { Fira_Sans } from '@next/font/google';
import "./globals.css";
import NavBar from "../components/navbar/page";
import Footer from "../components/footer/page";
import Providers from "./providers";
import dynamic from 'next/dynamic';
import { GoogleTagManager } from '@next/third-parties/google';

// Optimize font loading by specifying only necessary weights
const firaSans = Fira_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

// Dynamically import non-critical components
const DynamicSlideCard = dynamic(() => import('@/components/SlideCard/SlideCard'), {
  ssr: false, // Disable server-side rendering if needed
});

const DynamicSize = dynamic(() => import('@/components/Size/Size'), {
  ssr: false,
});

const Hambarger = dynamic(() => import('@/components/Hambarger/Hambarger'), {
  ssr: false,
});

export const metadata = {
  title: "Estarch",
  description: "You Deserve The Best",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="facebook-domain-verification" content="y920ncxfa98q1mrk0wywnz9hlfpmt3" />
      </head>
      <GoogleTagManager gtmId="GTM-WKPLL9WN" />
      <body className={`${firaSans.className} bg-base-100`}>
        <Providers>
          <NavBar />
          <Hambarger />
          <DynamicSlideCard />
          <DynamicSize />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
        </Providers>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WKPLL9WN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
