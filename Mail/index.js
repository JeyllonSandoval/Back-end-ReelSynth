

import fs from 'fs'


export const htmlWelcome = ({userName}) => {
    const WelcomeTemplate = fs.readFileSync("./Mail/WelcomeTemplate.html", "utf8");

    const modifedWelcome = WelcomeTemplate.replace(/@userName/g, userName)

    return modifedWelcome
}

export const htmlSerieUpdated = async ({serieName, imgURL}) => {
    console.log(serieName)
    const SerieUpdated = fs.readFileSync("./Mail/SerieUpdated.html", "utf8");

    const modifedSerie = SerieUpdated.replace(/@serieName/g, serieName).replace(/@imgURL/g, imgURL)


    return modifedSerie
}


export const htmlTemporada = ({serieName, numCap, numTemp, imgURL}) => {
    const TemporadaUpdated = fs.readFileSync("./Mail/TemporadaUpdated.html", "utf8");

    const modifedTemp = TemporadaUpdated.replace(/@serieName/g, serieName).replace(/@numCap/g, numCap).replace(/@numTemp/g, numTemp).replace(/@imgURL/g, imgURL)


    return modifedTemp
}



