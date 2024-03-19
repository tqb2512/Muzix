import Image from "next/image";

interface BoxProps {
    title: string;
    description: string;
    image: string;
    link: string;
}

export default function Box({title, description, image, link}: BoxProps) {
    return (
        <div className="flex flex-col items-center justify-center w-64 h-70 bg-white rounded-md shadow-md">
            <Image src={image} alt="box image" width={64} height={64} />
            <h1 className="text-lg font-bold mt-4">{title}</h1>
            <p className="text-sm text-center mt-2">{description}</p>
        </div>
    )

}