import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';


const client = new OAuth2Client(
    process.env.google_client_id,
    process.env.google_client_secret
)


@Injectable()
export class AuthService {
    async verifyCredentials(token: string, client_id: string) {

        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: client_id
            })

            const user = ticket.getPayload();

            return { success: true }
        } catch (error) {
            return {success: false, error: "Session expired please try again!"}
        }

    }
}
