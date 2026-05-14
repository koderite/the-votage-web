import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Agentation } from "agentation";
import Script from "next/script";

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});



// Local Copperplate fonts
const copperplateBold = localFont({
  src: "../public/font/fonnts.com-Copperplate-Bol-.otf",
  variable: "--font-copperplate-bold",
});

const copperplateMedium = localFont({
  src: "../public/font/fonnts.com-Copperplate-Med-.otf",
  variable: "--font-copperplate-medium",
});

const copperplateLight = localFont({
  src: "../public/font/fonnts.com-Copperplate-Lig-.otf",
  variable: "--font-copperplate-light",
});

const copperplateCondensedMedium = localFont({
  src: "../public/font/fonnts.com-Copperplate-Con-Med-.otf",
  variable: "--font-copperplate-condensed-medium",
});

const copperplateCondensedBold = localFont({
  src: "../public/font/fonnts.com-Copperplate-Con-Bol-.otf",
  variable: "--font-copperplate-condensed-bold",
});

const copperplateCondensedLight = localFont({
  src: "../public/font/fonnts.com-Copperplate-Con-Lig-.otf",
  variable: "--font-copperplate-condensed-light",
});

export const metadata: Metadata = {
  title: "Welcome to The Votage",
  description: " We are the Voice of this age ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.variable} ${copperplateBold.variable} ${copperplateMedium.variable} ${copperplateLight.variable} ${copperplateCondensedMedium.variable} ${copperplateCondensedBold.variable} ${copperplateCondensedLight.variable} antialiased`}
      >
        {process.env.NODE_ENV === "development" && <Agentation />}
        {children}
        <Script id="votage-chat-widget" strategy="afterInteractive">{`
          (function () {
            const button = document.createElement("button");
            button.innerHTML = "💬 Chat";
            button.style.position = "fixed";
            button.style.bottom = "20px";
            button.style.right = "20px";
            button.style.padding = "12px 18px";
            button.style.background = "#000";
            button.style.color = "#fff";
            button.style.border = "none";
            button.style.borderRadius = "30px";
            button.style.cursor = "pointer";
            button.style.zIndex = "9999";

            const iframe = document.createElement("iframe");
            iframe.src = "https://votage-ai-assistant.vercel.app/";
            iframe.style.position = "fixed";
            iframe.style.bottom = "60px";
            iframe.style.right = "0px";
            iframe.style.width = "320px";
            iframe.style.height = "550px";
            iframe.style.border = "none";
            iframe.style.display = "none";
            iframe.style.borderRadius = "12px";
            iframe.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
            iframe.style.zIndex = "9999";

            button.onclick = () => {
              iframe.style.display =
                iframe.style.display === "none" ? "block" : "none";
            };

            document.body.appendChild(button);
            document.body.appendChild(iframe);
          })();
        `}</Script>
      </body>
    </html>
  );
}
