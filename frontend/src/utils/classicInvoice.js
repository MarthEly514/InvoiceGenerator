// classicInvoice.js
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

if (!pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs;
}

pdfMake.addFonts({
  Montserrat: {
    normal: `${window.location.origin}/src/fonts/Montserrat-Regular.ttf`,
    bold: `${window.location.origin}/src/fonts/Montserrat-Bold.ttf`,
    light: `${window.location.origin}/src/fonts/Montserrat-Extra-Light.ttf`,
    italics: `${window.location.origin}/src/fonts/Montserrat-Extra-Light.ttf`,
  },
  Rosaline: {
    normal: `${window.location.origin}/src/fonts/Rosaline-Regular.ttf`
  }
});

export const classicInvoice = (data) => {
  const currency = data.invoiceInfos.currency || '$';
  const subtotal = data.invoiceInfos.items.reduce((sum, item) => sum + item.total, 0);
  const taxRate = data.options?.generalTVA || 0;
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [40, 40, 40, 40],
    defaultStyle: {
      font: "Montserrat",
    },
    content: [
      // Header
      {
        text: 'FACTURE',
        fontSize: 68,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      {
        canvas: [
          { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }
        ],
        margin: [0, 0, 0, 20]
      },

      // Info Section
      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: `Date: ${data.invoiceInfos.details.date || ''}`, style: 'label' },
              { text: `No. Invoice: ${data.invoiceInfos.details.invoiceNo || ''}`, style: 'label' },
            ]
          },
          {
            width: '50%',
            stack: [
              { text: `Bill to: ${data.clientInfos.clientName || ''}`, style: 'label', alignment: 'right' }
            ]
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Items Table
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Date', style: 'tableHeader', fillColor: "#E0E0E0" },
              { text: 'Item Description', style: 'tableHeader', fillColor: "#E0E0E0" },
              { text: 'Price', style: 'tableHeader', alignment: 'center', fillColor: "#E0E0E0" },
              { text: 'Qty', style: 'tableHeader', alignment: 'center', fillColor: "#E0E0E0" },
              { text: 'Total', style: 'tableHeader', alignment: 'center', fillColor: "#E0E0E0" }
            ],
            ...data.invoiceInfos.items.map(item => [
              { text: item.date || '', style: 'tableCell' },
              { text: item.desc, style: 'tableCell' },
              { text: `${item.price} ${currency}`, style: 'tableCell', alignment: 'center' },
              { text: item.qty, style: 'tableCell', alignment: 'center' },
              { text: `${item.total} ${currency}`, style: 'tableCell', alignment: 'center' }
            ]),

            // Total row
            [
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: '', fillColor: "#E0E0E0", border: [true, true, false, true] },
              { text: 'Total:', style: 'totalLabel', alignment: 'left', fillColor: "#E0E0E0", border: [false, true, false, true] },
              { text: '', fillColor: "#E0E0E0", border: [false, true, true, true] }
            ]
          ]
        },
        layout: {
          hLineWidth: function () {
            // All horizontal lines visible
            return 1;
          },
          vLineWidth: function () {
            // All vertical lines visible
            return 1;
          },
          hLineColor: function () { return '#000000'; },
          vLineColor: function () { return '#000000'; },
          paddingTop: function () { return 8; },
          paddingBottom: function () { return 8; },
          paddingLeft: function () { return 8; },
          paddingRight: function () { return 8; }
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
              { text: `Total: ${total.toFixed(2)} ${currency}`, bold: true, alignment: 'right' }
            ]
          }
        ],
        margin: [0, 0, 0, 40]
      },

      // Footer
      {
        text: 'Thank you!',
        font: "Rosaline",
        fontSize: 35,
        alignment: 'left'
      }
    ],

    styles: {
      label: { fontSize: 10, color: '#333', margin: [0, 2, 0, 2] },
      tableHeader: { fontSize: 12, bold: true, color: '#333', margin: [0, 2, 0, 2] },
      tableCell: { fontSize: 10, color: '#333', margin: [0, 2, 0, 2] }
    }
  };

  return docDefinition;
};
