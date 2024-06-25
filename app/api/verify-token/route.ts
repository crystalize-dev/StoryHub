import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { error: 'Token is required!' },
                { status: 400 }
            );
        }

        const resetTokenHash = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await prisma.user.findFirst({
            where: { resetToken: resetTokenHash }
        });

        if (!user || !user.resetToken || !user.resetTokenExpired) {
            return NextResponse.json(
                { error: 'Token does not exist!' },
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
            return NextResponse.json(
                { error: 'Token expired!' },
                { status: 400 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'Database error!' }, { status: 500 });
    }
}
