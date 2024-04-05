import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";

const Profile = () => {
    return (
        <>
            <div className="bg-azul-600 grid grid-rows-2 md:grid-rows-2 gap-20 rounded-lg p-5">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex justify-center md:justify-start">
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-50 h-50 text-large md:row-span-2 md:col-span-1" />
                    </div>
                    <div className="grid-rows-3">
                        <p className="font-sans text-gray-50 text-center mt-2">Nombre User</p>
                        <p className="font-sans text-gray-50 text-center mt-2">Email User</p>
                    </div>
                </div>


                <div className="container flex justify-center md:justify-end">
                    <button
                        className="w-50 h-20 border-2 border-blanco text-blanco rounded-full px-12 py-2 inline-block font-semibold hover:bg-azulclaro-100 hover:text-azul-600 mb-10"
                    >
                        Cambiar datos
                    </button>
                </div>




            </div>


        </>
    )
}

export default Profile;