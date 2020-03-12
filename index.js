const rp = require('request-promise');
const $ = require('cheerio');
const baseUrl = 'https://ricette.giallozafferano.it'

let a = {
    "ingredients": [
        {
            "name": "string",
            "quantity": "string"
    }
    ],
    "recipe": [
        {
            "recipeStep": "string",
            "recipeImages": "sring"
        }
    ],
    "preservation": "string",
    "suggestion": "string",
    "imgUrl": "string"

}

const recipesFromIngredient = async ingredient => {
    const url = `https://www.giallozafferano.it/ricerca-ricette/${ingredient}`;

    const html = await rp(url)
    let elements = $('h2.gz-title > a', html).get()

    let recipes = elements.map(e => ({title: e.attribs.title, href: e.attribs.href}))

    return recipes
}

const recipeFromUrl = async url => {
    const html = await rp(url)   
    
    let ingredientsSC = $('dd.gz-ingredient > a', html).get() // Array of all the ingredients
    let ingredients = ingredientsSC.map(e => {
        let ingredient = $(e).text()
        let quantity = $(e).parent().find('span').text().replace(/\t/g, '').replace(/\n/g, '')//.replace(/\s/g, '')
        return {ingredient, quantity} //Return an array of objects with ingredient and quantity as properties
    })

    let imgUrl = $('picture.gz-featured-image > source', html).attr('data-srcset') // Image of the recipe
    let divP = $('div.gz-content-recipe.gz-mBottom4x > p', html) // Get all the elements with such a CSS Path
    let description = divP.first().text() // If the element does not exist null is returned
    let preservation = $(divP[2]).text() // If the element does not exist null is returned
    let suggestion = $(divP[3]).text() // If the element does not exist null is returned 

    let recipeSC = $('div.gz-content-recipe-step', html).get() // Array of all recipe steps
    let recipe = recipeSC.map(e => {
        let step = $('p', $(e)).text()
        let imgUrl = baseUrl + $('picture > source', $(e)).attr('data-srcset')
        return {step, imgUrl} //Return an array of objects with step and imgUrl as properties
    })   

    console.log({ingredients, imgUrl, description, recipe, preservation, suggestion}) // Result object
}

recipeFromUrl('https://ricette.giallozafferano.it/Treccia-di-pasta-lievitata.html')
