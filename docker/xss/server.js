import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import puppeteer from "puppeteer";
import path from "path";
const urlencodedParser = bodyParser.urlencoded({extended: false})

const reviews = [{
    posted_at: new Date(),
    content: "First comment"
}]

const apiKey = "API-ADMIN-KEY-SUDO-ROOT-SO-STRONG-BRO"

const app = express()
app.set("view engine","ejs")
app.set('views',  path.resolve("./assets/views"));
app.use(express.static(path.resolve("./assets")))
app.use(session({
    secret: "thisisasecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

app.get("/",(req, res) => {
    res.render("reviews",{reviews})
})

app.post("/reviews", urlencodedParser, async (req, res) => {
    reviews.push({
        posted_at: new Date(),
        content: req.body.review
    })
    res.redirect("/")
})

app.get("/getapikey",(req, res) => {
    if (req.query.secret == "imtheboss"){
        res.cookie("API_KEY",apiKey)
    }
    res.redirect("/")
})

app.listen(80, async () => {
    console.log("Server launched")
    const browser = await puppeteer.launch({userDataDir: path.resolve("./userData"), args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('http://localhost/getapikey?secret=imtheboss');
    setInterval(async () => {
        await page.goto('http://localhost/')
        await page.cookies()
    }, 10000)
})