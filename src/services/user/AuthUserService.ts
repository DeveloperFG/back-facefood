import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface AuthReuest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password}: AuthReuest){
        // verificar se o email existe.

        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("User/password incorrect")
        }

        // verificar se a senha está correta 

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User/password incorrect")
        }

        // gerar um token JWT e devolver os dados do ususario com id, name e email

        const token = sign(
            {
                name: user.name,
                email: user.email,

            },
                process.env.JWT_SECRET, 
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService}