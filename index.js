import express from 'express';
import puppeteer from 'puppeteer-extra';
import bodyParser from 'body-parser';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import OpenAI from 'openai';



const app = express();
const PORT = process.env.PORT || 3000;

puppeteer.use(StealthPlugin());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve the index.ejs file
app.get('/', (req, res) => {
    res.render('index', { title: '', messagegpt: '' });
});

const openai = new OpenAI({
    apiKey: "sk-proj-NU9i3yAi1UyEgkwFH00FT3BlbkFJgMF4V2jwvpiMwURNC6Hy"
});

// Declare titles variable outside the route handler
let titles = '';

// Handle form submission
app.post('/send-url', async (req, res) => {
    const { myurl } = req.body;

    try {
        // Launch Puppeteer and navigate to the submitted URL
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(myurl, { waitUntil: 'networkidle2' });

        // Emulate human-like behavior
        await page.setViewport({
            width: 1366 + Math.floor(Math.random() * 200), // Random width
            height: 768 + Math.floor(Math.random() * 200), // Random height
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36'
        ); // Random user agent

        // Perform actions like scrolling, clicking, etc.
        await page.waitForSelector('body');
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight); // Scroll down
        });

        // Random delay using setTimeout
        await delay(Math.floor(Math.random() * 3000) + 2000);

        // Scrape content and assign to titles variable
        titles = await page.evaluate(() => {
            const titleElement = document.querySelector("#mainContent div.q-box.qu-borderAll.qu-borderRadius--small.qu-borderColor--raised.qu-boxShadow--small.qu-bg--raised");
            return titleElement ? titleElement.textContent.trim() : 'Element not found';
        });

        console.log('Title:', titles);

        await browser.close();

        // Call runPrompt function after titles is assigned
        const messagegpt = await runPrompt();
        res.render('index', { title: titles, messagegpt });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const runPrompt = async () => {
    try {
        const prompt = "Tell me a joke about a developer not knowing how to use git";
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": titles }],
            max_tokens: 512,
            top_p: 1,
            temperature: 0.5,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return 'Error occurred';
    }
}
