import "./globals.css"
import { AuthProvider } from '../context/AuthContext'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


function RootLayout({children,}:{children :React.ReactNode;})
{
    return (
            <html lang='ja' className={cn("font-sans", geist.variable)}>
                <body className="center">
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </body>
            </html>
    )
}

export default RootLayout