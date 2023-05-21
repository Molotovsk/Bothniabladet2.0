import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


export default function Start() {
    return (
        <main
            // className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >

            <div className="bg-gradient-to-t from-emerald-700 to-green-300">
                <header className="flex justify-center bg-myColor-500">

                    <div class="flex flex-wrap items-center justify-around">

                        <Link href="/">
                            <Image
                                class="basis-1/8 shrink"
                                src={require('pages/assets/Bothniabladet.png')}
                                alt="Bothniabladet logga"
                                width={150}
                                height={100}
                                priority
                            />
                        </Link>

                        <Image
                            class="basis-1/2 shrink"
                            src={require('pages/assets/BothniabladetHeader.png')}
                            alt="Bothniabladet logga"
                            width={700}
                            height = {"auto"}
                            priority
                        />

                        <h1
                            // className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                            className="loginButton basis-1/8"
                        >

                            <Link href="login" className="bg-myColor-700 hover:bg-myColor-300 text-white font-bold py-2 px-4 border-b-4 border-myColor-800 hover:border-myColor-500 rounded" >
                                Logga in
                            </Link>

                        </h1>

                    </div>
                </header>
            </div>

            <div className="flex flex-col items-center pt-6">
                <h1 className="text-2xl">
                    Hitta dina bilder hos oss!
                </h1>

                <p>
                    Vi har bilder för alla ändamål.
                </p>
            </div>

            <div className="flex justify-center py-6">

                <Image
                    src={require('pages/assets/startbild.jpg')}
                    alt="Bothniabladet logga"
                    width={495}
                    height={500}
                    priority
                />
            </div>

            <div className="flex flex-col items-center pt-6">

                <h1 className="text-2xl">
                    Tipsa oss!
                </h1>

                <p className="py-6">
                    Har du tagit någon bra bild?
                    Skicka in den till oss genom att trycka på knappen nedan och skapa ett tips.
                </p>
                <Link className="bg-myColor-700 hover:bg-myColor-400 text-white font-bold py-2 px-4 border-b-4 border-myColor-800 hover:border-myColor-500 rounded" href={"tip"}>
                    Tipsa Bothniabladet
                </Link>
            </div>

            <div className="py-24">

            </div>

        </main>
    )
}