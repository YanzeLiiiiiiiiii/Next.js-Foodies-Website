'use client'
import classes from './image-picker.module.css'
import { useRef, useState } from 'react'
import Image from 'next/image'
export default function Imagepicker({ label, name }) {
    const [imageUpload, setImage] = useState(null)
    const imageInput = useRef()
    console.log(imageUpload)
    return (
        <>
            <div className={classes.picker}>
                <label htmlFor='image'>{label}</label>
                <div className={classes.controls}>
                    <div className={classes.preview}>
                        {imageUpload ? <Image src={imageUpload} alt='Image Preview' fill /> : <p> No Image picked yet</p>}
                    </div>

                    <input
                        className={classes.input}
                        required
                        type='file'
                        id={name}
                        accept='image/png, image/jpeg'
                        name={name}
                        ref={imageInput}
                        onChange={(e) => {
                            const file = e.target.files[0]
                            if (!file) return
                            //built-in filereader function, read the file and get content 
                            //Once read operation completed, trigger onload function
                            const fileReader = new FileReader()
                            fileReader.readAsDataURL(file)
                            fileReader.onload = () => {
                                setImage(fileReader.result)
                            }

                        }}
                    >
                    </input>
                    <button className={classes.button} type='button' onClick={() => {
                        imageInput.current.click()
                    }}>Upload Image</button>

                </div>
            </div>
        </>
    )
}
