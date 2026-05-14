import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { RSVP_DEADLINE } from "@/lib/constants";

const rsvpSchema = z.object({
    nomeCompleto: z.string().min(3, "Nome muito curto"),
    numeroAcompanhantes: z.number().int().min(0).max(2),
    nomesAcompanhantes: z.string().optional(),
    telefone: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        if (new Date() > RSVP_DEADLINE) {
            return NextResponse.json({
                success: false,
                message: "O prazo para confirmação de presença se encerrou."
            }, { status: 403 });
        }

        const body = await request.json();
        const validatedData = rsvpSchema.parse(body);

        const rsvp = await (prisma as any).rSVP.create({
            data: {
                nomeCompleto: validatedData.nomeCompleto.trim(),
                numeroAcompanhantes: validatedData.numeroAcompanhantes,
                nomesAcompanhantes: validatedData.nomesAcompanhantes || "",
                telefone: validatedData.telefone?.trim() || "",
            },
        });

        return NextResponse.json({ success: true, data: rsvp }, { status: 201 });
    } catch (error: any) {
        console.error("RSVP Error Detailed:", error);
        return NextResponse.json({
            success: false,
            message: error.message || "Erro interno no servidor",
            details: error.code || undefined
        }, { status: 500 });
    }
}
