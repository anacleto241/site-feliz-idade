// Função para carregar e exibir dados da planilha do Google Sheets
function loadGoogleSheetData() {
    const spreadsheetId = '1AX40mx4ecMODtnSeIR_QsyVgZ-gD_izINLxV24MlRTo';
    const range = 'acoes'; // Substitua pelo nome da aba

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range
    }).then(function (response) {
        const data = response.result.values;
        const tableBody = document.querySelector('#actions-table tbody');

        // Limpe qualquer conteúdo existente
        tableBody.innerHTML = '';

        // Preencha a tabela com os dados da planilha
        data.forEach(function (row) {
            const tableRow = document.createElement('tr');
            row.forEach(function (cell) {
                const tableCell = document.createElement('td');
                tableCell.textContent = cell || '';
                tableRow.appendChild(tableCell);
            });
            tableBody.appendChild(tableRow);
        });
    });
}

// Inicializa a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyDqMei53410D99vqj8kGWCxhcT_Ijsxzlg',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(loadGoogleSheetData);
}

// Carrega a API do Google Sheets
gapi.load('client', initGoogleSheetsApi);
