// simple.js
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

if (!pdfMake.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs;
}

pdfMake.addFonts({
    Montserrat: {
        normal: `${window.location.origin}/fonts/Montserrat-Regular.ttf`,
        bold: `${window.location.origin}/fonts/Montserrat-Bold.ttf`,
        light: `${window.location.origin}/fonts/Montserrat-Extra-Light.ttf`,
        italics: `${window.location.origin}/fonts/Montserrat-Extra-Light.ttf`,
    }
});

export const simpleInvoice = (data) => {
    const currency = data.invoiceInfos.currency || '€';
    const subtotal = data.invoiceInfos.items.reduce((sum, item) => sum + item.total, 0);
    const taxRate = data.options?.generalTVA || 0;
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    const months = [
        "Jan",
        "Fev",
        "Mars",
        "Avril",
        "Mai",
        "juin",
        "Juil",
        "Août",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ]
    const date = data?.clientInfos?.clientBillingDate?.split('-');


    const docDefinition = {
        pageSize: "A4",
        pageMargins: [40, 40, 40, 40],
        defaultStyle: {
            font: "Montserrat",
        },
        background: [
            {
                canvas: [
                    {
                        type: 'rect',
                        x: 0,
                        y: 0,
                        w: 595,
                        h: 400,
                        color: '#F5F5F5'
                    },
                    {
                        type: 'rect',
                        x: 0,
                        y: 400,
                        w: 595,
                        h: 442,
                        color: '#E8E8E8'
                    }
                ]
            }
        ],
        content: [
            {
                columns: [
                    data.userInfos.senderLogo &&
                    {
                        image: data.userInfos.senderLogo,
                        cover: { width: 80, height: 80, valign: "center", align: "center" },
                        alignment: 'left',
                        margin: [0, 0, 20, 0]
                    },
                    {
                        width: '100%',
                        text: 'FACTURE',
                        fontSize: 24,
                        bold: true,
                        color: '#2C3E50',
                        margin: [0, 25, 0, 0],
                        alignment: 'left',
                    }
                ],
                margin: [0, 0, 0, 40]
            },

            // Client info and details
            {
                columns: [
                    {
                        width: '50%',
                        stack: [
                            { text: 'Nom du Client', fontSize: 11, bold: true, color: '#2C3E50', margin: [0, 0, 0, 10] },
                            { text: `Date: ${data.invoiceInfos.details.date || '04 May \'16'}`, fontSize: 9, color: '#555555', margin: [0, 0, 0, 4] },
                            { text: `Facture No: ${data.invoiceInfos.details.invoiceNo || '13245'}`, fontSize: 9, color: '#555555' }
                        ]
                    },
                    {
                        width: '50%',
                        stack: [
                            { text: data.userInfos.senderName || 'Your Name', fontSize: 9, color: '#555555', alignment: 'right', margin: [0, 0, 0, 2] },
                            { text: data.userInfos.senderAdress || 'Your Address', fontSize: 9, color: '#555555', alignment: 'right', margin: [0, 0, 0, 2] },
                            { text: data.userInfos.senderPhone || 'Email', fontSize: 9, color: '#555555', alignment: 'right' }
                        ]
                    }
                ],
                margin: [0, 0, 0, 40]
            },

            // Items table header
            {
                stack: [
                    {
                        columns: [
                            { width: '*', text: 'DESCRIPTION', fontSize: 8, color: '#888888', margin: [0, 0, 0, 10] },
                            { width: 80, text: 'PRIX', fontSize: 8, color: '#888888', alignment: 'right', margin: [0, 0, 0, 10] },
                            { width: 60, text: 'QTÉ', fontSize: 8, color: '#888888', alignment: 'right', margin: [0, 0, 0, 10] },
                            { width: 80, text: 'TOTAL HT', fontSize: 8, color: '#888888', alignment: 'right', margin: [0, 0, 0, 10] }
                        ]
                    },
                    {
                        canvas: [
                            { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#CCCCCC' }
                        ],
                        margin: [0, 0, 0, 5]
                    }]
            },

            // Items rows
            ...data.invoiceInfos.items.map((item, index) => ({
                stack: [
                    {
                        columns: [
                            { width: '*', text: item.desc, fontSize: 10, color: '#2C3E50', margin: [0, 8, 0, 8] },
                            { width: 80, text: `${item.price} ${currency}`, fontSize: 10, color: '#2C3E50', alignment: 'right', margin: [0, 8, 0, 8] },
                            { width: 60, text: item.qty.toString(), fontSize: 10, color: '#2C3E50', alignment: 'right', margin: [0, 8, 0, 8] },
                            { width: 80, text: `${item.total.toFixed(2)} `, fontSize: 10, bold: true, color: '#E74C3C', alignment: 'right', margin: [0, 8, 0, 8] }
                        ]
                    },
                    {
                        canvas: [
                            { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#CCCCCC' }
                        ],
                        margin: [0, 0, 0, index === data.invoiceInfos.items.length - 1 ? 0 : 0]
                    }]
            })),

            // Spacer to push footer down
            { text: '', margin: [0, 0, 0, 180] },
            { width: '*', text: taxRate, fontSize: 10, color: '#2C3E50', alignment: 'right', margin: [0, 8, 0, 8] },


            // Footer section with bank info, due date, and total
            {
                stack: [{
                    columns: [
                        { width: '33%', text: 'INFORMATIONS DE PAIEMENT', fontSize: 8, color: '#888888', margin: [0, 0, 0, 10] },
                        { width: '33%', text: 'ÉCHÉANCE', fontSize: 8, color: '#888888', alignment: 'center', margin: [0, 0, 0, 10] },
                        { width: '33%', text: 'TOTAL TTC', fontSize: 8, color: '#888888', alignment: 'right', margin: [0, 0, 0, 10] },
                    ]
                },
                {
                    canvas: [
                        { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#CCCCCC' }
                    ],
                    margin: [0, 0, 0, 20],
                }
                ]
            },
            {
                columns: [
                    {
                        width: '33%',
                        stack: [
                            {
                                text: `Méthode de paiement: ${data.options?.paymentMethod || '01-23-45'}`, fontSize: 9, color: '#555555'
                            },
                            { text: `No de compte: ${data.options?.paymentInfos || '123 456 78'}`, fontSize: 9, color: '#555555', margin: [0, 0, 0, 2] },
                        ]
                    },
                    {
                        width: '33%',
                        stack: [
                            date && { text: date != '' && (date[2] + ' ' + months[date[1] - 1] + ' ' + date[0]) || '18 May \'16', fontSize: 18, bold: true, color: '#2C3E50', alignment: 'center' }
                        ]
                    },
                    {
                        width: '33%',
                        stack: [
                            { text: `${currency} ${total.toFixed(2)}`, fontSize: 18, bold: true, color: '#E74C3C', alignment: 'right' }
                        ]
                    }
                ],
                margin: [0, 0, 0, 40]
            },

            // Thank you message and footer links
            {
                columns: [
                    {
                        width: 'auto',
                        stack: [
                            {
                                canvas: [
                                    {
                                        type: 'ellipse',
                                        x: 6,
                                        y: 6,
                                        r1: 6,
                                        r2: 6,
                                        color: '#E74C3C'
                                    },
                                    {
                                        type: 'polyline',
                                        lineWidth: 0,
                                        closePath: true,
                                        points: [
                                            { x: 4, y: 3 },
                                            { x: 6, y: 5 },
                                            { x: 8, y: 3 },
                                            { x: 10, y: 5 },
                                            { x: 6, y: 9 }
                                        ],
                                        color: '#FFFFFF'
                                    }
                                ],
                                margin: [0, 0, 8, 0]
                            }
                        ]
                    },
                    {
                        width: 'auto',
                        text: 'Merci!',
                        fontSize: 12,
                        color: '#E74C3C',
                        margin: [0, -2, 0, 0]
                    },
                    {
                        width: '*',
                        text: ''
                    }
                ]
            }
        ],

        styles: {
            tableCell: { fontSize: 10, color: '#2C3E50', margin: [0, 5, 0, 5] }
        }
    };

    return docDefinition;
};