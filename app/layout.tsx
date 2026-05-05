import type { Metadata } from 'next';
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Playfair_Display } from 'next/font/google';
import Script from "next/script";
import './globals.css';
import { ConsultationModal } from '@/components/popup/ConsultationModal';
import { BackToTopButton } from '@/components/ui/BackToTopButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Signature Living Studio | Luxury Interior Design in Dhaka",
  description: "Luxury Interior & Custom Furniture in Dhaka. Complete Home Interior & Turnkey Solutions.",
  metadataBase: new URL("https://signaturelivingstudio.com"),
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23E8C97A" /><stop offset="45%" stop-color="%23C9A84C" /><stop offset="100%" stop-color="%238B6914" /></linearGradient></defs><g fill="url(%23g)"><path transform="translate(30,-5) scale(0.9)" d="M72.1,38.8v-18l-8.5-0.2c-5-6-15.1-12.7-30-12.7c-21.7,0-36.9,13-36.9,35.6c0,19.3,13.6,28.6,35.6,37.6 C51.3,88.9,60.5,95.5,60.5,110c0,14.5-12.9,25.4-32.3,25.4C11.5,135.4,3,121.7,3,121.7L-5.3,132c8.8,14.5,23.3,19.3,37.3,19.3 c27.5,0,51.3-13.6,51.3-40.2c0-23.6-18.1-32.9-36.5-41.4C30,60.3,20,55.4,20,44.9c0-14.2,9.7-22.3,21.1-22.3 C55,22.6,63.1,28,66.8,32.8L72.1,38.8z"/><path transform="translate(58,15) scale(0.95)" d="M48 20 l0 8 l5 0 l0 95 c0 8 4 10 12 10 l32 0 c6 0 10 -4 10 -15 l0 -12 l10 0 l0 35 l-94 0 l0 -8 l10 0 l0 -95 l-10 0 l0 -8 z"/><path transform="translate(85,20) scale(1.15)" d="M72.1,38.8v-18l-8.5-0.2c-5-6-15.1-12.7-30-12.7c-21.7,0-36.9,13-36.9,35.6c0,19.3,13.6,28.6,35.6,37.6 C51.3,88.9,60.5,95.5,60.5,110c0,14.5-12.9,25.4-32.3,25.4C11.5,135.4,3,121.7,3,121.7L-5.3,132c8.8,14.5,23.3,19.3,37.3,19.3 c27.5,0,51.3-13.6,51.3-40.2c0-23.6-18.1-32.9-36.5-41.4C30,60.3,20,55.4,20,44.9c0-14.2,9.7-22.3,21.1-22.3 C55,22.6,63.1,28,66.8,32.8L72.1,38.8z"/></g></svg>'
  },
  openGraph: {
    title: "Signature Living Studio",
    description: "Tailored Luxury, Designed Around Your Lifestyle.",
    type: "website",
    locale: "en_BD"
  }
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <head>
          {GTM_ID && (
            <Script id="gtm-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'gtm_loaded', page_type: 'global' });
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `}
            </Script>
          )}
          {META_PIXEL_ID && (
            <Script id="meta-pixel-init" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
          )}
        </head>
        <body suppressHydrationWarning>
          {GTM_ID && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          )}
          {META_PIXEL_ID && (
            <noscript>
              <img 
                height="1" 
                width="1" 
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          )}
          <ConsultationModal />
          <BackToTopButton />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
