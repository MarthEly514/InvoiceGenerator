import React from 'react'
import ProductList from './ProductList';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function InvoiceInfos({ mode, invoiceInfos, getInvoiceInfos }) {
    let date = new Date;
    let number = 0;

    let details = (invoiceInfos.details) || {
        invoiceNo: `FAC-${date.getFullYear()}${date.getMonth()}${date.getDate()}${number}`,
        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    }

    const [data, setData] = useState(
        {
            items: invoiceInfos.items || [],
            currency: invoiceInfos.currency || 'FCFA'
        })
        
    const lastData = useRef({
        details: details,
        items: data.items || [],
        currency: data.currency || 'FCFA',
    })
    useEffect(() => {
        lastData.current = {
            details: details,
            items: data.items,
            currency: data.currency,
        }
        getInvoiceInfos(lastData.current)
        //console.log('component InvoiceInfos Mounted');
        // //console.log(lastData.current);
    }, [data])

    useEffect(() => {
        return () => {
            //console.log('component InvoiceInfos Unmounted');
            getInvoiceInfos(lastData.current)
            //console.log(lastData.current);

        }
    }, [])

    return (
        <>
            <form className="w-full max-w-[700px] h-max p-6 gap-3 grid grid-cols-2 overflow-scroll no-scrollBar">
                <h1 className='text-lg font-semibold col-span-2'>Informations</h1>
                <div>
                    <label htmlFor="invoiceNo">N&deg; facture</label>
                    <div
                        className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    >
                        {details.invoiceNo}
                    </div>
                </div>
                <div>
                    <label htmlFor="invoiceDate">Date de facture</label>
                    <div
                        className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                    >
                        {details.date}
                    </div>
                </div>
                <h1 className='text-lg font-semibold col-span-2'>Articles</h1>
                <ProductList
                    mode={mode}
                    itemList={data.items}
                    currency={data.currency}
                    getItems={(data) => {
                        setData(data);
                        //console.log(data);

                    }} />
            </form>
        </>
    )
}
