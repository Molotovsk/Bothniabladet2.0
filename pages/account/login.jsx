import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from "next/image";

import loginImg from 'pages/assets/Bothniabladet.png'

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
        <div>
            <header className="flex justify-center bg-green-800">
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
                    <Link href="/startPage">
                        <Image
                            class="basis-1/2 shrink"
                            src={require('/pages/assets/BothniabladetHeader.png')}
                            alt="Bothniabladet logga"
                            width={700}
                            height={"auto"}
                            priority
                        />
                    </Link>
                </div>
            </header>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h4 className="card-header font-bold text-xl pt-5 bg-white">Logga in</h4>
                <div className="card-body ">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" py-4">
                            <label className="form-label">Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        
                        <div className="flex justify-center flex-row space-x-4">
                        <button disabled={formState.isSubmitting} className="bg-green-600 w-20 h-8 rounded hover:bg-gray-300">
                            
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Login
                        </button>
                        <button className="bg-green-600 w-20 h-8 rounded hover:bg-gray-300">
                            <Link href="/account/register">Register</Link>
                        </button>
                        </div>
                       
                    </form>
                </div>
            </div>
            </div>
            
    )
    
}