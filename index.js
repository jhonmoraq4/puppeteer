import puppeteer from "puppeteer";
import fs from "fs/promises"

async function openWebPage(){

    const browser = await puppeteer.launch(
        {
            headless: false
        }
    )
    const page = await browser.newPage()

    await page.goto("http://example.com")
    await page.screenshot({path: 'example.png'})
    await browser.close()
}

//openWebPage() 

async function NavigatePage(){

    const browser = await puppeteer.launch(
        {
            headless: false,
            slowMo: 400
        }
    )
    const page = await browser.newPage()

    await page.goto("http://quotes.toscrape.com/")
    await page.click('a[href="/login"]');
    await new Promise (r =>setTimeout(r,5000));
    await browser.close()
}

//NavigatePage()

async function getDataFromWebPage(){

    const browser = await puppeteer.launch(
        {
            headless: false,
            slowMo: 400
        }
    )
    const page = await browser.newPage()

    await page.goto("http://example.com/")

    const reuslt = await page.evaluate(() => {
       const title= document.querySelector('h1').innerText
       const desciption= document.querySelector('p').innerText
       const more= document.querySelector('a').innerText
       return {
        title, 
        desciption,
        more
       }
    })
    console.log (reuslt)

    await browser.close()
}

//getDataFromWebPage()


async function getDatoFromNewWebPage(){

    const browser = await puppeteer.launch(
        {
            headless: false,
            slowMo: 300
        }
    )
    const page = await browser.newPage()

    await page.goto("http://quotes.toscrape.com/")

    const reuslt = await page.evaluate(() => {
       const quotes= document.querySelectorAll('.quote');
        console.log(quotes)
        const data=[...quotes].map(quote => {
            const quoteText=quote.querySelector('.text').innerText;
            const author=quote.querySelector('.author').innerText;
            const tags=[...quote.querySelectorAll('.tag')].map((tag)=> tag.innerText);
            return{
                quoteText,
                author,
                tags,
            }
        });
        return {
            data
        }
    })
    console.log (reuslt)

    fs.writeFile('quotes.json', JSON.stringify(reuslt), null, 2)

    await browser.close()
}
getDatoFromNewWebPage()
