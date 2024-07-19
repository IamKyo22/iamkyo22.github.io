const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Substitua pelo seu webhook URL
const webhookUrl = 'https://discord.com/api/webhooks/1263897888124178473/CrwSm2QEtGrCeUP9MfsLuAaEOrem5-hx-oM9SyWhrUtKGNJgUsp96FL-yANkDNIZU_G5';

app.use(express.json());

app.post('/log-ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Envie o IP para o Discord
    axios.post(webhookUrl, {
        content: `Novo acesso ao site! IP: ${ip}`
    })
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.error('Erro ao enviar IP para o Discord:', error);
        res.sendStatus(500);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
