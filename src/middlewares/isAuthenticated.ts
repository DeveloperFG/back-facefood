import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    
    // Receber o token

    const AuthToken = req.headers.authorization;

    if(!AuthToken){
        return res.status(401).end();
    }

     
    const [, token] = AuthToken.split(" ")

    try{
        // validar o token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;

        //  recuperar o id do token, colocando dentro de uma variavel dento do req
        
        req.user_id = sub

        return next();

    }catch(err){
        return res.status(401).end();
    }
}