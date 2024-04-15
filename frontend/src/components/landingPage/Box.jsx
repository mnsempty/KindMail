import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const Box = () => {
    return (
        <div className="mx-auto max-w-md">
            <Accordion variant="splitted">
                <AccordionItem key="1" aria-label="Accordion 1" title="Comodidad">
                    Es muy cómodo poder comunicarte desde tu casa, además de sentirte más relajado y abierto lo que facilita la expresión de emociones y pensamientos.
                </AccordionItem>
                <AccordionItem key="2" aria-label="Accordion 2" title="Disponibilidad 24/7">
                    Está disponible las 24 horas del día lo que da flexibilidad para buscar apoyo en cualquier momento.
                </AccordionItem>
                <AccordionItem key="3" aria-label="Accordion 3" title="Accesibilidad">
                    Solo es necesario tener internet y algún dispositivo para conectarte, eliminamos barreras geográficas y monetarias.
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Box;
