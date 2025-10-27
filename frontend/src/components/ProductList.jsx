import React from 'react'
import { useState } from 'react'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { useEffect } from 'react';
import { useRef } from 'react';

const ProductList = ({ mode, getItems, itemList, currency }) => {
    const [items, setItems] = useState(itemList || []);
    const [newCurrency, setCurrency] = useState(currency || '$');
    const [currentItem, setCurrentItem] = useState({
        desc: '',
        qty: 1,
        price: '',
        tva: '',
    });

    const handleInputChange = (field, value) => {
        setCurrentItem(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addItem = () => {
        if (!currentItem.desc || !currentItem.price) {
            return;
        }

        const newItem = {
            id: Date.now(),
            desc: currentItem.desc,
            qty: parseInt(currentItem.qty) || 1,
            price: parseFloat(currentItem.price) || 0,
            tva: parseFloat(currentItem.tva) || 0,
            total: ((parseInt(currentItem.qty) || 1) * (parseFloat(currentItem.price) || 0)) + (((parseInt(currentItem.qty) || 1) * ((parseFloat(currentItem.price) || 0)) * (parseFloat(currentItem.tva) || 0) / 100))
        };

        setItems(prev => [...prev, newItem]);

        setCurrentItem({
            desc: '',
            qty: 1,
            price: '',
            tva: '',
        });
    };

    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };
    const lastData = useRef(
        {
            items: items,
            currency: newCurrency,

        }
    )

    useEffect(() => {
        lastData.current = {
            items: items,
            currency: newCurrency,

        }
        getItems(lastData.current)
        console.log('component ProductList Mounted');
        console.log(lastData.current);
        

    }, [items, newCurrency])

    useEffect(() => {
        return () => {
            console.log('component ProductList Unmounted');
            getItems(lastData.current)
            console.log(lastData.current);

        }
    }, [])

    return (
        <>
            {/* Main Content */}
            <div className="col-span-2 gap-3 flex flex-col">
                <div className='grid grid-cols-6 w-full gap-2'>
                    <input
                        id="desc"
                        className={`p-3 col-span-2 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                        type="text"
                        placeholder='Produit ou Service'
                        value={currentItem.desc}
                        onChange={(e) => handleInputChange('desc', e.target.value)}
                        required />
                    <input
                        id="qty"
                        className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                        type="number"
                        placeholder='Quantité'
                        value={currentItem.qty}
                        onChange={(e) => handleInputChange('qty', e.target.value)}
                        required />
                    <input
                        id="price"
                        className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                        type="text"
                        placeholder='Prix'
                        value={currentItem.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        required />
                    <input
                        id="tva"
                        className={`p-3 ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'}  text-neutral-400 focus:outline-[#607AFB]/40 rounded-xl`}
                        type="text"
                        placeholder='TVA(%)'
                        value={currentItem.tva}
                        onChange={(e) => handleInputChange('tva', e.target.value)}
                        required />
                    <select name="methods" className={`w-full p-3 rounded-xl ${mode ? 'bg-neutral-200/40 text-neutral-500' : 'bg-neutral-600/40 text-neutral-400'} focus:outline-none`} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="$" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>$</option>
                        <option value="€" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>&euro;</option>
                        <option value="FCFA" className={`${mode ? 'bg-neutral-200/40' : 'bg-neutral-700'}`}>FCFA</option>
                    </select>

                </div >
                <span
                    onClick={addItem}
                    className={`text-sm w-full mt-3 flex flex-row items-center justify-center border hover:text-white ${mode ? 'border-[#607AFB] hover:bg-[#607AFB] text-[#607AFB]' : 'border-white/30 text-white/50 hover:bg-white/30'} transition-colors duration-200 gap-2 cursor-pointer p-2 rounded-md`}>
                    <PlusCircle className='w-5 h-5' />
                    Ajouter produit
                </span>


                {/* Added Items Table */}
                <div>

                    <h3 className="text-lg font-semibold">Articles ajoutés</h3>

                    <div>
                        <table className={`block ${mode ? 'bg-neutral-200/40' : 'bg-neutral-600/40'} rounded-xl overflow-hidden`}>
                            <thead className='block w-full'>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        Article
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        Quantité
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        Prix Unitaire
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        {'TVA (%)'}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                        Supprimer
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='w-full block max-h-[250px] overflow-y-scroll'>
                                {items.length === 0 ? (
                                    <tr className={`w-full flex flex-col items-center justify-center ${mode ? 'border-neutral-200 text-neutral-500' : 'border-neutral-600 text-neutral-400'}`}>
                                        <td className="px-6 py-12 text-center">
                                            Aucun article ajouté
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item) => (
                                        <tr key={item.id} className={`w-full grid grid-cols-6 border-t ${mode ? 'border-neutral-200 text-neutral-500 hover:bg-neutral-200' : 'border-neutral-600 text-neutral-400 hover:bg-neutral-600'}`}>
                                            <td className="px-6 py-4 font-medium">{item.desc}</td>
                                            <td className="px-6 py-4">{item.qty}</td>
                                            <td className="px-6 py-4">{item.price.toFixed(2)} {newCurrency}</td>
                                            <td className="px-6 py-4">{item.tva.toFixed(1)}</td>
                                            <td className="px-6 py-4 font-medium">{item.total.toFixed(2)} {newCurrency}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-300 hover:text-red-500 transition-colors"
                                                    title="Remove item"
                                                >
                                                    <MinusCircle size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;
