import { FaFacebookF, FaLinkedin, FaGoogle, FaRegEnvelope, FaUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";
import useSignUp from "../hooks/useSignUp.jsx";
import { useNavigate } from "react-router-dom";

//Links
import { Link, NavLink } from "react-router-dom";

const Register = () => {

    const btn = "border-2 border-blanco rounded-full text-sm text-blanco p-3 mx-1 hover:bg-azulclaro-100 hover:text-azul-600 dark:hover:text-azul-700 ";

    const navigate = useNavigate();
    const { loading, signup } = useSignUp((path) => navigate(path));

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full text-center h-full">
                <div className="bg-azul-600 rounded-2xl shadow-2xl flex w-full max-w-4xl">
                    <div className="w-full p-5">
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-blanco mb-2">Registro</h2>
                            <div className="border-2 w-10 border-blanco inline-block mb-2"></div>
                            <div className="flex justify-center my-2">
                                <a href="#" className={btn}>
                                    <FaFacebookF />
                                </a>
                                <a href="#" className={btn}>
                                    <FaLinkedin />
                                </a>
                                <a href="#" className={btn}>
                                    <FaGoogle />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-gray-100 w-full md:w-96 p-2 flex items-center rounded-md mb-3">
                                    <FaUser className="text-gray-400 m-2" />
                                    <input type="text" name="name" placeholder="Nombre" className="bg-gray-100 outline-none text-sm flex-1" value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })}></input>
                                </div>
                                <div className="bg-gray-100 w-full md:w-96 p-2 flex items-center rounded-md mb-3">
                                    <FaRegEnvelope className="text-gray-400 m-2" />
                                    <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })}></input>
                                </div>
                                <div className="bg-gray-100 w-full md:w-96 p-2 flex items-center rounded-md mb-3">
                                    <MdLockOutline className="text-gray-400 m-2" />
                                    <input type="password" name="password" placeholder="Contraseña" className="bg-gray-100 outline-none text-sm flex-1" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}></input>
                                </div>
                                <div className="flex justify-between w-full md:w-96 mb-5 text-blanco">
                                    <label className="flex items-center text-xs">
                                        <input type="checkbox" name="remember" className="mr-1" />Remember me
                                    </label>
                                    <Link to="/login" className="text-xs">¿Ya tienes una cuenta?</Link>
                                </div>
                                <button className="border-2 border-blanco text-blanco rounded-full px-12 py-2 inline-block font-semibold hover:bg-azulclaro-100 hover:text-azul-600 dark:hover:text-azul-700 mb-10">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Register;
