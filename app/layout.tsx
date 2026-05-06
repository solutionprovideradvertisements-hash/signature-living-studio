import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import EventTracking from '@/components/EventTracking';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata = {
  title: 'Signature Living Studio | Luxury Interior Design & Custom Furniture in Dhaka',
  description: 'Premium interior design, custom furniture, kitchen, wardrobe and turnkey home interior solutions in Dhaka. 3D planning, factory-backed execution and clear project scope.',
  alternates: {
    canonical: 'https://signaturelivingstudio.com/',
  },
  openGraph: {
    title: 'Signature Living Studio | Luxury Interior Design in Dhaka',
    description: 'Premium interior design, custom furniture and turnkey execution in Dhaka. 3D preview, factory-backed quality.',
    url: 'https://signaturelivingstudio.com/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#050505] text-[#D8C3A5] antialiased`}>
        <EventTracking />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InteriorDesignStudio",
              "name": "Signature Living Studio",
              "description": "Premium luxury interior design, custom furniture and turnkey interior execution in Dhaka, Bangladesh.",
              "url": "https://signaturelivingstudio.com",
              "telephone": process.env.NEXT_PUBLIC_PHONE,
              "email": process.env.NEXT_PUBLIC_EMAIL,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dhaka",
                "addressCountry": "BD"
              },
              "areaServed": "Dhaka",
              "priceRange": "৳৳৳"
            })
          }}
        />
      </body>
    </html>
  );
}
