import QRCodeLib from "qrcode";  // ← rename the import
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import QRCodeButton from "@/components/ui/QRCodeButton";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://linkid.qzz.io";

async function generateQRCode() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) redirect("/login");
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });
        if (!user?.username) redirect("/dashboard");
        const url = `https://linkid.qzz.io/${user.username}`;
        const qrCode = await QRCodeLib.toDataURL(url);  // ← use renamed import
        return qrCode;
    } catch (error) {
        console.error(error);
    }
}

export default async function QRCode() {
    const qrCode = await generateQRCode();
    return <QRCodeButton qrCode={qrCode ?? ""} />;
}