// pdfGenerator.js
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

if (!pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs;
}

pdfMake.addFonts({
  Inter: {
    normal: `${window.location.origin}/src/fonts/Inter_28pt-Medium.ttf`,
    bold: `${window.location.origin}/src/fonts/Inter_28pt-Bold.ttf`,
    light: `${window.location.origin}/src/fonts/Inter_28pt-Light.ttf`,
    thin: `${window.location.origin}/src/fonts/Inter_28pt-Thin.ttf`,
  },
  InterBold: {
    normal: `${window.location.origin}/src/fonts/Inter_28pt-Bold.ttf`,
  },
  InterLight: {
    normal: `${window.location.origin}/src/fonts/Inter_28pt-Light.ttf`,
  },
  InterThin: {
    normal: `${window.location.origin}/src/fonts/Inter_28pt-Thin.ttf`,
  },


  Montserrat: {
    normal: `${window.location.origin}/src/fonts/Montserrat-Regular.ttf`,
    bold: `${window.location.origin}/src/fonts/Montserrat-Bold.ttf`,
    light: `${window.location.origin}/src/fonts/Montserrat-Extra-Light.ttf`,
  },
});


export const creativeInvoice = (data) => {
  const currency = data.invoiceInfos.currency || '$';
  const subtotal = data.invoiceInfos.items.reduce((sum, item) => sum + item.total, 0);
  const taxRate = data.options?.generalTVA || 0;
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [60, 60, 60, 60],
    defaultStyle: {
      font: "Inter", // default font for all text
    },
    content: [
      // Header
      {
        columns: [
          { width: '*', canvas: [{ type: 'line', x1: 0, y1: 30, x2: 250, y2: 30, lineWidth: 0.5 }] },
          { width: 'auto', text: 'FACTURE Crea', style: 'header', margin: [20, 0, 0, 0], font: 'InterLight' }
        ],
        margin: [0, 0, 0, 40]
      },

      // Client & Sender Info
      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: "À L'ORDRE DE:", style: 'label' },
              { text: data.clientInfos.clientName || 'Logan Perry', style: 'info' },
              { text: data.clientInfos.clientPhone || '878890', style: 'info' },
              { text: data.clientInfos.clientAdress || 'May street', style: 'info', margin: [0, 0, 0, 10] },

              { text: "PAIEMENT À:", style: 'label', margin: [0, 10, 0, 2] },
              { text: data.userInfos.senderName || 'Raven.co', style: 'info' },
              { text: `MÉTHODE : ${data.options?.paymentMethod || 'Virement Bancaire'}`, style: 'info' },
              { text: `N° DE COMPTE: ${data.options?.paymentInfos || 'Raven.co 00054'}`, style: 'info' }
            ]
          },
          {
            width: '50%',
            stack: [
              {
                columns: [
                  { text: 'FACTURE NO:', style: 'label', alignment: 'right' },
                  { text: data.invoiceInfos.details.invoiceNo || '', style: 'label', alignment: 'right' }
                ],
                margin: [0, 0, 0, 4]
              },
              {
                columns: [
                  { text: 'DATE:', style: 'label', alignment: 'right' },
                  { text: data.invoiceInfos.details.date || '', style: 'info', alignment: 'right' }
                ],
                margin: [0, 0, 0, 4]
              },
              {
                columns: [
                  { text: 'DATE LIMITE:', style: 'label', alignment: 'right' },
                  { text: data.clientInfos.clientBillingDate || '', style: 'info', alignment: 'right' }
                ]
              }
            ]
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Items Table
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'DESCRIPTION', style: 'tableHeader' },
              { text: 'PRIX UNITAIRE', style: 'tableHeader', alignment: 'center' },
              { text: 'QTÉ', style: 'tableHeader', alignment: 'center' },
              { text: 'TOTAL', style: 'tableHeader', alignment: 'right' }
            ],

            ...data.invoiceInfos.items.map(item => [
              { text: item.desc, style: 'tableCell' },
              { text: item.price, style: 'tableCell', alignment: 'center' },
              { text: item.qty, style: 'tableCell', alignment: 'center' },
              { text: `${item.total} ${currency}`, style: 'tableCell', alignment: 'right' }
            ]),
          ]
        },
        // layout: { hLineWidth: () => 0.5, vLineWidth: () => 0, hLineColor: () => '#333' },
        layout: {
          hLineWidth: function (i, node) {
            // Top border after header (i === 1) and bottom border (i === node.table.body.length)
            return (i === 1 || i === node.table.body.length) ? 1 : 0;
          },
          vLineWidth: function () {
            return 0;
          },
          hLineColor: function () {
            return '#333333';
          },
          paddingTop: function () { return 8; },
          paddingBottom: function () { return 8; }
        },
        margin: [0, 0, 0, 20]
      },

      // Totals
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            stack: [
              { text: `TOTAL HT:  ${subtotal} ${currency}`, style: 'subTotal' },
              { text: `TVA  (${data.options.generalTVA}%): ${taxAmount.toFixed(2)} ${currency}`, style: 'subTotal' },
              { text: `TOTAL TTC:  ${total.toFixed(2)} ${currency}`, style: 'total' }
            ]
          }
        ],
        margin: [0, 0, 0, 40]
      },
      { text: data.options.option || '', style: 'option' },


    ],

    styles: {
      header: { fontSize: 45, color: '#333', margin: [0, 0, 0, 10] },
      label: { fontSize: 10, bold: true, color: '#333', margin: [0, 5, 0, 2] },
      info: { fontSize: 10, color: '#333', margin: [0, 5, 0, 0] },
      tableHeader: { fontSize: 12, bold: true, color: '#333', margin: [0, 2, 0, 2] },
      tableCell: { fontSize: 10, color: '#333', margin: [0, 2, 0, 2] },
      total: { fontSize: 12, bold: true, color: '#333', margin: [0, 6, 0, 2] },
      subTotal: { fontSize: 10, bold: false, color: '#333', margin: [0, 6, 0, 2] },
      option: { fontSize: 8, bold: false, color: '#333', margin: [0, 6, 0, 2] },
    }
  };

  return docDefinition;
};
