const express = require('express');
const multer = require('multer');
const pdf2html = require('pdf2html');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('.'));

app.post('/convert', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    try {
        const html = await pdf2html.html(req.file.path);
        fs.unlinkSync(req.file.path); // Remove o arquivo temporário
        res.send(html);
    } catch (error) {
        console.error('Erro na conversão:', error);
        res.status(500).send('Erro na conversão do PDF.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
