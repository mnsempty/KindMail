import React from "react";
import Us from "../components/landingPage/Us";
import Info from "../components/landingPage/Info";
import Box from "../components/landingPage/Box";

const LandingPage = () => {

    const title = "text-center text-gray-700 my-5 dark:text-negro";

    return (
        <>
            <section id="nosotros" className="py-5">
                <h1 className={title}>¿Quiénes somos?</h1>
                <Us />
            </section>

            <section id="consultas" className="py-5">
                <h1 className={title}>Estadística</h1>
                <Info />
            </section>

            <section id="box" className="py-5">
                <h1 className={title}>Ventajas</h1>
                <Box />
            </section>

            <section className="h-96"></section>
        </>
    )
}

export default LandingPage;