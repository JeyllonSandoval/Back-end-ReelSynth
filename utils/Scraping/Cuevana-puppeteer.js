import puppeteer from "puppeteer";

const CuevanaScrapingPuppeteer = async (url) => {
    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Esperar 1 segundo antes de continuar
    // Esperar a que el elemento h1 exista

    const title = await page.$eval("h1", (element) => element.textContent);
    const description = await page.$eval(
        ".Description",
        (element) => element.textContent
    );
    const age = parseInt(
        (await page.$eval("p.meta span", (element) => element.textContent)) ||
            "0"
    );
    const image = await page.$eval(".Image figure .lazy", (element) => {
        const imgElement = element;
        return imgElement.src;
    });
    const videoUrl = await page.$eval(".load-video iframe", (element) => {
        const iframeElement = element;
        return iframeElement.src;
    });
    const video = await page.$eval(".load-video iframe", (element) => {
        const iframeElement = element;
        return iframeElement.outerHTML;
    });
    const videoWithSrc = video.replace('src="', `src="${videoUrl}`);

    browser.close();

    const data = {
        title,
        description,
        image,
        age,
        video: videoWithSrc,
        src: videoUrl,
        iframe: video,
    };
    return data;
};

export default CuevanaScrapingPuppeteer;
