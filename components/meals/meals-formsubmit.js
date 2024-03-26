'use client'
import { useFormStatus } from 'react-dom'

export default function MealsFormsubmit() {
    const { pending } = useFormStatus()
    return (
        <button disabled={pending}>{pending ? 'Submitting...' : 'Share Meals'} </button>
    )
}
