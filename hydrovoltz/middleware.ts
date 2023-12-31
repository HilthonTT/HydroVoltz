import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks(.*)"],
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      const path = new URL("/chat", req.url);

      return NextResponse.redirect(path);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
