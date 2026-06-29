'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Script from 'next/script'

const Agentation = dynamic(
  () => import('agentation').then((m) => m.Agentation),
  { ssr: false },
)

export function ChatWidget() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const isRegister = pathname?.startsWith('/register')
  const shouldShowWidget = !isAdmin && !isRegister

  return (
    <>
      {process.env.NODE_ENV === 'development' && <Agentation />}
      {shouldShowWidget && <Script id="votage-chat-widget" strategy="afterInteractive">{`
        (function () {
          const button = document.createElement("button");
          button.innerHTML = "\u{1F4AC} Chat";
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
          iframe.style.bottom = "80px";
          iframe.style.right = "5px";
          iframe.style.width = "320px";
          iframe.style.height = "550px";
          iframe.style.border = "none";
          iframe.style.display = "none";
          iframe.style.borderRadius = "12px";
          iframe.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
          iframe.style.zIndex = "9999";


          const toggleWidget = (e) => {
            if (e) e.stopPropagation();
            if (iframe.style.display === "none") {
              iframe.style.display = "block";
              button.innerHTML = "\u2715 Close";
            } else {
              iframe.style.display = "none";
              button.innerHTML = "\u{1F4AC} Chat";
            }
          };

          button.onclick = toggleWidget;

          document.addEventListener("click", (e) => {
            if (iframe.style.display === "block" && !button.contains(e.target)) {
              toggleWidget();
            }
          });

          document.body.appendChild(button);
          document.body.appendChild(iframe);
        })();
      `}</Script>}
    </>
  )
}
