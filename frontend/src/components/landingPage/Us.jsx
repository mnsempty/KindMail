import React from "react";
import image1 from "../../assets/manu.png";
import image2 from "../../assets/marta.png";
import image3 from "../../assets/manu.png";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

const Us = () => {
    return (
        <div className="flex flex-wrap justify-evenly">
            <Card className="w-full md:w-96 m-2">
                <CardHeader className="h-72 md:h-96">
                    <img isZoomed src={image1} alt="Álvaro" />
                </CardHeader>
                <CardBody className="text-center py-5">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Álvaro Martínez Lineros
                    </Typography>
                </CardBody>
            </Card>

            <Card className="w-full md:w-96 m-2">
                <CardHeader className="h-72 md:h-96">
                    <img isZoomed src={image2} alt="Álvaro" />
                </CardHeader>
                <CardBody className="text-center py-5">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Marta Borreguero Soria
                    </Typography>
                </CardBody>
            </Card>

            <Card className="w-full md:w-96 m-2">
                <CardHeader className="h-72 md:h-96">
                    <img isZoomed src={image3} alt="Álvaro" />
                </CardHeader>
                <CardBody className="text-center py-5">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Manuel Nogales Serrano
                    </Typography>
                </CardBody>
            </Card>
        </div >
    );
};

export default Us;
