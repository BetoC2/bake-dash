// First version of barcodeScanner
import React, { useEffect } from "react";
import Quagga from "quagga";

const barcodeScanner = ({ onBarcodeRead }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#barcode-scanner"),
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      (err) => {
        if (err) {
          console.error("Error al inicializar Quagga:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      const code = data.codeResult.code;
      onBarcodeRead(code);
    });

    return () => {
      Quagga.stop();
    };
  }, [onBarcodeRead]);

  return <div id="barcode-scanner" />;
};

export default barcodeScanner;
