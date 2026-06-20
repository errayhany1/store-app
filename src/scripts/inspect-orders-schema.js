const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NOCODB_URL || 'https://app.nocodb.com';
const TOKEN = process.env.NOCODB_API_TOKEN;
const PROJECT_ID = process.env.NOCODB_PROJECT_ID;
const TABLE_ID = process.env.NOCODB_TABLE_ORDERS;

async function inspectSchema() {
    const endpoint = `/api/v1/db/meta/tables/${TABLE_ID}`;
    const url = `${BASE_URL}${endpoint}`;
    console.log("Fetching url:", url);
    const res = await fetch(url, {
        headers: { 'xc-token': TOKEN }
    });
    if (res.ok) {
        const data = await res.json();
        console.log("Table info:", data.title, data.table_name);
        const statusCol = data.columns.find(c => c.column_name === 'Status' || c.title === 'Status');
        if (statusCol) {
            console.log("Status column options:", JSON.stringify(statusCol.colOptions || statusCol.meta, null, 2));
        } else {
            console.log("Status column not found. Available columns:");
            data.columns.forEach(c => console.log(` - ${c.column_name} (${c.title}) type: ${c.uidt}`));
        }
    } else {
        console.log("Error fetching schema:", res.status, res.statusText);
        console.log(await res.text());
    }
}

inspectSchema();
