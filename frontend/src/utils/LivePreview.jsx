import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import React from "react";
pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs;

export default function LivePDFPreview({ data, modelName = "Classic" }) {
  const [pdfUrl, setPdfUrl] = React.useState(null);
  const currency = data.invoiceInfos.currency || "$";
  const subtotal = data.invoiceInfos.items.reduce((sum, i) => sum + i.total, 0);
  const taxRate = data.options?.generalTVA || 10;
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  React.useEffect(() => {
    const docDefinition = {
      pageSize: "A4",
      pageMargins: [50, 60, 50, 60],
      content: [
        {
          text: modelName.toUpperCase() + " INVOICE",
          style: "title",
          alignment: "center",
          margin: [0, 0, 0, 40],
        },
        {
          columns: [
            [
              { text: "À l’ordre de:", style: "header" },
              { text: data.clientInfos.clientName || "Richard Sanchez" },
              { text: data.clientInfos.clientPhone || "01 97 98 99 00" },
              { text: data.clientInfos.clientAdress || "123 Anywhere St." },
              { text: "\nPaiement à:", style: "header" },
              { text: data.userInfos.senderName || "Adeline Palmerston" },
              { text: `Méthode : ${data.options?.paymentMethod || "Borcele Bank"}` },
              { text: `N° de compte : ${data.options?.paymentInfos || "0123 4567 8901"}` },
            ],
            [
              { text: `FACTURE N°: ${data.invoiceInfos.details.invoiceNo || "0001"}` },
              { text: `Date: ${data.invoiceInfos.details.date || "2025-01-01"}` },
              { text: `Échéance: ${data.clientInfos.clientBillingDate || "2025-02-01"}` },
            ],
          ],
        },
        {
          text: "\n",
        },
        {
          style: "tableExample",
          table: {
            widths: ["*", "auto", "auto", "auto"],
            headerRows: 1,
            body: [
              ["Description", "Prix", "Qté", "Total"],
              ...data.invoiceInfos.items.map((item) => [
                item.desc,
                `${item.price} ${currency}`,
                item.qty,
                `${item.total} ${currency}`,
              ]),
            ],
          },
        },
        {
          text: "\n",
        },
        {
          columns: [
            { width: "*", text: "" },
            {
              width: "auto",
              table: {
                body: [
                  ["Total HT", `${subtotal.toFixed(0)} ${currency}`],
                  ["Taxe", `${taxRate}%`],
                  ["Total TTC", `${total.toFixed(0)} ${currency}`],
                ],
              },
              layout: "lightHorizontalLines",
            },
          ],
        },
      ],
      styles: {
        title: { fontSize: 22, bold: true },
        header: { fontSize: 12, bold: true, margin: [0, 5, 0, 2] },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    });

    // Clean old blob URLs
    return () => pdfUrl && URL.revokeObjectURL(pdfUrl);
  }, [data]); // re-run whenever data changes

  return (
    <div className="preview">
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600"
          title="PDF Preview"
          style={{ border: "none" }}
        />
      ) : (
        <p>Generating preview...</p>
      )}
    </div>
  );
}
