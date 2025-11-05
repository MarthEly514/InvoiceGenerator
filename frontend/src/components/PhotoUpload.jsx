import { Camera } from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function PhotoUpload({ mode, image, handleInputChange }) {

    const [photoUrl, setPhotoUrl] = useState(image);


    const handleImgChange = (file) => {
        if (!file) return;

        // const objectUrl = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.onload = () => {

            const imageDataURL = reader.result;
            setPhotoUrl(imageDataURL);
            handleInputChange('senderLogo', imageDataURL)
        };
        reader.readAsDataURL(file)
    };

    useEffect(() => {
        return () => {
            if (photoUrl) URL.revokeObjectURL(photoUrl);
        };
    }, [photoUrl]);

    return (
        <div className="w-50 p-2 flex flex-col items-center justify-center">
            <div
                style={{
                    backgroundImage: photoUrl ? `url(${photoUrl})` : 'none',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
                className={`relative w-full aspect-square flex flex-col items-center justify-center overflow-hidden rounded-lg ${!photoUrl ? 'border-2' : 'border-none'}  border border-neutral-700/60 ${mode ? 'bg-neutral-100' : 'md:bg-neutral-700/60'}`}
            >
                {!photoUrl && (
                    <p className="absolute text-2xl text-neutral-300/40">
                        <Camera />
                    </p>
                )}
                {photoUrl && (
                    <div className='w-full h-full bg-neutral-800/30 flex flex-col items-center justify-center'>
                        <div className='absolute z-10 flex flex-col gap-2 pointer-events-none'>
                            <p className="text-sm p-1 text-center border rounded-md border-neutral-300 text-neutral-300">
                                Changer photo
                            </p>
                            <p
                                onClick={() => {
                                    setPhotoUrl('');
                                    handleInputChange('senderLogo', '');
                                }}
                                className="text-sm p-1 text-center border rounded-md border-red-300 cursor-pointer pointer-events-auto text-red-300">
                                Supprimer photo
                            </p>
                        </div>
                    </div>
                )}
                <input
                    onChange={(e) => {
                        handleImgChange(e.target.files[0]);
                        console.log("haaaaaaa");

                    }}
                    className="absolute cursor-pointer p-4 w-full h-full opacity-0"
                    type="file"
                    accept="image/*"
                />
            </div>
        </div>
    );
}
