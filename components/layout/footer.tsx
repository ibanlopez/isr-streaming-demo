import { getGlobalSettings } from "@/lib/cms"
import Link from "next/link"

interface FooterProps {
  language: string
}

export default async function Footer({ language }: FooterProps) {
  const globalSettings = await getGlobalSettings(language)

  if (!globalSettings) {
    return null
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              {globalSettings.footer.links.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <ul className="space-y-2">
              {globalSettings.footer.socialMedia.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-gray-300">{globalSettings.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
