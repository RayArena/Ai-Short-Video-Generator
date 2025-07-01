'use client';
import Image from "next/image";
import React, { useState } from "react";

function SelectStyle({onUserSelect}) {
    const styleOptions = [
        {
            name: 'Realstic',
            image: '/Real.jpeg'
        },
        {
            name: 'Cartoon',
            image: '/Cartoon.webp'
        },
        {
            name: 'Comic',
            image: '/Comic.webp'
        },
        {
            name: 'Water Color',
            image: '/WaterColor.jpg'
        },
        {
            name: 'GTA',
            image: '/GTA.jpg'
        }
    ]

    const [selectedStyle, setSelectedStyle] = useState()

    return (
        <div className="mt-7">
            <h2 className="font-bold text-2xl text-primary">Style</h2>
            <p className="text-gray-500">Select your video style</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-3">
                {styleOptions.map((item, index) => (
                    <div key={index} className={`relative hover:scale-110 transition-all cursor-pointer rounded-xl
                        ${selectedStyle == item.name && 'border-4 border-primary'}`}>
                        <Image src={item.image} width={100} height={100} alt={item.name}
                            className="h-60 object-cover rounded-lg w-full"
                            onClick={() => {
                                setSelectedStyle(item.name)
                                onUserSelect('imageStyle', item.name)
                            }} />
                        <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectStyle;