// import { ArweaveWalletKit } from "arweave-wallet-kit";
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      {/* <ArweaveWalletKit
        config={
          {
            appInfo: { name: "Notifier", logo: "LOGO url", }
          }
        }> */}
      <body >{children}</body>
      {/* </ArweaveWalletKit> */}
    </html>
  )
}
