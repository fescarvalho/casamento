import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
    const gifts = [
        // Group 1
        { name: "Kit Porta Temperos/condimentos giratório", category: "Cozinha", productUrl: "https://www.google.com/search?q=Kit+Porta+Temperos+condimentos+giratório&tbm=shop" },
        { name: "Jarra de Suco de vidro", category: "Cozinha", productUrl: "https://www.google.com/search?q=Jarra+de+Suco+de+vidro&tbm=shop" },
        { name: "Cortador de Queijo", category: "Cozinha", productUrl: "https://www.google.com/search?q=Cortador+de+Queijo&tbm=shop" },
        { name: "Tábua de corte", category: "Cozinha", productUrl: "https://www.google.com/search?q=Tábua+de+corte&tbm=shop" },
        { name: "Kit Colheres de Silicone", category: "Cozinha", productUrl: "https://www.google.com/search?q=Kit+Colheres+de+Silicone&tbm=shop" },
        { name: "Peneira de cozinha Inox", category: "Cozinha", productUrl: "https://www.google.com/search?q=Peneira+de+cozinha+Inox&tbm=shop" },
        { name: "Kit potes Tupperware", category: "Cozinha", productUrl: "https://www.google.com/search?q=Kit+potes+Tupperware&tbm=shop" },
        { name: "Tabuleiro Inox", category: "Cozinha", productUrl: "https://www.google.com/search?q=Tabuleiro+Inox&tbm=shop" },
        { name: "Bowl Tramontina", category: "Cozinha", productUrl: "https://www.google.com/search?q=Bowl+Tramontina&tbm=shop" },
        { name: "Forma de bolo Inox", category: "Cozinha", productUrl: "https://www.google.com/search?q=Forma+de+bolo+Inox&tbm=shop" },
        { name: "Jogo de copos tulipas (Água/Suco) (6 uni)", category: "Cozinha", productUrl: "https://www.google.com/search?q=Jogo+de+copos+tulipas&tbm=shop" },
        { name: "Processador de alimentos", category: "Eletro", productUrl: "https://www.google.com/search?q=Processador+de+alimentos&tbm=shop" },
        { name: "Mixer", category: "Eletro", productUrl: "https://www.google.com/search?q=Mixer&tbm=shop" },
        { name: "Lixeira Inox", category: "Cozinha", productUrl: "https://www.google.com/search?q=Lixeira+Inox&tbm=shop" },
        { name: "Forma de pizza Inox", category: "Cozinha", productUrl: "https://www.google.com/search?q=Forma+de+pizza+Inox&tbm=shop" },
        { name: "Jogo Assadeiras cerâmica", category: "Cozinha", productUrl: "https://www.google.com/search?q=Jogo+Assadeiras+cerâmica&tbm=shop" },
        { name: "Taças de sobremesa (6 uni)", category: "Cozinha", productUrl: "https://www.google.com/search?q=Taças+de+sobremesa&tbm=shop" },
        { name: "Kit Porta mantimentos de vidro", category: "Cozinha", productUrl: "https://www.google.com/search?q=Kit+Porta+mantimentos+de+vidro&tbm=shop" },
        { name: "Espremedor de frutas", category: "Eletro", productUrl: "https://www.google.com/search?q=Espremedor+de+frutas&tbm=shop" },
        { name: "Jogo de xícaras para café porcelana (6 uni)", category: "Cozinha", productUrl: "https://www.google.com/search?q=Jogo+de+xícaras+para+café+porcelana&tbm=shop" },

        // Group 2
        { name: "Jogo de pratos porcelana (30 peças)", category: "Cozinha", productUrl: "https://www.google.com/search?q=Jogo+de+pratos+porcelana+30+peças&tbm=shop" },
        { name: "Jogo taças grandes (6 uni)", category: "Cozinha", productUrl: "https://www.google.com/search?q=Jogo+taças+grandes&tbm=shop" },
        { name: "Kit Faqueiro Tramontina", category: "Cozinha", productUrl: "https://www.google.com/search?q=Kit+Faqueiro+Tramontina&tbm=shop" },
        { name: "Jogo Frigideiras Antiaderentes", category: "Cozinha", productUrl: "https://www.google.com/search?q=Jogo+Frigideiras+Antiaderentes&tbm=shop" },
        { name: "Kit Faqueiro Inox", category: "Cozinha", productUrl: "https://www.google.com/search?q=Kit+Faqueiro+Inox&tbm=shop" },
        { name: "Escorredor de louça inox", category: "Cozinha", productUrl: "https://www.google.com/search?q=Escorredor+de+louça+inox&tbm=shop" },
        { name: "Jogo de lençol 100% algodão cama box", category: "Cama/Banho", productUrl: "https://www.google.com/search?q=Jogo+de+lençol+100+algodão+cama+box&tbm=shop" },
        { name: "Edredom Casal 100% algodão queen", category: "Cama/Banho", productUrl: "https://www.google.com/search?q=Edredom+Casal+100+algodão+queen&tbm=shop" },
        { name: "Chaleira elétrica", category: "Eletro", productUrl: "https://www.google.com/search?q=Chaleira+elétrica&tbm=shop" },
        { name: "Sanduicheira", category: "Eletro", productUrl: "https://www.google.com/search?q=Sanduicheira&tbm=shop" },
        { name: "Queijeira de Vidro", category: "Cozinha", productUrl: "https://www.google.com/search?q=Queijeira+de+Vidro&tbm=shop" },

        // Group 3
        { name: "Liquidificador", category: "Eletro", productUrl: "https://www.google.com/search?q=Liquidificador&tbm=shop" },
        { name: "Cafeteira elétrica", category: "Eletro", productUrl: "https://www.google.com/search?q=Cafeteira+elétrica&tbm=shop" },
        { name: "AirFryer (6 a 12 litros)", category: "Eletro", productUrl: "https://www.google.com/search?q=AirFryer&tbm=shop" },
        { name: "Jogo de Panelas antiaderentes Tramontina", category: "Cozinha", productUrl: "https://www.google.com/search?q=Jogo+de+Panelas+antiaderentes+Tramontina&tbm=shop" },
        { name: "Batedeira elétrica", category: "Eletro", productUrl: "https://www.google.com/search?q=Batedeira+elétrica&tbm=shop" },
        { name: "Robô aspirador de pó que passa pano", category: "Eletro", productUrl: "https://www.google.com/search?q=Robô+aspirador+de+pó+que+passa+pano&tbm=shop" },
        { name: "Ferro de Passar a vapor", category: "Eletro", productUrl: "https://www.google.com/search?q=Ferro+de+Passar+a+vapor&tbm=shop" },
        { name: "Geladeira (260 a 591 Litros)", category: "Eletrodoméstico", productUrl: "https://www.google.com/search?q=Geladeira+260+litros&tbm=shop" },
        { name: "Fogão 5 bocas", category: "Eletrodoméstico", productUrl: "https://www.google.com/search?q=Fogão+5+bocas&tbm=shop" },
        { name: "Máquina de lavar 10kg", category: "Eletrodoméstico", productUrl: "https://www.google.com/search?q=Máquina+de+lavar+10kg&tbm=shop" },
        { name: "Televisão <= 50 polegadas", category: "Eletrônico", productUrl: "https://www.google.com/search?q=Televisão+50+polegadas&tbm=shop" },
        { name: "Panela de pressão elétrica", category: "Eletro", productUrl: "https://www.google.com/search?q=Panela+de+pressão+elétrica&tbm=shop" },
        { name: "Mesa de cozinha 6 cadeiras", category: "Móvel", productUrl: "https://www.google.com/search?q=Mesa+de+cozinha+6+cadeiras&tbm=shop" },
    ];

    console.log("Cleaning and Seeding gifts...");
    await prisma.gift.deleteMany();

    for (const gift of gifts) {
        await prisma.gift.create({
            data: gift,
        });
    }

    console.log("Seeding guests...");
    await prisma.guest.deleteMany();
    const guestList = [
        { name: "Família Carvalho", maxCompanions: 4 },
        { name: "Família Silva", maxCompanions: 3 },
        { name: "João Silva", maxCompanions: 1 },
        { name: "Maria Oliveira", maxCompanions: 1 },
        { name: "Pedro Santos", maxCompanions: 0 },
    ];

    for (const guest of guestList) {
        await prisma.guest.create({
            data: guest,
        });
    }

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
