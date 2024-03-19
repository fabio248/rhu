import fs from "fs";
import { parse } from "csv-parse";
import ObjectsToCsv from "objects-to-csv";
import { Stats } from "fast-stats";



function main() {
    readCsvFile();
}

async function readCsvFile() {
    console.log("2. Exploración de Datos:")
    console.log("\t2.1. Verifica que los datos se hayan cargado correctamente")
    const id = new Stats()
    const valor1= new Stats()
    const valor2 = new Stats()

    await fs.createReadStream('./datos.csv')
        .pipe(parse({ delimiter: ',', columns: true, ltrim: true }))
        .on('data', function(csvrow) {
            id.push(csvrow.id === '' ? 0 : +csvrow.id)
            valor1.push(csvrow.valor1 === '' ? 0 : +csvrow.valor1)
            valor2.push(csvrow.valor2 === '' ? 0 : +csvrow.valor2)
        }).on('end', () => {
            console.log({id: id.data, valor1: valor1.data, valor2: valor2.data})
            console.log("\t2.2 Resumen Estadístico: ")
            console.log("\t\t2.2.1. Estadísticas de id: ")
            console.log("\t\t\t2.2.1.1. Media: ", id.amean())
            console.log("\t\t\t2.2.1.2. Mediana: ", id.median())
            console.log("\t\t\t2.2.1.3. Desviación Estándar: ", id.stddev())
            console.log("\t\t\t2.2.1.4. Mínimo y Maximo: ", id.range())
            console.log("\t\t\t2.2.1.6. Percentiles: ", id.percentile(25), id.percentile(50), id.percentile(75))

            console.log("\t\t2.2.2. Estadísticas de valor1: ")
            console.log("\t\t\t2.2.2.1. Media: ", valor1.amean())
            console.log("\t\t\t2.2.2.2. Mediana: ", valor1.median())
            console.log("\t\t\t2.2.2.3. Desviación Estándar: ", valor1.stddev())
            console.log("\t\t\t2.2.2.4. Mínimo y Maximo: ", valor1.range())
            console.log("\t\t\t2.2.2.6. Percentiles: ", valor1.percentile(25), valor1.percentile(50), valor1.percentile(75))

            console.log("\t\t2.2.3. Estadísticas de valor2: ")
            console.log("\t\t\t2.2.3.1. Media: ", valor2.amean())
            console.log("\t\t\t2.2.3.2. Mediana: ", valor2.median())
            console.log("\t\t\t2.2.3.3. Desviación Estándar: ", valor2.stddev())
            console.log("\t\t\t2.2.3.4. Mínimo y Maximo: ", valor2.range())
            console.log("\t\t\t2.2.3.6. Percentiles: ", valor2.percentile(25), valor2.percentile(50), valor2.percentile(75))

            console.log("\t2.3 Determina si hay valores nulos en el conjunto de datos y cómo los manejarías.")
            console.log(`\t\tSi hay valores nulos en el conjunto de datos, se pueden manejar de diferentes maneras, dependiendo del contexto 
\t\ty el objetivo del análisis. En este caso se opta por reemplazar los valores nulos por 0, 
\t\tya que no se cuenta con información suficiente para imputar un valor que represente adecuadamente el dato faltante.`)
        })
        /*
        * - Crea una nueva columna llamada "total" que sea la suma de las columnas "valor1" y "valor2".  - Calcula el promedio de la columna "total".
        * */

            const total = []
            const totalStats = new Stats()
            await fs.createReadStream('./datos.csv')
                .pipe(parse({ delimiter: ',', columns: true, ltrim: true }))
                .on('data', function(csvrow) {
                    const totalAmount = (csvrow.valor1 === '' ? 0 : +csvrow.valor1) + (csvrow.valor2 === '' ? 0 : +csvrow.valor2)
                    totalStats.push(totalAmount)
                    total.push({ ...csvrow, total: totalAmount })
                }).on('end', () => {
                    console.log("\t2.4 Creación de Nuevas Variables:")
                    console.log("\t\t2.4.1. Creación de la columna total: ")
                    console.log(total)
                    console.log("\t\t2.4.2. Promedio de la columna total: ", totalStats.amean())

                })
}

main();
