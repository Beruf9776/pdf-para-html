async function convertPDF() {
    const fileInput = document.getElementById('pdfFile');
    const file = fileInput.files[0];
    if (!file) {
        alert('Por favor, selecione um arquivo PDF.');
        return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            body: formData
        });
        const html = await response.text();
        document.getElementById('result').innerHTML = html;
    } catch (error) {
        console.error('Erro na conversão:', error);
        alert('Ocorreu um erro durante a conversão.');
    }
}
