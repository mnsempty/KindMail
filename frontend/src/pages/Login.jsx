import { FaFacebookF, FaLinkedin, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";
import useLogin from "../hooks/useLogin.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const btn = "border-2 border-blanco rounded-full text-sm text-blanco p-3 mx-1 hover:bg-azulclaro-100 hover:text-azul-600 dark:hover:text-azul-700";
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { loading, login } = useLogin((path) => navigate(path));

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full text-center h-full">
                <div className="bg-azul-600 rounded-2xl shadow-2xl flex w-full max-w-4xl">
                    <div className="w-full p-5">
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-blanco mb-2">Iniciar sesión</h2>
                            <div className="border-2 w-10 border-blanco inline-block mb-2"></div>
                            <div className="flex justify-center my-2">
                                <a href="#" className={btn}><FaFacebookF /></a>
                                <a href="#" className={btn}><FaLinkedin /></a>
                                <a href="#" className={btn}><FaGoogle /></a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-gray-100 p-2 flex items-center rounded-md mb-3 w-full md:w-96">
                                    <FaRegEnvelope className="text-gray-400 mr-2" />
                                    <input type="email" name="email" placeholder="Email" className="flex-1 bg-gray-100 p-2 outline-none text-sm max-w-sm" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                                </div>
                                <div className="bg-gray-100 p-2 flex items-center rounded-md mb-3 w-full md:w-96">
                                    <MdLockOutline className="text-gray-400 mr-2" />
                                    <input type="password" name="password" placeholder="Contraseña" className="flex-1 bg-gray-100 p-2 outline-none text-sm max-w-sm" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                                </div>
                                <div className="flex justify-between items-center mb-3 text-blanco">
                                    <label className="flex items-center text-xs">
                                        <input type="checkbox" name="remember" className="mr-1" />Recuérdame
                                    </label>
                                    <a href="#" className="text-xs">¿Has olvidado tu contraseña?</a>
                                </div>
                                <button className="border-2 border-blanco text-blanco rounded-full px-12 py-2 inline-block font-semibold hover:bg-azulclaro-100 hover:text-azul-600 dark:hover:text-azul-700 mb-10">
                                    {loading ? "Cargando..." : "Acceder"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
