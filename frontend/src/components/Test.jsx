import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import Minimalist from '../assets/models/Minimalist'

export default function Test() {
    return (
        <div className='h-screen'>
            <PDFViewer showToolbar={false} width="100%" height="100%">
                <Minimalist data={{
                    userInfos: {
                        senderName: 'Adeline Palmerston',
                        senderAdress: '456 Business Ave, New York, NY 10001',
                        senderPhone: '+1 (555) 123-4567',
                        senderNo: 'Creative Agency Inc.',
                        senderEmail: 'adeline@creative.com',
                        senderLogo: ''
                    },
                    clientInfos: {
                        clientName: 'Richard Sanchez',
                        clientAdress: '123 Anywhere St., Any City',
                        clientPhone: '+1 (555) 987-6543',
                        clientNo: 'Thynk Unlimited',
                        clientBillingDate: '11.03.2030'
                    },
                    invoiceInfos: {
                        details: {
                            invoiceNo: '01234',
                            date: '11.02.2030'
                        },
                        items: [
                            { id: 1, desc: 'Brand consultation', price: 100, qty: 1, total: 100, tva: 0 },
                            { id: 2, desc: 'logo design', price: 100, qty: 1, total: 100, tva: 0 },
                            { id: 3, desc: 'Website design', price: 100, qty: 1, total: 100, tva: 0 },
                            { id: 4, desc: 'Social media templates', price: 100, qty: 1, total: 100, tva: 0 },
                            { id: 5, desc: 'Brand photography', price: 100, qty: 1, total: 100, tva: 0 },
                            { id: 6, desc: 'Brand guide', price: 100, qty: 1, total: 100, tva: 0 }
                        ],
                        currency: '',
                    },
                    options: {
                        paymentMethod: 'Borcele Bank',
                        paymentInfos: '0123 4567 8901',
                        generalTVA: 10
                    }
                }} />
            </PDFViewer>
        </div>
    )
}
