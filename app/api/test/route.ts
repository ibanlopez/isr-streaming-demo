import { NextResponse } from "next/server"
import { getPage, getNavigation, getGlobalSettings } from "@/lib/cms"

export async function GET() {
  try {
    // Test CMS functions
    const [homePage, navigation, globalSettings] = await Promise.all([
      getPage("", "en"),
      getNavigation("en"),
      getGlobalSettings("en"),
    ])

    return NextResponse.json({
      success: true,
      data: {
        homePage: homePage
          ? { id: homePage.id, title: homePage.title, componentsCount: homePage.components.length }
          : null,
        navigation: navigation ? { id: navigation.id, itemsCount: navigation.items.length } : null,
        globalSettings: globalSettings ? { id: globalSettings.id, language: globalSettings.language } : null,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
