//download function
export const chart2PDF = e => {
  
    const but = e.target;
    but.style.display = "none";
    let input = window.document.getElementsByClassName("chart2PDF")[0];

    html2canvas(input).then(canvas => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "pt");
      pdf.addImage(
        img,
        "png",
        input.offsetLeft,
        input.offsetTop,
        input.clientWidth,
        input.clientHeight
      );
      pdf.save("dhischart.pdf");
      but.style.display = "block";
    });
  };