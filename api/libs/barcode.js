export const barcodeGenerator = (longitud) => {
  var caracteres = "0123456789";
  var codigo = "";

  for (var i = 0; i < longitud; i++) {
    var indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres.charAt(indice);
  }

  return codigo;
};
