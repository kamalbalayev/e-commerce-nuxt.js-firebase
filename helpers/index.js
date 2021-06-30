import jwtDecode from "jwt-decode";
import cookieparser from 'cookieparser'

export function getUserFromCookie(cookie){

    if(process.server && process.static) return

    if(!cookie) return

    if(cookie) {

        const parsedCookie = cookieparser.parse(cookie)

        const accessTokenCookie = parsedCookie.access_token

        if(!accessTokenCookie) return

        const decodedToken = jwtDecode(accessTokenCookie)

        if(!decodedToken) return

        return decodedToken
    }
}
