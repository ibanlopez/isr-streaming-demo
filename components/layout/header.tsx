import { getNavigation, getGlobalSettings } from "@/lib/cms"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  language: string
}

export default async function Header({ language }: HeaderProps) {
  const [navigation, globalSettings] = await Promise.all([getNavigation(language), getGlobalSettings(language)])

  if (!navigation || !globalSettings) {
    return null
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${language}`} className="flex items-center">
            <Image
              src={globalSettings.header.logo || "/placeholder.svg"}
              alt="Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navigation.items.map((item) => (
              <div key={item.id} className="relative group">
                <Link href={item.href} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  {item.label}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href={language === "en" ? "/es" : "/en"}>
              <Button variant="outline" size="sm">
                {language === "en" ? "ES" : "EN"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
