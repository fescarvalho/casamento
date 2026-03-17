import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
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
        const guest = await prisma.guest.findUnique({ where: { id } });

        if (!guest) {
            return NextResponse.json({ success: false, message: "Convidado não encontrado" }, { status: 404 });
        }

        const updated = await prisma.guest.update({
            where: { id },
            data: { isChecked: !guest.isChecked }
        });

        return NextResponse.json({ success: true, guest: updated });
    } catch (error) {
        console.error("Toggle Guest Error:", error);
        return NextResponse.json({ success: false, message: "Erro ao atualizar status" }, { status: 500 });
    }
}
