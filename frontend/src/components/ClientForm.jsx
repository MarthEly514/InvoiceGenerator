import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function ClientForm({ mode, clientInfos, getClientInfos }) {
    const [data, setData] = useState({
        clientName: clientInfos && clientInfos.clientName || '',
        clientAdress: clientInfos && clientInfos.clientAdress || '',
        clientPhone: clientInfos && clientInfos.clientPhone || '',
        clientBillingDate: clientInfos && clientInfos.clientBillingDate || '',
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

        console.log('component Clientform Mounted');

        return () => {
            console.log('component Clientform Unmounted');
            getClientInfos(lastData)
            // console.log(lastData);

        }
    }, [data])
    return (
        <div>
            <form className="w-full min-w-[360px] md:min-w-[500px] max-w-[600px] h-max p-6 gap-2 flex flex-col">
                <label htmlFor="clientName">Nom / Raison sociale</label>
                <input
                    id="clientName"
                    className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    type="text"
                    placeholder="Ex:Gamma SARL"
                    value={data.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    required />
                <label htmlFor="clientAdress">Addresse</label>
                <input
                    id="clientAdress"
                    className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    type="text"
                    placeholder="Ex:Cotonou, Haies-Vives"
                    value={data.clientAdress}
                    onChange={(e) => handleInputChange('clientAdress', e.target.value)}
                    required />
                <label htmlFor="clientPhone">{'Téléphone ou Email (optionnel)'}</label>
                <input
                    id="clientPhone"
                    className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    type="text"
                    placeholder="Ex:01 97 98 99 00"
                    value={data.clientPhone}
                    onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                />
                <label htmlFor="billingDate">Date limite de paiement</label>
                <input
                    id="billingDate"
                    className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    type="date"
                    value={data.clientBillingDate}
                    onChange={(e) => handleInputChange('clientBillingDate', e.target.value)}
                />
            </form>
        </div>
    )
}
