
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {alertService, userService} from 'services';
import {tipService} from "../../services/tip.service";
import {useState} from "react";


export default function Tip() {

    const router = useRouter();

    // form validation rules
    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .required('Description is required'),
        keyword: Yup.string()
            .required('Keyword is required'),
        email: Yup.string()
            .required('Email is required'),
        firstname: Yup.string()
            .required('Firstname is required'),
        lastname: Yup.string()
            .required('Lastname is required')

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const [formValues, setFormValues] = useState({
        file: "",
        description: "",
        keyword: "",
        email: "",
        firstname:"",
        lastname:""
    })

    // // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit() {
        alertService.success('Tack! Ditt tips har skickats!', true)
        setFormValues({
            file: "",
            description: "",
            keyword: "",
            email: "",
            firstname:"",
            lastname:""
        })
    }

    return (
        <main>
            <div>
                <header className="flex justify-center">

                    <div className="flex flex-wrap items-center justify-around">

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
                            height={"auto"}
                            priority
                        />

                        <h1
                            // className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                            className="loginButton basis-1/8"
                        >
                            <Link href="login">
                                Logga in
                            </Link>

                        </h1>

                    </div>
                </header>
            </div>

            <div className="flex flex-col items-center pt-7">
                <h1 className="text-2xl">
                    Tipsa Bothniabladet!
                </h1>

                <p>
                    Har du nyhetstips eller bilder? Skicka in din bild till oss!
                </p>
            </div>

            <div className="flex flex-col py-10 items-center">

                <h2 className="text-2xl pb-6">
                    Välj bild</h2>


                <form onSubmit={handleSubmit(onSubmit)}>

                    <input className="pb-6" type="file" name="myImage"
                           value={formValues.file}
                           onChange={(e) =>
                               setFormValues({ ...formValues, file: e.target.value }) }>
                    </input>

                    <div className="flex flex-col pb-7">
                        <label> Beskrivning </label>
                        <input required type="text"  {...register('description')} class="form-control" name="description" className="px-20" id="descrTip"
                               value={formValues.description}
                               onChange={(e) =>
                                   setFormValues({ ...formValues, description: e.target.value }) }
                            >
                    </input>

                        <label> Sökord </label>
                        <input required type="text" {...register('keyword')} class="form-control" name="keyword" id="keywordTip"
                            value={formValues.keyword}
                            onChange={(e) =>
                            setFormValues({ ...formValues, keyword: e.target.value }) } >
                        </input>

                    </div>

                    <div className="flex flex-col pt-7">

                        <label> Email </label>
                        <input required type="text" {...register('email')} class="form-control" name="email" id="emailTip"
                            value={formValues.email}
                            onChange={(e) =>
                            setFormValues({ ...formValues, email: e.target.value }) } >
                        </input>

                        <label> Förnamn </label>
                        <input required type="text" {...register('firstname')} class="form-control" name="firstname" id="firstnameTip"
                            value={formValues.firstname}
                            onChange={(e) =>
                            setFormValues({ ...formValues, firstname: e.target.value }) }>
                        </input>

                        <label> Efternamn </label>
                        <input required type="text" {...register('lastname')} class="form-control" name="lastname" id="lastnameTip"
                            value={formValues.lastname}
                            onChange={(e) =>
                            setFormValues({ ...formValues, lastname: e.target.value }) }>
                        </input>

                    </div>

                    <div className="pt-6">
                        <button disabled={formState.isSubmitting} className="loginButton" class="form-control" type="submit" >
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Skicka tips
                        </button>

                    </div>
                </form>
            </div>
        </main>
    )
}

