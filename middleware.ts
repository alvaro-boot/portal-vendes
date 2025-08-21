import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const SESSION_COOKIE = "vd_session"

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  const isLogin = pathname === "/login"
  const isHome = pathname === "/"
  const isStatic =
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    /\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js)$/.test(pathname)

  if (isStatic) return NextResponse.next()

  const hasSession = Boolean(req.cookies.get(SESSION_COOKIE)?.value)

  if (!hasSession && !isLogin && !isHome) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("from", pathname + (search || ""))
    return NextResponse.redirect(url)
  }

  if (hasSession && isLogin) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
}


