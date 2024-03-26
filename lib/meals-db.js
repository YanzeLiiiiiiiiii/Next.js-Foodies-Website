import fs from 'node:fs'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
const db = sql('meals.db')

export function getMeals() {
    // throw new Error('test error component')
    //test loading
    // await new Promise(resolve => setTimeout(resolve, 2000))
    //Select all from db , all function for executing sql
    return db.prepare('SELECT * FROM meals').all();

}

//Get specific meal by using dynamic params
export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)

}

//insert meal
export async function insertMeal(meal) {
    //generate slug auto and xss protection
    meal.slug = slugify(meal.title, { lower: true })
    meal.instructions = xss(meal.instructions)

    const extention = meal.image.name.split('.').pop()
    //generate unique name
    const fileName = `${meal.slug}.${extention}`

    const writeStream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferImg = await meal.image.arrayBuffer()
    writeStream.write(Buffer.from(bufferImg), err => {
        if (err) throw new Error('Image saving failed ')
    })
    //get path
    meal.image = `/images/${fileName}`

    db.prepare(`
        INSERT INTO meals (title,summary,instructions, creator, creator_email, image, slug)
        VALUES ( @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug)
        `).run(meal)

}





