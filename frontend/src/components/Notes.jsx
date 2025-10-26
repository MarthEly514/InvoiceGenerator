import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Notes({ mode, options, getOptions }) {

    const [data, setData] = useState({
        option: options && options.option || '',
        paymentMethod: options && options.paymentMethod || 'bancaire',
        paymentInfos: options && options.paymentInfos || '',
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

        console.log('component Notes Mounted');

        return () => {
            console.log('component Notes Unmounted');
            getOptions(lastData)
            // console.log(lastData);

        }
    }, [data])
    return (
        <>
            <div className="w-full max-w-[700px] h-max p-6 flex flex-col gap-3">
                <h1 className='text-lg font-semibold'>Méthode de paiement</h1>
                <div className='mb-6 w-full flex flex-col gap-4'>
                    <select name="methods" className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-none`} value={data.paymentMethod} onChange={(e) => handleInputChange('paymentMethod', e.target.value)}>
                        <option value="bancaire" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>Virement bancaire</option>
                        <option value="mobile" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>Mobile money</option>
                        <option value="cheque" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>Chèque</option>
                        <option value="paypal" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>Paypal</option>
                        <option value="especes" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>Espèces</option>
                    </select>
                    {data.paymentMethod == 'bancaire' && <input className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-[#607AFB]/40`} value={data.paymentInfos} type="text" onChange={(e) => handleInputChange('paymentInfos', e.target.value)} placeholder='Numéro de compte bancaire' />}
                    {data.paymentMethod == 'mobile' && <input className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-[#607AFB]/40`} value={data.paymentInfos} type="text" onChange={(e) => handleInputChange('paymentInfos', e.target.value)} placeholder='Numéro mobile money' />}
                    {data.paymentMethod == 'cheque' && <input className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-[#607AFB]/40`} value={data.paymentInfos} type="text" onChange={(e) => handleInputChange('paymentInfos', e.target.value)} placeholder="A l'ordre de.." />}
                    {data.paymentMethod == 'paypal' && <input className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-[#607AFB]/40`} value={data.paymentInfos} type="text" onChange={(e) => handleInputChange('paymentInfos', e.target.value)} placeholder="Addresse Paypal" />}
                </div>
                <h1 className='text-lg font-semibold'>Notes ou Options supplémentaires</h1>
                <textarea
                    value={data.option}
                    onChange={(e) => handleInputChange('option', e.target.value)}
                    className={`p-4 w-full resize-none min-h-[200px] max-h-[300px] ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-[#607AFB]/40 rounded-xl`}
                    placeholder='Entrez une note ou une option supplementaire de votre service'></textarea>
            </div>
        </>
    )
}
