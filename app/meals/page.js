import Link from 'next/link'
import { Suspense } from 'react'
import { getMeals } from '../../lib/meals-db'
import Mealsgrid from '../../components/meals/meals-grid'
import classes from './page.module.css'

async function MealsGrid() {
    const meals = await getMeals()
    return <Mealsgrid meals={meals} />
}
export default function page() {

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals created
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favorite recipe and cook it by yourself!</p>
                <p className={classes.cta}>
                    <Link href='/meals/share'>
                        Share your favorite recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={
                    <p className={classes.loading}>Coming soon..</p>
                }>
                    <MealsGrid />
                </Suspense>
            </main>
        </>
    )
}
