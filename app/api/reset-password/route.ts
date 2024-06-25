import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { password, user } = await req.json();

        if (!password || !user || !user.id) {
            return NextResponse.json(
                { error: 'Invalid request data!' },
                { status: 400 }
            );
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(
            password,
            await bcrypt.genSalt(10)
        );

        // Обновление пользователя
        const userUpdated = await prisma.user.update({
            where: { id: user.id },
            data: {
                hashedPassword,
                resetToken: null,
                resetTokenExpired: null
            }
        });

        return NextResponse.json(userUpdated, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: 'Something went wrong with database!' },
            { status: 500 }
        );
    }
}
