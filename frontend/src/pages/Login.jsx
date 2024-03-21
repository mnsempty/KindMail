import { FaFacebookF, FaLinkedin, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";
import useLogin from "../hooks/useLogin.jsx";

const Login = () => {

    const btn = "border-2 border-blanco rounded-full text-sm text-blanco p-3 mx-1 hover:bg-azulclaro hover:text-azul";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className="bg-azul rounded-2xl shadow-2xl flex w-full max-w-4xl">
                    <div className="w-full p-5">
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-blanco mb-2">Iniciar sesión</h2>
                            <div className="border-2 w-10 border-blanco inline-block mb-2"></div>
                            <div className="flex justify-center my-2">
                                <a href="#" className={btn}>
                                    <FaFacebookF></FaFacebookF>
                                </a>
                                <a href="#" className={btn}>
                                    <FaLinkedin></FaLinkedin>
                                </a>
                                <a href="#" className={btn}>
                                    <FaGoogle></FaGoogle>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-gray-100 w-96 p-2 flex items-center rounded-md mb-3">
                                    <FaRegEnvelope className="text-gray-400 m-2"></FaRegEnvelope>
                                    <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div className="bg-gray-100 w-96 p-2 flex items-center rounded-md mb-3">
                                    <MdLockOutline className="text-gray-400 m-2"></MdLockOutline>
                                    <input type="password" name="password" placeholder="Contraseña" className="bg-gray-100 outline-none text-sm flex-1" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                                <div className="flex justify-between w-96 mb-5 text-blanco">
                                    <label className="flex items-center text-xs">
                                        <input type="checkbox" name="remember" className="mr-1" />Recuérdame
                                    </label>
                                    <a href="#" className="text-xs">¿Has olvidado tu contraseña?</a>
                                </div>
                                <button
                                    className="border-2 border-blanco text-blanco rounded-full px-12 py-2 inline-block font-semibold hover:bg-azulclaro hover:text-azul mb-10">
                                    Acceder
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;