import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'

export default function UserForm({ mode, userInfos, getUserInfos }) {

    const [data, setData] = useState({
        senderName: userInfos && userInfos.senderName || '',
        senderAdress: userInfos && userInfos.senderAdress || '',
        senderPhone: userInfos && userInfos.senderPhone || '',
        senderNo: userInfos && userInfos.senderNo || '',
        senderLogo: userInfos && userInfos.senderLogo || '',
    })

    const handleInputChange = (field, value) => {
        setData(prev => ({
            ...prev,
            [field]: value
        }));
        console.log(data);
    };

    useEffect(() => {
        let lastData = data

        console.log('component userform Mounted');

        return () => {
            console.log('component userform Unmounted');
            getUserInfos(lastData)
            // console.log(lastData);

        }
    }, [data])

    return (
        <div>
            <form className="w-full min-w-[500px] max-w-[600px] h-max p-6 gap-2 flex flex-col">
                <label htmlFor="senderName">Nom / Raison sociale</label>
                <input
                    id="senderName"
                    className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    type="text"
                    placeholder="Ex:Gamma SARL"
                    value={data.senderName}
                    onChange={(e) => handleInputChange('senderName', e.target.value)}
                    required />
                <label htmlFor="senderAdress">Addresse</label>
                <input
                    id="senderAdress"
                    className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    type="text"
                    placeholder="Ex : Cotonou, Haies-Vives"
                    value={data.senderAdress}
                    onChange={(e) => handleInputChange('senderAdress', e.target.value)}
                    required />
                <label htmlFor="senderPhone">Téléphone ou Email</label>
                <input
                    id="senderPhone"
                    className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    type="text"
                    placeholder="Ex : 01 97 98 99 00"
                    value={data.senderPhone}
                    onChange={(e) => handleInputChange('senderPhone', e.target.value)}
                    required />
                <label htmlFor="senderNo">Numéro IFU ou équivalent légal</label>
                <input
                    id="senderNo"
                    className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    type="number"
                    placeholder="Ex : IFU, SIRET.."
                    value={data.senderNo}
                    onChange={(e) => handleInputChange('senderNo', e.target.value)} />
                <label htmlFor="senderLogo">{'Logo (optionnel)'}</label>
                <input
                    id="senderLogo"
                    className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    type="file"
                    value={data.senderLogo}
                    onChange={(e) => handleInputChange('senderLogo', e.target.files[0])}

                // accept='image/IMG'
                />
            </form>
        </div>
    )
}
