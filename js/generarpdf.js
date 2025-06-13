// Asegura que la función esté en window para que sea global
window.importarJsPDFyGenerarPDF = function(texto) {
  // Para compatibilidad con la importación UMD de jsPDF
  let jsPDF = window.jspdf && window.jspdf.jsPDF ? window.jspdf.jsPDF : window.jsPDF;
  if (!jsPDF) {
    alert("No se pudo generar el PDF porque jsPDF no está cargado.");
    return;
  }
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Resumen de Inscripción", 20, 20);

  const textoFormateado = doc.splitTextToSize(texto, 170); // ajusta ancho
  doc.text(textoFormateado, 20, 40);

  const nombreArchivo = "inscripcion_" + new Date().toISOString().slice(0, 10) + ".pdf";
  doc.save(nombreArchivo);
};
