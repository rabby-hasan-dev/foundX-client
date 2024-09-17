import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type Role=keyof typeof roleBasedRoutes;

const authRoutes = ['/login', '/register']

const roleBasedRoutes = {
    USER: [/^\/profile/], // regular expreession after profile/ match
    ADMIN: [/^\/admin/],
}

export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    // const user = {
    //     name: 'rabby',
    //     token: 'abcdefghijklmnopqrstuvwxyz',
    //     // role: 'USER'
    //     role: 'ADMIN'
    // }
    const user=undefined

    if (!user) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (user) {

        if (user?.role && roleBasedRoutes[user?.role as Role]) {
            const routes = roleBasedRoutes[user?.role as Role];
            if (routes.some((route) => pathname.match(route))) {
                return NextResponse.next();
            }
        }
    }


    return NextResponse.redirect(new URL('/', request.url))

}



// See "Matching Paths" below to learn more

export const config = {
    matcher: ['/profile', '/admin', '/login', '/register'],
}