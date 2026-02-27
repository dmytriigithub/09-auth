import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // 🔹 Якщо немає accessToken
  if (!accessToken) {
    // але є refreshToken → пробуємо поновити сесію
    if (refreshToken) {
      const data = await checkServerSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const response = isPublicRoute
          ? NextResponse.redirect(new URL("/", request.url))
          : NextResponse.next();

        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          if (parsed.accessToken) {
            response.cookies.set("accessToken", parsed.accessToken);
          }

          if (parsed.refreshToken) {
            response.cookies.set("refreshToken", parsed.refreshToken);
          }
        }

        return response;
      }
    }

    // 🔹 Якщо токенів немає
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }

  // 🔹 Якщо accessToken є
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
