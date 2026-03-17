import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");

    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, group, maxCompanions } = body;

        if (!name) {
            return NextResponse.json({ success: false, message: "Nome é obrigatório" }, { status: 400 });
        }

        const guest = await (prisma.guest as any).create({
            data: {
                name,
                group,
                maxCompanions: parseInt(String(maxCompanions)) || 0,
            }
        });


        return NextResponse.json({ success: true, guest });
    } catch (error: any) {
        console.error("Create Guest Error:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ success: false, message: "Este convidado já está na lista" }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: "Erro ao criar convidado" }, { status: 500 });
    }
}
