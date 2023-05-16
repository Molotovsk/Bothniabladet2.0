import Image from "next/image";
import {Inter} from "next/font/google";
import Link from "next/link";
//import { Formik, Field, Form } from 'formik';
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <main
            // className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >

            <div>
                <header className="flex justify-center">

                    <div className="flex flex-wrap items-center justify-around">

                        <Link href="/startPage">
                            <Image
                                class="basis-1/8 shrink"
                                src={require('/pages/assets/Bothniabladet.png')}
                                alt="Bothniabladet logga"
                                width={150}
                                height={100}
                                priority
                            />
                        </Link>

                        <Image
                            class="basis-1/2 shrink"
                            src={require('/pages/assets/BothniabladetHeader.png')}
                            alt="Bothniabladet logga"
                            width={700}
                            height={"auto"}
                            priority
                        />

                        <Link href="/cart">
                            <button className= " text-black font-bold px-10 bg-red-500 bg-clip-content">  
                                0
                            </button>
                            <Image
                                class="basis-1/8 shrink"
                                src={require('/pages/assets/shoppingCart.png')}
                                alt="ShoppingCart"
                                width={50}
                                height={50}
                                priority
                            />
                        </Link>
                    </div>
                </header>
            </div>

           <div className="flex flex-col items-center pt-14">
                <Image
                    class="basis-1/2 shrink"
                    src={require('/pages/assets/sunset.jpg')}
                    alt="SunsetExamplePicture"
                    width={700}
                    height={300}
                    priority
                />
            </div>    

            <div className="flex flex-col items-center pt-10">
                <h1 className="text-2xl">
                    Bildnamn
                </h1>
            </div>
            <div className="flex flex-row justify-center items-center h-56">
                <Link href="/startPage">
                
                    <div className="p-5">
                        <button className="addToCartButton" type="submit">
                            Tillbaka
                        </button>
                    </div>
                
                </Link>
                <button className="addToCartButton" type="submit">
                            Lägg till i varukorg
                </button>
            </div>
        </main>
    )
}