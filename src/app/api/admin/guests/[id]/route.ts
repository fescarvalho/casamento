import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idParam } = await params;
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");

    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const id = parseInt(idParam);
        await prisma.guest.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Guest Error:", error);
        return NextResponse.json({ success: false, message: "Erro ao excluir convidado" }, { status: 500 });
    }
}
