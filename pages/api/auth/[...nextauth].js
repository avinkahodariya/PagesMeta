import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';
export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await MongoClient.connect(
                    process.env.MONGODB_URI,
                    { useNewUrlParser: true, useUnifiedTopology: true }
                );
                const users = await client.db().collection('users');
                const result = await users.findOne({
                    username: credentials.username,
                });
                if (!result) {
                    client.close();
                    throw new Error('No user found with the email');
                }
                const checkPassword = await compare(credentials.password, result.hash);
                if (!checkPassword) {
                    client.close();
                    throw new Error('Password doesnt match');
                }
                client.close();
                return { username: result.username };
            },
        }),
    ],
});