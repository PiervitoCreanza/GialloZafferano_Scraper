# GialloZafferano_Scraper

Short NodeJS script to get recipes from https://www.giallozafferano.it

## Sample json response:
```json
{
  "imgUrl": "string",
  "description": "string",
  "preservation": "string",
  "suggestion": "string",
  "ingredients": [{
        "name": "string",
        "quantity": "string"
    }],
  "recipe": [{
        "step": "string",
        "imgUrl": "sring"
    }]  
}
```

## Install Dependencies
```
npm install --save request request-promise cheerio puppeteer
```
