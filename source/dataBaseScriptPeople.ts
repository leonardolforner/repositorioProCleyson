import axios from 'axios'
import { People, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

(() => {
    axios.get('https://swapi.dev/api/people/?page=9&format=json')
        .then((response) => {
            // aqui acessamos o corpo da resposta:
            response.data.results.forEach(async (element: any) => {

                await prisma.people.create({
                    data: {
                        name: element.name,
                        height: element.height,
                        mass: element.mass,
                        /*
                        in_starship: {
                            model:"defaul",
                            crew_max_amount: 100000,
                            crew_current_amount:0,
                            crew_name:"none"
                        },
                        */
                        starship_name: "none",
                    }
                })
            })
        })
        .catch(function (error) {
            // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
            console.log(error);
        })
})()