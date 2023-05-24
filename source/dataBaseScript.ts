import axios from 'axios'
import { People, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

(() => {
    axios.get('https://swapi.dev/api/starships/?page=1&format=json')
        .then((response) => {
            // aqui acessamos o corpo da resposta:
            response.data.results.forEach(async (element: any) => {
                    await prisma.starship.create({
                    data: {
                        name: element.name,
                        model: element.model,
                        crew_max_amount: Number(element.crew),
                        crew_current_amount: 0,
                        crew_name: "none",
                    }
                })
            })
        })
        .catch(function (error) {
            // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
            console.log(error);
        })
})()