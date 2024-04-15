import React from "react";
import { Image } from "@nextui-org/react";
import image1 from "../../assets/6326055.png";
// import image2 from "";
// import image3 from "";
// import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     CardFooter,
//     Typography,
//     Tooltip,
// } from "@material-tailwind/react";

const Us = () => {
    return (
        <div className="flex justify-evenly">
            <Image isZoomed src={image1} alt="Álvaro" className="h-96" />
            <Image isZoomed src={image1} alt="Marta" className="h-96" />
            <Image isZoomed src={image1} alt="Manuel" className="h-96" />
            {/* <Card className="w-96">
                <CardHeader floated={false} className="h-96">
                    <Image isZoomed src={image1} alt="Álvaro" />
                </CardHeader>
                <CardBody className="text-center py-5">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Álvaro Martínez Lineros
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        SAP (Deloitte)
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 py-5">
                    <Tooltip content="GitHub">
                        <FaGithub className="text-azul" href="#" size={24} />
                    </Tooltip>
                    <Tooltip content="Linkedin">
                        <FaLinkedin className="text-azul" href="#" size={24} />
                    </Tooltip>
                    <Tooltip content="Instagram">
                        <FaInstagram className="text-azul" href="#" size={24} />
                    </Tooltip>
                </CardFooter>
            </Card>

            <Card className="w-96">
                <CardHeader floated={false} className="h-96">
                    <Image isZoomed src={image2} alt="Álvaro" />
                </CardHeader>
                <CardBody className="text-center py-5">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Marta Borreguero Soria
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        Front (Deloitte)
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 py-5">
                    <Tooltip content="GitHub">
                        <FaGithub className="text-azul" href="#" size={24} />
                    </Tooltip>
                    <Tooltip content="Linkedin">
                        <FaLinkedin className="text-azul" href="#" size={24} />
                    </Tooltip>
                    <Tooltip content="Instagram">
                        <FaInstagram className="text-azul" href="#" size={24} />
                    </Tooltip>
                </CardFooter>
            </Card>

            <Card className="w-96">
                <CardHeader floated={false} className="h-96">
                    <Image isZoomed src={image3} alt="Álvaro" />
                </CardHeader>
                <CardBody className="text-center py-5">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Manuel Nogales Serrano
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        Oracle (Ayesa)
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 py-5">
                    <Tooltip content="GitHub">
                        <FaGithub className="text-azul" href="#" size={24} />
                    </Tooltip>
                    <Tooltip content="Linkedin">
                        <FaLinkedin className="text-azul" href="#" size={24} />
                    </Tooltip>
                    <Tooltip content="Instagram">
                        <FaInstagram className="text-azul" href="#" size={24} />
                    </Tooltip>
                </CardFooter>
            </Card> */}
        </div >
    );
};

export default Us;
