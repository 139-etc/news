import "./globals.css"
import { AuthProvider } from '../context/AuthContext'

function RootLayout({children,}:{children :React.ReactNode;})
{
    return (
            <html lang='ja'>
                <body className="center">
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </body>
            </html>
    )
}

export default RootLayout