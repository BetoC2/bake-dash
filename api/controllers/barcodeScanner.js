// First version of barcodeScanner
import React, { useEffect } from "react";
import Quagga from "quagga";

const generateBarcode = () => {
  const randomBarcode = Math.floor(Math.random() * 1000000000000).toString();
  return randomBarcode;
};

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
        if(err){
          console.error("Error al inicializar Quagga:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.barDetected((data) => {
      const code = data.codeResult.code;
      onBarcodeRead(code);
      fetch('http://localhost:3001/barcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data.message, data.product))
        .catch((error) => 
          console.error("Error al verificar el código de barras en el servidor:", error));
    });

    initQuagga();
    Quagga.onDetected(barDetected)

    return () => {
      Quagga.stop();
    };
  }, [onBarcodeRead]);

  const barcode = generateBarcode();
  console.log("Generated Barcode:", barcode);

  return <div id="barcode-scanner" />;
};

export default barcodeScanner;
