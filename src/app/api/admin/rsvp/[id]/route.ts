import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");

    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const id = parseInt(params.id);
        await prisma.rSVP.delete({
            where: { id }
        });

        return NextResponse.json({ success: true, message: "Confirmação removida com sucesso" });
    } catch (error) {
        console.error("Delete RSVP Error:", error);
        return NextResponse.json({ success: false, message: "Erro ao remover confirmação" }, { status: 500 });
    }
}
