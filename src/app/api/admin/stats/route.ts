import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");

    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const [rsvps, gifts, invitedGuests] = await Promise.all([
            prisma.rSVP.findMany(),
            prisma.gift.findMany({
                where: { isGiven: true }
            }),
            prisma.guest.findMany()
        ]);

        const totalConfirmed = rsvps.reduce((acc: number, curr: any) => acc + 1 + curr.numeroAcompanhantes, 0);
        const giftsTotal = gifts.reduce((acc: number, curr: any) => acc + (curr.price || 0), 0);

        // Pendentes are invited guests who haven't confirmed (we'll need a way to match names)
        // For now, let's just count them.
        const pendingCount = invitedGuests.length - rsvps.length;

        return NextResponse.json({
            success: true,
            stats: {
                totalRSVPs: rsvps.length,
                totalConfirmed,
                pendingCount: Math.max(0, pendingCount),
                giftsCount: gifts.length,
                giftsTotalValue: giftsTotal,
            },
            rsvps,
            gifts,
            invitedGuests
        });
    } catch (error) {
        console.error("Admin Stats Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
