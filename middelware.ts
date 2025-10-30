import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ req, token }) {
      const path = req.nextUrl.pathname;

      
      if (
        path.startsWith("/api/auth") ||
        path === "/login" ||
        path === "/register" ||
        path === "/"
      ) {
        return true;
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
