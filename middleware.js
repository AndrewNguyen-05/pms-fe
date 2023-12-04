import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    console.log("in middleware");
    console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token);
    // admin
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.userdata.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
    // academic affair
    if (
      request.nextUrl.pathname.startsWith("/academic-affair") &&
      request.nextauth.token?.userdata.role !== "aa"
    ) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
    // student
    if (
      request.nextUrl.pathname.startsWith("/student") &&
      request.nextauth.token?.userdata.role !== "student"
    ) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
    // teacher
    if (
      request.nextUrl.pathname.startsWith("/teacher") &&
      request.nextauth.token?.userdata.role !== "teacher"
    ) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("callback:", token?.userdata);
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);
export const config = {
  matcher: [
    "/academic-affair/:path*",
    `/student/:path*`,
    `/teacher/:path*`,
    `/admin/:path*`,
    "/",
  ],
};
