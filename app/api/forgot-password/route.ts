import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';

const prisma = new PrismaClient();

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAil_LOGIN,
        pass: process.env.GMAIL_PASSWORD
    }
});

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !email)
        return NextResponse.json(
            { error: 'User does not exists!' },
            { status: 400 }
        );

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenHash = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const expirationTokenDate = new Date();

    expirationTokenDate.setHours(expirationTokenDate.getHours() + 1);

    try {
        await await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: resetTokenHash,
                resetTokenExpired: expirationTokenDate
            }
        });
    } catch (err) {
        return NextResponse.json(
            { error: 'Something went wrong with database!' },
            { status: 400 }
        );
    }

    const resetURL = process.env.NEXT_URL + 'reset-password/' + resetToken;
    const mailOptions = {
        from: process.env.GMAil_LOGIN,
        to: email,
        subject: 'StoryHub Reset Password',
        html: `<h1>StoryHub Reset Password</h1>
        <p>You requested a password reset</p>
        <p>Click this <a href="${resetURL}">${resetURL}</a> to set a new password</p>`
    };

    try {
        transporter.sendMail({ ...mailOptions });
    } catch (err) {
        return NextResponse.json(
            { error: 'Something went wrong with sending email!' },
            { status: 400 }
        );
    }

    return NextResponse.json(user, { status: 200 });
}
