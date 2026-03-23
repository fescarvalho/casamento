import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const { searchParams } = new URL(request.url);
        const password = searchParams.get("password");

        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const id = parseInt(idParam);
        if (isNaN(id)) {
            return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
        }

        const body = await request.json();
        const { isGiven } = body;

        const updatedGift = await prisma.gift.update({
            where: { id },
            data: {
                isGiven,
                givenAt: isGiven ? new Date() : null,
                giverName: isGiven ? (body.giverName || "Administrador") : null,
                giverMessage: isGiven ? (body.giverMessage || "Marcado manualmente") : null,
            },
        });

        return NextResponse.json({ success: true, gift: updatedGift });
    } catch (error) {
        console.error("Admin Gift PATCH Error:", error);
        return NextResponse.json({ success: false, message: "Error updating gift" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const { searchParams } = new URL(request.url);
        const password = searchParams.get("password");

        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const id = parseInt(idParam);
        if (isNaN(id)) {
            return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
        }

        await prisma.gift.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin Gift DELETE Error:", error);
        return NextResponse.json({ success: false, message: "Error deleting gift" }, { status: 500 });
    }
}
