# GialloZafferano_Scraper

Short NodeJS script to get recipes from https://www.giallozafferano.it

## Install Dependencies
```
npm install --save request request-promise cheerio puppeteer
```

## Available Functions
Currently, there are 2 functions available:

### -- Get recipes from ingredients

``` js
const result = await recipesFromIngredient('riso')
```
You will get an array of recipes with the specified ingredient.
#### Sample json response:
``` json 
{
  "title": "string",
  "href": "string"
}, 
...
```

### -- Get recipe from url
``` js
const result = await recipeFromUrl('https://ricette.giallozafferano.it/Treccia-di-pasta-lievitata.html')
```
You will get an object with the recipe data.
#### Sample json response:
``` json 
{
  "imgUrl": "string",
  "description": "string",
  "preservation": "string",
  "suggestion": "string",
  "difficulty": "string",
  "prepTime": "string",
  "cookTime": "string",
  "yield": "string",
  "price": "string"
  "ingredients": [
      {
        "name": "string",
        "quantity": "string"
      }
    ],
  "recipe": [
      {
        "step": "string",
        "imgUrl": "sring"
      }
    ]  
}
```
