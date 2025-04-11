import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const authRoute = ["/login", "/register"];
const commonPrivateRoutes = ["/dashboard", "/dashboard/change-password"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) {
    if (authRoute.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}


export const config = {
  matcher: ["/login", "/register", "/dashboard"],
};
