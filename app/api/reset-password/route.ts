import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { password, user } = await req.json();

    let userUpdated;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        userUpdated = await prisma.user.update({
            where: { id: user.id },
            data: {
                hashedPassword: hashedPassword,
                resetToken: null,
                resetTokenExpired: null
            }
        });
    } catch (err) {
        return NextResponse.json(
            { error: 'Something went wrong with database!' },
            { status: 400 }
        );
    }

    return NextResponse.json(userUpdated, { status: 200 });
}
