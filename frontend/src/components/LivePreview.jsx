import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import React, { useEffect } from "react";
pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs;

export default function LivePDFPreview({ data, chosenTemplate }) {
  const [pdfUrl, setPdfUrl] = React.useState(null);
  // const currency = data.invoiceInfos.currency || "$";
  // const subtotal = data.invoiceInfos.items.reduce((sum, i) => sum + i.total, 0);
  // const taxRate = data.options?.generalTVA || 10;
  // const taxAmount = (subtotal * taxRate) / 100;
  // const total = subtotal + taxAmount;

  useEffect(() => {
    const docDefinition = chosenTemplate(data)
    

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setPdfUrl(url+"#view=Fit&zoom=150&toolbar=0&statusbar=0&messages=0&navpanes=0&scrollbar=0");
    });

    // Clean old blob URLs
    return () => pdfUrl && URL.revokeObjectURL(pdfUrl);
  }, [data]); // re-run whenever data changes

  return (
    <div className="preview">
      {pdfUrl ? (
        <iframe
          src={pdfUrl+""}
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
