
import ImagePicker from '@/components/meals/image-picker'
import { insertMeal } from '@/lib/meals-db'
import FormSub from '@/components/meals/meals-formsubmit'
import classes from './page.module.css';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default function ShareMealPage() {
    //submit form
    async function submition(formData) {
        'use server'//explict decalaration
        const meal = {
            title: formData.get('title'),
            summary: formData.get('summary'),
            instructions: formData.get('instructions'),
            image: formData.get('image'),
            creator: formData.get('name'),
            creator_email: formData.get('email')
        }

        await insertMeal(meal)
        revalidatePath('/meals')
        redirect('/meals')
    }
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={submition}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required />
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="10"
                            required
                        ></textarea>
                    </p>
                    <ImagePicker label='Your image' name='image' />
                    <p className={classes.actions}>
                        <FormSub />
                    </p>
                </form>
            </main>
        </>
    );
}
