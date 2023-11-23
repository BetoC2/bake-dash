
export const barcodeGenerator = (size) => {
  var characters = "0123456789";
  var code = "";

  for(var i = 0; i < size; i++){
    var index = Math.floor(Math.random() * characters.length);
    code += characters.charAt(index);
  }

  return code;
};

