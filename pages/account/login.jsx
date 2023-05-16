import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from "next/image";

import loginImg from 'pages/assets/Bothniabladet.png'

import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Login;

function Login() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        alertService.clear();
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(alertService.error);
    }

    return (

            <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                <div className='hidden sm:block'>
                    <img className='w-full h-full object-cover' src={loginImg} alt="" />
                </div>
        
                <div className='bg-gray-100 flex flex-col justify-center'>
                    <form className='max-w-[400px] w-full mx-auto bg-white p-4'>
                        <h2 className='text-4xl font-bold text-center py-6'>Bothniabladet.</h2>
                        <div className='flex flex-col py-2'>
                            <label>Användarnamn</label>
                            <input className='border p-2' type="text" />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Password</label>
                            <input className='border p-2' type="password" />
                        </div>
                        <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Sign In</button>
                        <div className='flex justify-between'>
                            <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                            <p>Create an account</p>
                        </div>
                    </form>
                </div>
            </div>
    );  


        /*<Layout>

            <header className="flex justify-center">

            <div className="flex flex-wrap items-center justify-around">

            <Link href="/startPage">
                        <Image
                                class="basis-1/8 shrink"
                                import loginImg from 'pages/assets/Bothniabladet.png'
                                src={require('pages/assets/Bothniabladet.png')}
                                alt="Bothniabladet logga"
                                width={1000}
                                height={1000}
                                priority
                            />
            </Link>

                        </div>

            </header>
            <div className="login_box">
                <h4 className="card-header">Logga in</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="loginButton">
                            
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Login
                        </button>
                        <Link href="/account/register" className="registerButton">Register</Link>
                    </form>
                </div>
            </div>
            
        </Layout> */
    
}