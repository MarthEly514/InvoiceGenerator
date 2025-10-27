import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function HtmlToPdf() {
    const contentRef = useRef();

    const handleDownloadPDF = async () => {
        const element = contentRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("document.pdf");
    };

    return (
        <div className="flex flex-col items-center gap-6 p-8 bg-[#f3f4f6] min-h-screen">
            {/* The section you want to convert */}
            <div
                ref={contentRef}
                className="bg-[#ffffff]shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <h1 className="text-2xl font-bold text-[#155dfc] mb-4">
                    Invoice Example
                </h1>
                <p>
                    <strong>Date:</strong> 2025-10-27
                </p>
                <table className="w-full border-collapse mt-4">
                    <thead>
                        <tr className="bg-[#155dfc] text-[#ffffff]">
                            <th className="p-2 text-left">Item</th>
                            <th className="p-2 text-right">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">Laptop</td>
                            <td className="p-2 text-right">$1000</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">Mouse</td>
                            <td className="p-2 text-right">$25</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">Keyboard</td>
                            <td className="p-2 text-right">$50</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="p-2 text-right font-semibold">Total</td>
                            <td className="p-2 text-right font-semibold">$1075</td>
                        </tr>
                    </tfoot>
                </table>
                <p className="mt-6 text-[#364153]">Thank you for your purchase!</p>
            </div>

            {/* The button */}
            <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 bg-[#155dfc] text-[#ffffff] rounded-lg hover:bg-[#1447e6] transition"
            >
                Download PDF
            </button>
        </div>
    );
}
