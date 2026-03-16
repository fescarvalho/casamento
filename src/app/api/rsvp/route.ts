import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const rsvpSchema = z.object({
    nomeCompleto: z.string().min(3, "Nome muito curto"),
    numeroAcompanhantes: z.number().int().min(0),
    telefone: z.string().min(10, "Telefone inválido"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = rsvpSchema.parse(body);

        const rsvp = await prisma.rSVP.create({
            data: {
                nomeCompleto: validatedData.nomeCompleto,
                numeroAcompanhantes: validatedData.numeroAcompanhantes,
                telefone: validatedData.telefone,
            },
        });

        return NextResponse.json({ success: true, data: rsvp }, { status: 201 });
    } catch (error) {
        console.error("RSVP Error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: "Erro interno no servidor" }, { status: 500 });
    }
}
