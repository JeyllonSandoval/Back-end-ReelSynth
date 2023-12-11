

import fs from 'fs'

interface props {
    userName?: string,
    serieName?: string,
    numCap?: string,
    numTemp?: string,
    imgURL?: string
}

export const htmlWelcome = ({userName}: props) => {
    if(!userName) throw new Error("userName is required")
    const WelcomeTemplate = fs.readFileSync("./Mail/WelcomeTemplate.html", "utf8");

    const modifedWelcome = WelcomeTemplate.replace(/@userName/g, userName)

    return modifedWelcome
}

export const htmlSerieUpdated = async ({serieName, imgURL}: props) => {
    if(!serieName) throw new Error("serieName is required")
    if(!imgURL) throw new Error("imgURL is required")
    console.log(serieName)
    const SerieUpdated = fs.readFileSync("./Mail/SerieUpdated.html", "utf8");

    const modifedSerie = SerieUpdated.replace(/@serieName/g, serieName).replace(/@imgURL/g, imgURL)


    return modifedSerie
}


export const htmlTemporada = ({serieName, numCap, numTemp, imgURL}: props) => {
    if(!serieName) throw new Error("serieName is required")
    if(!numCap) throw new Error("numCap is required")
    if(!numTemp) throw new Error("numTemp is required")
    if(!imgURL) throw new Error("imgURL is required")
    const TemporadaUpdated = fs.readFileSync("./Mail/TemporadaUpdated.html", "utf8");

    const modifedTemp = TemporadaUpdated.replace(/@serieName/g, serieName).replace(/@numCap/g, numCap).replace(/@numTemp/g, numTemp).replace(/@imgURL/g, imgURL)


    return modifedTemp
}



