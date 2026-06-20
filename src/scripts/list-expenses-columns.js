const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NOCODB_URL || 'https://app.nocodb.com';
const TOKEN = process.env.NOCODB_API_TOKEN;
const TABLE_ID = process.env.NOCODB_TABLE_EXPENSES;

async function listColumns() {
    const url = `${BASE_URL}/api/v1/db/meta/tables/${TABLE_ID}`;
    const res = await fetch(url, {
        headers: { 'xc-token': TOKEN }
    });
    if (res.ok) {
        const data = await res.json();
        console.log("All columns in Expenses table:");
        data.columns.forEach(c => {
            console.log(` - Title: "${c.title}", Column Name: "${c.column_name}", Type: "${c.uidt}"`);
        });
    } else {
        console.log("Error:", res.status, res.statusText);
    }
}

listColumns();
