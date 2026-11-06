function exportCsv(csvContent,fileName){

    const encodedUri =
        encodeURI(
            "data:text/csv;charset=utf-8," +
            csvContent
        );

    const link =
        document.createElement("a");

    link.href = encodedUri;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}