
const pg = require('pg');
const { Pool } = pg;
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const guestsFernando = `
Filomena Fonseca
Adriana Bueno
Pedro Henrique Gonçalves
João Miguel Thurler
Carlos Alberto Thurler
Rita de Cassia
Geraldo Fonseca
Aparecida Fonseca
Cleiton Fonseca
Geiza Martins 
Regina Carvalho
Evellin Santos
Guilherme Viana
Monica Pereira
Leia Carvalho
Silvio Cesar
Celma (Silvio)
Edilson Nunes
Jacira 
Luiz Potente
Carmelia Potente
Thiago Potente
João Vitor Potente
Ana Potente
Josenir Potente
Leandro Abreu
Suellen Ferreira
Sofia Abreu
Yasmin Abreu
Lais Ferreira
Miguel Ferreira
Odilon Abreu
Edmilson Gonçalves
Vanice Goncalves
Patrick Ferreira
Karol (Patrick)
Eduardo Neves
Thaynara Neves
Maria Aparecida Menezes
Luan Gonçalves
Ivina
Lúcia Helena
Thatiana Borato
Filipe Araújo
Lucas Dias
Guilherme José
Pedro Caetano
Elaiane Caetano
Rafael Pedro
Thalles Luiz
Rafael Saraiva
Verônica Victoria
Edlen Prevatto
Verônica Moraes
Verônica Muller
Gabriel Soares
Monica Soares
Stella 
Lavinia
Sophia 
Maria Clara Arantes
Maria Clara Rodrigues
Maria Eduarda Martins
Thiago Silvério
Emilly
Luelly
Isabel Garona
Graziela
Camilla Lacerda
Alice Alcerda
Maria Batista
Geraldo (Marido da Maria Batista)
Felix Silveira
Zane
Zyon 
Simone Pereira
Miqueias Oliveira
Cainara Oliveira
Kelvi Leal
Magna Bellan
Glauco Bellan
Luiz Guilherme
Paula (Luiz Guilherme)
Daniella Costa
Maurito Bastida
Erivelton Goncalves
Amabile (Erivelon)
Elizangela 
Geilson (Elizangela)
Jomar 
Esposa do Jomar
Adilson Vieira
Carlos Oliver
Esposa do Carlos
Ivilin Estevam
Celso Monteiro
`.split('\n').map(n => n.trim().replace(/:$/, '')).filter(n => n.length > 0);

const guestsVittorya = `
Alessandra Bazeth
Isabela Bazeth
Isaac Pinho
Tony Assis
Luana (Tony)
João Carlos França
Vo Maria
Vo Caçula
Tio Diego
Priscila (Diego)
Julieta
Roberto
Tia Luzia
Tio Ricardo
Liliana
Thalles (Liliana)
Sofia (Liliana)
Liziana
Douglas
Sofia (Liziana)
Tio Afonsinho
Tia Marli
Roberta
Marcilio
Rosimere
Rosilene
Chicago
Aline
Rogério
Andreia
Gabriel
Vo Zely
Tia Edna
Marlon
Kelly
Luana (Clinica)
Wellington (Luan)
Melina
Cristiano 
Ana Beatriz
Mirelly Cateano
Thiago (Mirelly)
Renata
Marcos (Renata)
Sofia Fitaroni
João Vitor (Sofia)
Alice
Gabriel (Alice)
Laura
Ana Clara
Gustavo
Luana (Gustavo)
Nayara
Gustavo (Nayara)
Ycaro
Pedro (Ycaro)
Pietro
Talia
Caio
Tamires
Margareth
Antônio
Mateus Baião
Clara (Mateus)
Karine
Rodrigo
Conceição
Edesio
Jonathan
Caio Gonçalves
Ingrid
Pietro (Ingrid)
Laine
Marido da Laine
Tati
Tom
Sandra
Amanda
Eltinho
Michele
Iago
Lara
Baraba
Vinicius
Tia Vera
Tio Everton
Miguel (Tia Vera)
Isaac (Tia Vera)
Tia Cacau
Samuel
Marilza
Savio Menezes
Isabela Novaes
Lazaro
Cecilia
Eriston
Padre João
Padre Janvier
Rosane
Wellington (2)
Rosangela
Waltercy
Richard
Picina
Ivete
Ana Irene
Paulinho
Lucas
Glaucia
Claudineia
Emara
Helo
Marido da Helo
Julia
Pierre
Nayane
Marido Nayane
Matheus
Nicoly
Suelen
Marido Suelen
Taciana
Marido da Taciana
Itaciara
Marido da Itaciara
Stefany
Namorado da Stefany
Elaine
Gabriel
Fernanda(Gabriel)
Carminha e Familia
Marcelo
Marinalva
`.split('\n').map(n => n.trim().replace(/:$/, '').replace(/\(Alice0$/, '(Alice)')).filter(n => n.length > 0);

async function main() {
    const client = await pool.connect();
    try {
        console.log('Clearing existing guests...');
        await client.query('DELETE FROM "Guest"');

        console.log(`Seeding Fernando's guests (${guestsFernando.length})...`);
        for (const name of guestsFernando) {
            await client.query('INSERT INTO "Guest" (name, "group", "isInvited", "maxCompanions", "isChecked") VALUES ($1, $2, $3, $4, $5) ON CONFLICT (name) DO UPDATE SET "group" = $2', [name, 'Fernando', true, 0, false]);
        }

        console.log(`Seeding Vittorya's guests (${guestsVittorya.length})...`);
        for (const name of guestsVittorya) {
            await client.query('INSERT INTO "Guest" (name, "group", "isInvited", "maxCompanions", "isChecked") VALUES ($1, $2, $3, $4, $5) ON CONFLICT (name) DO UPDATE SET "group" = $2', [name, 'Vittorya', true, 0, false]);
        }

        console.log('Seeding completed!');
    } finally {
        client.release();
        await pool.end();
    }
}

main().catch(console.error);
