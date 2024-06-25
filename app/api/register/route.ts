import { Prisma, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { password, email } = await req.json();

        if (!password || password.length < 5) {
            return NextResponse.json(
                { error: 'Пароль не удовлетворяет требованиям!' },
                { status: 400 }
            );
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(
            password,
            await bcrypt.genSalt(10)
        );

        // Попытка создать пользователя
        const createdUser = await prisma.user.create({
            data: { email: email, hashedPassword: hashedPassword }
        });

        return NextResponse.json(createdUser, { status: 200 });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return NextResponse.json(
                    { error: 'Email already exists!' },
                    { status: 400 }
                );
            }
        }
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
