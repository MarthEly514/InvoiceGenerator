import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

if (!pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs;
}

pdfMake.addFonts({
  Inter: {
    normal: `${window.location.origin}/fonts/Inter_28pt-Medium.ttf`,
    bold: `${window.location.origin}/fonts/Inter_28pt-Bold.ttf`,
    light: `${window.location.origin}/fonts/Inter_28pt-Light.ttf`,
    thin: `${window.location.origin}/fonts/Inter_28pt-Thin.ttf`,
  },
  InterBold: {
    normal: `${window.location.origin}/fonts/Inter_28pt-Bold.ttf`,
  },
  InterLight: {
    normal: `${window.location.origin}/fonts/Inter_28pt-Light.ttf`,
  },
  InterThin: {
    normal: `${window.location.origin}/fonts/Inter_28pt-Thin.ttf`,
  },


  Montserrat: {
    normal: `${window.location.origin}/fonts/Montserrat-Regular.ttf`,
    bold: `${window.location.origin}/fonts/Montserrat-Bold.ttf`,
    light: `${window.location.origin}/fonts/Montserrat-Extra-Light.ttf`,
  },
});

export const creativeInvoice = (data) => {
  const currency = data.invoiceInfos.currency || '$';
  const subtotal = data.invoiceInfos.items.reduce((sum, item) => sum + item.total, 0);
  const taxRate = data.options?.generalTVA || 0;
  const taxAmount = (subtotal * taxRate) / 100;
  const discount = data.options?.discount || 0;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [40, 40, 40, 40],
    defaultStyle: {
      font: "Inter",
    },
    content: [
      // Header Section

      {
        columns: [
          {
            width: '50%',
            stack: [
              data.userInfos.senderLogo &&
              {
                // Logo placeholder - you can replace with actual image
                image: data.userInfos.senderLogo,
                width: 100,
                alignment: 'left' // you can also use 'center' or 'right'
              },
              {
                text: data.userInfos.senderName || 'Entreprise',
                fontSize: 20,
                bold: true,
                color: '#2D2D2D',
                lineHeight: 1.2,
                margin: [0, 10, 0, 15]
              },
              {
                text: data.userInfos.senderAdress || 'Addresse',
                fontSize: 9,
                bold: true,
                color: '#2D2D2D',
                margin: [0, 0, 0, 10]
              },
              {
                text: data.userInfos.senderPhone || '(+62) 123 456 7890',
                fontSize: 9,
                color: '#2D2D2D'
              }
            ]
          },
          {
            width: '*',
            stack: [
              {
                text: 'FACTURE',
                fontSize: 38,
                bold: true,
                color: '#5B4E96',
                alignment: 'right',
                margin: [0, 0, 0, 5],
              },
              {
                text: data.invoiceInfos.details.date || 'December 26, 2020',
                fontSize: 11,
                color: '#2D2D2D',
                alignment: 'right',
                margin: [0, 0, 0, 30]
              },
              {
                text: 'À :',
                fontSize: 9,
                bold: true,
                color: '#2D2D2D',
                alignment: 'left',
                margin: [130, 0, 0, 3]
              },
              {
                text: data.clientInfos.clientName || 'Wagino Subianto',
                fontSize: 13,
                color: '#2D2D2D',
                bold: true,
                alignment: 'left',
                margin: [130, 0, 0, 2]
              },
              {
                text: data.clientInfos.clientAdress || 'Main street, Your Loc.\nNumber 06/B',
                fontSize: 9,
                color: '#2D2D2D',
                alignment: 'left',
                margin: [130, 0, 0, 2]
              },
              {
                text: data.clientInfos.clientPhone || 'Mail or phone',
                fontSize: 9,
                color: '#2D2D2D',
                alignment: 'left',
                margin: [130, 0, 0, 2]
              }
            ]
          }
        ],
        margin: [0, 0, 0, 30]
      },


      // Items Table
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Article', style: 'tableHeader', fillColor: '#5B4E96', color: '#FFFFFF', border: [false, false, false, false], },
              { text: 'Prix Unitaire', style: 'tableHeader', alignment: 'center', fillColor: '#5B4E96', color: '#FFFFFF', border: [false, false, false, false], },
              { text: 'Qté', style: 'tableHeader', alignment: 'center', fillColor: '#5B4E96', color: '#FFFFFF', border: [false, false, false, false], },
              { text: 'Total', style: 'tableHeader', alignment: 'right', fillColor: '#5B4E96', color: '#FFFFFF', border: [false, false, false, false], },
            ],
            ...data.invoiceInfos.items.map(item => [
              {
                stack: [
                  { text: item.desc || 'Items Name', bold: true, fontSize: 10, margin: [0, 0, 0, 2] },
                ],
                border: [false, false, false, true],
                borderColor: ['', '', '', '#CCCCCC'],
                margin: [0, 8, 0, 8]
              },
              { text: `${currency} ${item.price}`, style: 'tableCell', alignment: 'center', border: [false, false, false, true], borderColor: ['', '', '', '#CCCCCC'] },
              { text: item.qty, style: 'tableCell', alignment: 'center', border: [false, false, false, true], borderColor: ['', '', '', '#CCCCCC'] },
              { text: `${currency}  ${item.total}`, style: 'tableCell', alignment: 'right', border: [false, false, false, true], borderColor: ['', '', '', '#CCCCCC'] }
            ])
          ]
        },
        layout: {
          hLineWidth: () => 2,
          vLineWidth: () => 0,
          paddingTop: function () { return 10; },
          paddingBottom: function () { return 10; },
          paddingLeft: function () { return 10; },
          paddingRight: function () { return 10; }
        },
        margin: [0, 0, 0, 20]
      },

      // Totals Section
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 200,
            stack: [
              {
                columns: [
                  { text: 'TOTAL HT :', fontSize: 10, color: '#2D2D2D', alignment: 'right' },
                  { text: `${currency} ${subtotal.toFixed(2)}`, fontSize: 10, bold: true, color: '#2D2D2D', alignment: 'right' }
                ],
                margin: [0, 0, 0, 5]
              },
              {
                columns: [
                  { text: `TVA ${taxRate}% :`, fontSize: 10, color: '#2D2D2D', alignment: 'right' },
                  { text: `${currency}  ${taxAmount.toFixed(2)}`, fontSize: 10, bold: true, color: '#2D2D2D', alignment: 'right' }
                ],
                margin: [0, 0, 0, 5]
              },
              {
                table: {
                  widths: ['*', 'auto'],
                  body: [
                    [
                      { text: 'TOTAL :', fontSize: 12, color: '#FFFFFF', alignment: 'center', fillColor: '#5B4E96' },
                      { text: `${currency} ${total.toFixed(2)}`, fontSize: 12, bold: true, color: '#FFFFFF', alignment: 'center', fillColor: '#5B4E96' }
                    ]
                  ]
                },
                layout:
                {
                  hLineWidth: () => 0,
                  vLineWidth: () => 0,
                  paddingLeft: function () { return 10; },
                  paddingRight: function () { return 10; },
                  paddingTop: function () { return 10; },
                  paddingBottom: function () { return 10; }
                },
                margin: [10, 10, 5, 5],
              }

            ]
          }
        ],
        margin: [0, 0, 0, 30]
      },

      // Note Section
      data.options.option && {
        text: 'Note:',
        fontSize: 9,
        bold: true,
        color: '#2D2D2D',
        margin: [0, 0, 0, 5]
      },
      {
        text: data.options?.option || '',
        fontSize: 8,
        color: '#666666',
        margin: [0, 0, 0, 30]
      },

      // Thank you message
      {
        text: 'Nous vous remercions !',
        fontSize: 14,
        bold: true,
        color: '#5B4E96',
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      {
        canvas: [
          { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#CCCCCC' }
        ],
        margin: [0, 0, 0, 20]
      },

      // Footer Section
      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'Questions?', fontSize: 10, bold: true, color: '#2D2D2D', margin: [0, 0, 0, 5] },
              { text: 'Appelez-nous ou \nEnvoyez-nous un e-mail:', bold: true, fontSize: 8, color: '#666666', margin: [0, 0, 0, 2] },
              { text: data.userInfos.senderAdress, fontSize: 8, color: '#666666' },
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'Informations de paiement :', fontSize: 10, bold: true, color: '#2D2D2D', margin: [0, 0, 0, 5] },
              { text: 'Méthode:', fontSize: 8, color: '#666666', margin: [0, 0, 0, 2], bold: true },
              { text: data.options.paymentMethod, fontSize: 8, color: '#666666', margin: [0, 2, 0, 8] },

              { text: 'Détails de paiement:', fontSize: 8, color: '#666666', margin: [0, 2, 0, 2], bold: true },
              { text: data.options.paymentInfos, fontSize: 8, color: '#666666' }
            ]
          },
        ]
      }
    ],

    styles: {
      tableHeader: {
        fontSize: 11,
        bold: true,
        margin: [0, 5, 0, 5]
      },
      tableCell: {
        fontSize: 10,
        color: '#2D2D2D',
        margin: [0, 5, 0, 5]
      }
    }
  };


  return docDefinition;
};