import { Prisma, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();

    const pass = body.password;

    if (!pass?.length || pass.length < 5) {
        return NextResponse.json(
            { error: 'Пароль не удовлетворяет требованиям!' },
            { status: 400 }
        );
    }

    const notHashedPassword = pass;

    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    let createdUser = {};

    try {
        await prisma.user.create({ data: body });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002')
                return NextResponse.json(
                    { error: 'Email already exists!' },
                    { status: 400 }
                );
            else return NextResponse.json(err, { status: 400 });
        }
        throw err;
    }

    return NextResponse.json(createdUser, { status: 200 });
}
