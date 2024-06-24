import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    const resetTokenHash = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    let user;

    try {
        user = await prisma.user.findFirst({
            where: { resetToken: resetTokenHash }
        });
    } catch (err) {
        return NextResponse.json({ error: 'Database error!' }, { status: 400 });
    }

    if (!user || !user.resetToken || !user.resetTokenExpired) {
        return NextResponse.json(
            { error: 'User does not exists!' },
            { status: 400 }
        );
    }

    if (user.resetTokenExpired < new Date()) {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: null,
                resetTokenExpired: null
            }
        });
        return NextResponse.json({ error: 'Token expired!' }, { status: 400 });
    } else {
        return NextResponse.json(user, { status: 200 });
    }

    return NextResponse.json(user, { status: 200 });
}
