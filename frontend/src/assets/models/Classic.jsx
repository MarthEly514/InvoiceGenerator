// import React from 'react'

// export default function Classic({ data, ref }) {
//     let currency = data.invoiceInfos.currency;
//     return (
//         <div ref={ref} className='aspect-[21/29.7] h-[60vh] bg-white text-[#000000]'>
//             {/* header */}
//             <div>
//                 <h1>FACTURE</h1>
//                 <div>
//                     <p></p>
//                     <p>Facture n&deg; {data.invoiceInfos.details.invoiceNo}</p>
//                 </div>
//             </div>
//             {/* infos */}
//             <div className='border-t bordeer-[#262626]'>
//                 <p>Facturé à:</p>
//                 <ul>
//                     <li>{data.clientInfos.clientName || ''}</li>
//                     <li>{data.clientInfos.clientPhone || ''}</li>
//                     <li>{data.clientInfos.clientAdress || ''}</li>
//                 </ul>
//             </div>
//             {/* paymentMethod */}
//             <div>

//             </div>
//             {/* table */}
//             <div>
//                 <table className={`table-fixed w-full scale-85 border-collapse bg-neutral-200/40  overflow-hidden`}>
//                     <thead>
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 Article
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 Quantité
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 Prix
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 {'TVA (%)'}
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 Montant
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.invoiceInfos.items.length === 0 ? (
//                             <tr className={`border-neutral-200 text-neutral-500`}>

//                             </tr>
//                         ) : (
//                             data.invoiceInfos.items.map((item) => (
//                                 <tr key={item.id} className={`border-t'border-neutral-200 text-neutral-500 ${data.invoiceInfos.items.indexOf(item) % 2 == 0 ? 'bg-neutral-200' : ''}`}>
//                                     <td className="px-4 py-3 font-medium">{item.desc}</td>
//                                     <td className="px-4 py-3">{item.qty}</td>
//                                     <td className="px-4 py-3">{item.price.toFixed(2)}{currency}</td>
//                                     <td className="px-4 py-3">{item.tva.toFixed(1)}</td>
//                                     <td className="px-4 py-3 font-medium">{item.total.toFixed(2)}{currency}</td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* total */}
//             <div>

//             </div>
//             {/* mentions legales */}
//             <div>

//             </div>
//         </div>
//     )
// }



import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer'

// Create styles for PDF
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    logo: {
        width: 50,
        height: 50,
        backgroundColor: '#4a5568',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    invoiceTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2d3748',
        letterSpacing: 2,
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    infoBlock: {
        width: '48%',
    },
    label: {
        fontSize: 9,
        color: '#718096',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    senderName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 2,
    },
    infoText: {
        fontSize: 11,
        color: '#4a5568',
        marginBottom: 2,
    },
    smallText: {
        fontSize: 9,
        color: '#718096',
        marginBottom: 1,
    },
    rightAlign: {
        textAlign: 'right',
    },
    clientSection: {
        backgroundColor: '#f7fafc',
        padding: 20,
        borderRadius: 4,
        marginBottom: 25,
    },
    paymentSection: {
        marginBottom: 20,
    },
    table: {
        marginBottom: 25,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#4a5568',
        padding: 10,
    },
    tableHeaderText: {
        fontSize: 9,
        color: '#ffffff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        padding: 12,
    },
    tableRowAlt: {
        backgroundColor: '#f7fafc',
    },
    col1: { width: '8%' },
    col2: { width: '42%' },
    col3: { width: '15%', textAlign: 'center' },
    col4: { width: '15%', textAlign: 'center' },
    col5: { width: '20%', textAlign: 'right' },
    cellText: {
        fontSize: 10,
        color: '#4a5568',
    },
    cellTextBold: {
        fontSize: 10,
        color: '#2d3748',
        fontWeight: 'bold',
    },
    totalsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    amountBox: {
        backgroundColor: '#4a5568',
        padding: 15,
        borderRadius: 4,
        width: '45%',
    },
    amountLabel: {
        fontSize: 9,
        color: '#ffffff',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    amountValue: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    totalsBox: {
        width: '45%',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 10,
        color: '#718096',
    },
    totalValue: {
        fontSize: 10,
        color: '#2d3748',
        fontWeight: 'bold',
    },
    totalFinalBox: {
        backgroundColor: '#4a5568',
        padding: 12,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalFinalLabel: {
        fontSize: 11,
        color: '#ffffff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    totalFinalValue: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    signatureSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 25,
        marginBottom: 30,
    },
    termsBox: {
        width: '48%',
    },
    termsTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 8,
    },
    termsText: {
        fontSize: 9,
        color: '#718096',
        lineHeight: 1.6,
    },
    signatureBox: {
        width: '40%',
        alignItems: 'center',
    },
    signatureText: {
        fontSize: 24,
        color: '#4a5568',
        marginBottom: 8,
        fontFamily: 'Times-Italic',
    },
    signatureLine: {
        borderTopWidth: 1,
        borderTopColor: '#2d3748',
        width: '100%',
        paddingTop: 4,
        alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 20,
    },
    footerItem: {
        width: '30%',
    },
    footerText: {
        fontSize: 8,
        color: '#718096',
        marginBottom: 1,
    },
    footerTextBold: {
        fontSize: 8,
        color: '#718096',
        fontWeight: 'bold',
        marginBottom: 1,
    },
})

// PDF Document Component
export default function Classic({ data }) {
    const currency = data.invoiceInfos.currency
    const subtotal = data.invoiceInfos.items.reduce((sum, item) => sum + item.total, 0)
    const taxTotal = data.invoiceInfos.items.reduce((sum, item) => sum + (item.total * item.tva / 100), 0)
    const total = subtotal + taxTotal

    console.log(total);
    

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Text style={styles.logoText}>≋</Text>
                    </View>
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                </View>

                {/* Info Section */}
                <View style={styles.infoSection}>
                    <View style={styles.infoBlock}>
                        <Text style={styles.label}>Invoice From</Text>
                        <Text style={styles.senderName}>{data.userInfos.senderName || 'Megumin Ryu'}</Text>
                        <Text style={styles.infoText}>{data.userInfos.senderNo || 'Creative Studio'}</Text>
                        <Text style={styles.smallText}>{data.userInfos.senderAdress || 'Contact Street'}</Text>
                        <Text style={styles.smallText}>{data.userInfos.senderPhone || '76298 1345 7834 5879'}</Text>
                        <Text style={styles.smallText}>{data.userInfos.senderEmail || 'megumin@ryu.mail'}</Text>
                    </View>
                    <View style={[styles.infoBlock, styles.rightAlign]}>
                        <Text style={styles.label}>Invoice No.</Text>
                        <Text style={styles.infoText}>{data.invoiceInfos.details.invoiceNo || '1724805'}</Text>
                        <Text style={[styles.label, { marginTop: 10 }]}>Invoice Date</Text>
                        <Text style={styles.infoText}>{data.invoiceInfos.details.date || 'September 29, 2023'}</Text>
                    </View>
                </View>

                {/* Client Section */}
                <View style={styles.clientSection}>
                    <Text style={styles.label}>Invoice To</Text>
                    <Text style={styles.senderName}>{data.clientInfos.clientName || ''}</Text>
                    <Text style={styles.infoText}>{data.clientInfos.clientPhone || ''}</Text>
                    <Text style={styles.smallText}>{data.clientInfos.clientAdress || ''}</Text>
                </View>

                {/* Payment Method */}
                <View style={styles.paymentSection}>
                    <Text style={styles.label}>Payment Method</Text>
                    <Text style={styles.infoText}>{data.options?.paymentMethod || 'Bank Transfer'}</Text>
                    <Text style={styles.smallText}>{data.options?.paymentInfos || '8745 2342 3424 3799'}</Text>
                </View>

                {/* Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, styles.col1]}>#</Text>
                        <Text style={[styles.tableHeaderText, styles.col2]}>Description</Text>
                        <Text style={[styles.tableHeaderText, styles.col3]}>Price</Text>
                        <Text style={[styles.tableHeaderText, styles.col4]}>Quantity</Text>
                        <Text style={[styles.tableHeaderText, styles.col5]}>Amount</Text>
                    </View>
                    {data.invoiceInfos.items.map((item, index) => (
                        <View key={item.id} style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}>
                            <Text style={[styles.cellText, styles.col1]}>{String(index + 1).padStart(2, '0')}</Text>
                            <Text style={[styles.cellTextBold, styles.col2]}>{item.desc}</Text>
                            <Text style={[styles.cellText, styles.col3]}>{currency}{item.price}</Text>
                            <Text style={[styles.cellText, styles.col4]}>{item.qty}</Text>
                            <Text style={[styles.cellTextBold, styles.col5]}>{currency}{item.total}</Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={styles.totalsSection}>
                    <View style={styles.amountBox}>
                        <Text style={styles.amountLabel}>Amount In Word</Text>
                        <Text style={styles.amountValue}>{total.toFixed(2)} {currency || 'USD'}</Text>
                    </View>
                    <View style={styles.totalsBox}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Sub Total</Text>
                            <Text style={styles.totalValue}>{subtotal.toFixed(2)} {currency || 'USD'}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Tax ({data.options?.generalTVA || 0} %)</Text>
                            <Text style={styles.totalValue}>{(parseFloat(subtotal) + ((parseFloat(data.options.generalTVA) / 100) * parseFloat(subtotal))).toFixed(2) || 0} {currency || 'USD'}</Text>
                        </View>
                        <View style={styles.totalFinalBox}>
                            <Text style={styles.totalFinalLabel}>Total</Text>
                            <Text style={styles.totalFinalValue}>{total.toFixed(2)} {currency || 'USD'}</Text>
                        </View>
                    </View>
                </View>

                {/* Signature Section */}
                <View style={styles.signatureSection}>
                    <View style={styles.termsBox}>
                        <Text style={styles.termsTitle}>Terms & Conditions</Text>
                        <Text style={styles.termsText}>
                            Please send payment within 30 days of receiving this{'\n'}
                            invoice. There will be 10% interest charge per month{'\n'}
                            on late invoice.
                        </Text>
                    </View>
                    <View style={styles.signatureBox}>
                        <Text style={styles.signatureText}>Megumin Ryu</Text>
                        <View style={styles.signatureLine}>
                            <Text style={styles.smallText}>{data.userInfos.senderName || 'Megumin Ryu'}</Text>
                            <Text style={styles.smallText}>HR Director</Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.footerItem}>
                        <Text style={styles.footerTextBold}>+1 624 567 890</Text>
                        <Text style={styles.footerText}>+1 875 345 7890</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Text style={styles.footerTextBold}>@meguminryu</Text>
                        <Text style={styles.footerText}>/meguminryu</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Text style={styles.footerTextBold}>megumin@ryu.mail</Text>
                        <Text style={styles.footerText}>www.yoursite.com</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

