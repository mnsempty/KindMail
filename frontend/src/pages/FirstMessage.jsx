import { User, Divider, Textarea, Input, Button } from "@nextui-org/react";
import { SendIcon } from "../assets/icons/SendIcon";

const FirstMessage = () => {
    return (
        <>
            <div className="shadow rounded border p-5">

                <div className="mb-2">Para:</div>
                <User
                    name="Destinatario"
                    avatarProps={{
                        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                    }}
                />
                <Divider className="m-3" />


                <div className="mb-2">Asunto</div>
                <Input type="text" placeholder="¡Saluda!" value={null} />
                <Divider className="m-3" />

                <div className="mb-2">Mensaje</div>
                <div className="flex flex-col md:flex-row md:items-end gap-2">
                    <Textarea
                        placeholder="Escribe aqui tus buenas palabras..."
                        className="max-w-full h-20 rounded" // Establece la altura del Textarea a 32 unidades
                        value={null}
                    />
                    <Button
                        placeholder=""
                        className="bg-azul h-20 rounded-full" // Establece la altura del Button a 32 unidades
                        color="warning"
                    >
                        <SendIcon />
                    </Button>
                </div>


            </div>
        </>
    )
}

export default FirstMessage;