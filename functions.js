const rp = require('request-promise');
const $ = require('cheerio');
const baseUrl = 'https://ricette.giallozafferano.it'

exports.recipesFromIngredient = async ingredient => {
    return new Promise(async function (resolve, reject) {
    const url = `https://www.giallozafferano.it/ricerca-ricette/${ingredient}`;

    const html = await rp(url)
    let elements = $('h2.gz-title > a', html).get()

    let recipes = elements.map(e => ({title: e.attribs.title, href: e.attribs.href}))

    resolve(recipes)
    });
}

exports.recipeFromUrl = async url => {
    return new Promise(async function (resolve, reject) {
        const html = await rp(url)   
        
        let ingredientsSC = $('dd.gz-ingredient > a', html).get() // Array of all the ingredients
        let ingredients = ingredientsSC.map(e => {
            let name = $(e).text()
            let quantity = $(e).parent().find('span').text().replace(/\t/g, '').replace(/\n/g, '')//.replace(/\s/g, '')
            return {name, quantity} //Return an array of objects with ingredient and quantity as properties
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

        let difficulty = $('.gz-list-featured-data > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2) > strong', html).text()
        let prepTime = $('span.gz-icon.gz-icon-preparazione', html).next().children().text()
        let cookTime = $('.gz-list-featured-data > ul:nth-child(1) > li:nth-child(3) > span:nth-child(2) > strong', html).text()
        let yield = $('.gz-list-featured-data > ul:nth-child(1) > li:nth-child(4) > span:nth-child(2) > strong', html).text()
        let price = $('.gz-list-featured-data > ul:nth-child(1) > li:nth-child(5) > span:nth-child(2) > strong', html).text()
        resolve({ingredients, imgUrl, description, difficulty, prepTime, cookTime, yield, price, recipe, preservation, suggestion}) // Result object
    });
}