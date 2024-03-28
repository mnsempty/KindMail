import React from "react";
import { Image } from "@nextui-org/react";
import image1 from "../../../public/IMG_6039.jpg";
import image2 from "../../../public/IMG_6052.jpg";
import image3 from "../../../public/IMG_6055.jpg";

const Us = () => {
    return (
        <div className="flex justify-evenly">
            <div className="text-center">
                <Image isZoomed width={240} alt="Álvaro" src={image1} />
                <span>Álvaro</span>
            </div>
            <div className="text-center">
                <Image isZoomed width={240} alt="Marta" src={image2} />
                <span>Marta</span>
            </div>
            <div className="text-center">
                <Image isZoomed width={240} alt="Manuel" src={image3} />
                <span>Manuel</span>
            </div>
        </div>
    );
};

export default Us;
