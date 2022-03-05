'use strict'
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Encryption = use('Encryption')
class UserController {
    async login ({ request, auth, response }) {
        const token = await auth.withRefreshToken().attempt(
            request.input('email'),
            request.input('password')
        )
        if(token)
        {
        return response.json({
            status: 'success',
            data: token
        })
        }
    }
    async me ({auth}) {
        const user = auth.user
        return user
    }
}

module.exports = UserController
