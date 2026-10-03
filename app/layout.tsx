import type {Metadata,Viewport} from "next";import "./globals.css";
export const metadata:Metadata={title:"Speak Up — A public record of lived experience",description:"A privacy-first space for people to share their experiences of freedom of speech."};
export const viewport:Viewport={themeColor:"#030304"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style></noscript></head><body>{children}</body></html>}