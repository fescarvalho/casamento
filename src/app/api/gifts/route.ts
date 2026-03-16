import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const giftSelectionSchema = z.object({
    giftId: z.number(),
    giverName: z.string().min(2, "Nome é obrigatório"),
    giverMessage: z.string().optional(),
});

export async function GET() {
    try {
        const gifts = await prisma.gift.findMany({
            where: { isGiven: false },
            orderBy: { id: "asc" },
        });
        return NextResponse.json(gifts);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar presentes" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { giftId, giverName, giverMessage } = giftSelectionSchema.parse(body);

        const updatedGift = await prisma.gift.update({
            where: { id: giftId },
            data: {
                isGiven: true,
                giverName,
                giverMessage,
                givenAt: new Date(),
            },
        });

        return NextResponse.json({ success: true, gift: updatedGift });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
        }
        return NextResponse.json({ error: "Erro ao selecionar presente" }, { status: 500 });
    }
}
