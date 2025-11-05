import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Notes({ mode, options, getOptions }) {

    const [data, setData] = useState({
        option: options && options.option || '',
        paymentMethod: options && options.paymentMethod || 'Virement bancaire',
        paymentInfos: options && options.paymentInfos || '',
        generalTVA: options.generalTVA || 0,
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
            console.log(lastData);

        }
    }, [data])
    return (
        <>
            <div className="w-full max-w-[700px] h-max p-6 flex flex-col gap-3">
                <h1 className='text-lg font-semibold'>Méthode de paiement</h1>
                <div className='mb-6 w-full flex flex-col gap-4'>
                    <select name="methods" className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-none`} value={data.paymentMethod} onChange={(e) => handleInputChange('paymentMethod', e.target.value)}>
                        <option value="Virement bancaire" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>Virement bancaire</option>
                        <option value="Mobile money" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>Mobile money</option>
                        <option value="Cheque" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>Chèque</option>
                        <option value="Paypal" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>Paypal</option>
                        <option value="Bspeces" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>Espèces</option>
                    </select>
                    {data.paymentMethod == 'Virement bancaire' && <input className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-[#607AFB]/40`} value={data.paymentInfos} type="text" onChange={(e) => handleInputChange('paymentInfos', e.target.value)} placeholder='Numéro de compte bancaire' />}
                    {data.paymentMethod == 'Mobile money' && <input className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-[#607AFB]/40`} value={data.paymentInfos} type="text" onChange={(e) => handleInputChange('paymentInfos', e.target.value)} placeholder='Numéro mobile money' />}
                    {data.paymentMethod == 'Cheque' && <input className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-[#607AFB]/40`} value={data.paymentInfos} type="text" onChange={(e) => handleInputChange('paymentInfos', e.target.value)} placeholder="A l'ordre de.." />}
                    {data.paymentMethod == 'Paypal' && <input className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-[#607AFB]/40`} value={data.paymentInfos} type="text" onChange={(e) => handleInputChange('paymentInfos', e.target.value)} placeholder="Addresse Paypal" />}
                </div>
                <h1 className='text-lg font-semibold'>TVA <small>(% sur tout produit ou service )</small></h1>
                <input
                    type="number"
                    placeholder='0'
                    value={data.generalTVA}
                    onChange={(e) => { ((e.target.value) >= 0) ? handleInputChange('generalTVA', e.target.value) : handleInputChange('generalTVA', e.target.value * (-1)) }}
                    className={`p-3 w-max ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                />
                <h1 className='text-lg font-semibold'>Notes ou Options supplémentaires</h1>
                <textarea
                    value={data.option}
                    onChange={(e) => handleInputChange('option', e.target.value)}
                    className={`p-4 w-full resize-none min-h-[150px] max-h-[300px] ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-[#607AFB]/40 rounded-xl`}
                    placeholder='Entrez une note ou une option supplementaire de votre service'></textarea>
            </div>
        </>
    )
}
