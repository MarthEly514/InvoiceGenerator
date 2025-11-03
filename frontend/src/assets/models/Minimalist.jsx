import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Create styles for PDF
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        padding: 60,
        fontFamily: 'Helvetica',
    },
    headerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 100,
    },
    headerLine: {
        width: '45%',
        height: 1,
        backgroundColor: '#000000',
    },
    invoiceTitle: {
        fontSize: 35,
        letterSpacing: 6,
        color: '#000000',
        textAlign: 'right',
        fontFamily: 'Helvetica',
    },
    infoSection: {
        width: '100%',
        paddingHorizontal: '30',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    leftBlock: {
        width: '45%',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    rightBlock: {
        width: '45%',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    sectionLabel: {
        fontSize: 9,
        letterSpacing: 1,
        color: '#000000',
        textTransform: 'uppercase',
        marginBottom: 8,
        fontFamily: 'Helvetica-Bold',
    },
    infoText: {
        fontSize: 10,
        letterSpacing: 1,
        color: '#000000',
        marginBottom: 3,
        lineHeight: 1.4,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    infoLabel: {
        fontSize: 10,
        color: '#000000',
        width: 80,
        fontWeight: 600,
        textAlign: 'right',
    },
    infoValue: {
        fontSize: 10,
        width: 80,
        color: '#000000',
        textAlign: 'right',
    },
    table: {
        width: '90%',
        marginTop: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingBottom: 10,
        marginBottom: 15,
    },
    tableHeaderText: {
        fontSize: 10,
        letterSpacing: 0.5,
        color: '#000000',
        textTransform: 'uppercase',
        fontFamily: 'Helvetica-Bold',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    colDesc: { width: '45%', },
    colPrice: { width: '20%', textAlign: 'center' },
    colQty: { width: '15%', textAlign: 'center' },
    colTotal: { width: '20%', textAlign: 'right' },
    cellText: {
        fontSize: 10,
        color: '#000000',
    },
    totalsSection: {
        width: '90%',
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    totalRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 8,
        fontWeight: '600',
    },
    taxRow: {
        flexDirection: 'row',
        gap: 15,
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 10,
        color: '#000000',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    totalValue: {
        fontSize: 10,
        color: '#000000',
    },
    finalTotalRow: {
        fontWeight: '600',
        flexDirection: 'row',
        gap: 15,
        marginTop: 8,
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
    },
    finalTotalLabel: {
        fontSize: 15,
        color: '#000000',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        fontFamily: 'Helvetica',
    },
    finalTotalValue: {
        fontSize: 15,
        color: '#000000',
        fontFamily: 'Helvetica',
    },
})

// PDF Document Component
export default function Minimalist({ data }) {
    const currency = data.invoiceInfos.currency || '$'
    const subtotal = data.invoiceInfos.items.reduce((sum, item) => sum + item.total, 0)
    const taxRate = data.options?.generalTVA || 10
    const taxAmount = (subtotal * taxRate) / 100
    const total = subtotal + taxAmount

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerContainer}>
                    {/* Header Line */}
                    <View style={styles.headerLine} />

                    {/* Invoice Title */}
                    <Text style={styles.invoiceTitle}>FACTURE</Text>
                </View>

                {/* Info Section */}
                <View style={styles.infoSection}>
                    {/* Left Block - Issued To */}
                    <View style={styles.leftBlock}>
                        <Text style={styles.sectionLabel}>A L'ORDRE DE:</Text>
                        <Text style={styles.infoText}>{data.clientInfos.clientName || 'Richard Sanchez'}</Text>
                        <Text style={styles.infoText}>{data.clientInfos.clientPhone || '01 97 98 99 00'}</Text>
                        <Text style={styles.infoText}>{data.clientInfos.clientAdress || '123 Anywhere St., Any City'}</Text>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.sectionLabel}>PAIEMENT A:</Text>
                            <Text style={styles.infoText}>{data.userInfos.senderName || 'Adeline Palmerston'}</Text>
                            <Text style={styles.infoText}>Méthode de paiement : {data.options?.paymentMethod || 'Borcele Bank'}</Text>
                            <Text style={styles.infoText}>N&deg; de compte.: {data.options?.paymentInfos || '0123 4567 8901'}</Text>
                        </View>
                    </View>

                    {/* Right Block - Invoice Details */}
                    <View style={styles.rightBlock}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>FACTURE NO:</Text>
                            <Text style={styles.infoLabel}>{data.invoiceInfos.details.invoiceNo || '01234'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoValue}>DATE:</Text>
                            <Text style={styles.infoValue}>{data.invoiceInfos.details.date || '11.02.2030'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoValue}>DATE LIMITE:</Text>
                            <Text style={styles.infoValue}>{data.clientInfos.clientBillingDate || '11.03.2030'}</Text>
                        </View>
                    </View>
                </View>

                {/* Table */}
                <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', }}>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, styles.colDesc]}>Description</Text>
                            <Text style={[styles.tableHeaderText, styles.colPrice]}>Prix Unitaire</Text>
                            <Text style={[styles.tableHeaderText, styles.colQty]}>Qté</Text>
                            <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
                        </View>

                        {/* Table Rows */}
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#000000',
                            paddingBottom: '10',
                        }}>
                            {data.invoiceInfos.items.map((item) => (
                                <View key={item.id} style={styles.tableRow}>
                                    <Text style={[styles.cellText, styles.colDesc]}>{item.desc}</Text>
                                    <Text style={[styles.cellText, styles.colPrice]}>{item.price}</Text>
                                    <Text style={[styles.cellText, styles.colQty]}>{item.qty}</Text>
                                    <Text style={[styles.cellText, styles.colTotal]}>{item.total} {currency}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Totals Section */}
                    <View style={styles.totalsSection}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total HT</Text>
                            <Text style={styles.totalValue}>{subtotal.toFixed(0)} {currency}</Text>
                        </View>
                        <View style={styles.taxRow}>
                            <Text style={styles.totalLabel}>Taxe</Text>
                            <Text style={styles.totalValue}>{taxRate}%</Text>
                        </View>
                        <View style={styles.finalTotalRow}>
                            <Text style={styles.finalTotalLabel}>Total TTC</Text>
                            <Text style={styles.finalTotalValue}>{total.toFixed(0)} {currency}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}