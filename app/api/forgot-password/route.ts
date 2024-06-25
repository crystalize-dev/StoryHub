import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';

const prisma = new PrismaClient();

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_LOGIN,
        pass: process.env.GMAIL_PASSWORD
    }
});

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required!' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json(
                { error: 'User does not exist!' },
                { status: 400 }
            );
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenHash = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        const expirationTokenDate = new Date(Date.now() + 3600000); // 1 hour from now

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: resetTokenHash,
                resetTokenExpired: expirationTokenDate
            }
        });

        const resetURL = `${process.env.NEXT_URL}/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.GMAIL_LOGIN,
            to: email,
            subject: 'StoryHub Reset Password',
            html: `
                <h1>StoryHub Reset Password</h1>
                <p>You requested a password reset</p>
                <p>Click this <a href="${resetURL}">${resetURL}</a> to set a new password</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Password reset email sent!' },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
