import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from "next/image";
import { userService, alertService } from 'services';

export default Register;

function Register() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {
                alertService.success('Registration successful', true);
                router.push('login');
            })
            .catch(alertService.error);
    }

    return (
        <div className="min-h-screen bg-myColor-100">
            <header className="flex justify-center bg-myColor-500">
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
            <div className="flex justify-center py-24">
            <div className="card m-5 w-96 bg-myColor-300">
                <h4 className="card-header bg-myColor-500 font-extrabold">Registrera</h4>
                <div className="card-body font-semibold">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Förnamn</label>
                            <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Efternamn</label>
                            <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Användarnamn</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Lösenord</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div></div>
                        <button disabled={formState.isSubmitting} className="p-2 w-24 h-10 bg-myColor-500 rounded hover:bg-slate-300">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Registrera
                        </button>
                        <button className="p-1 w-24 h-10 rounded hover:bg-gray-300">
                        <Link href="/account/login" className=" text-black underline font-semibold">Avbryt</Link>
                        </button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    );
}
