const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NOCODB_URL || 'https://app.nocodb.com';
const TOKEN = process.env.NOCODB_API_TOKEN;
const PROJECT_ID = process.env.NOCODB_PROJECT_ID;
const TABLE_ID = process.env.NOCODB_TABLE_ORDERS;

async function addColumn(col) {
    const url = `${BASE_URL}/api/v1/db/meta/tables/${TABLE_ID}/columns`;
    console.log(`Adding column "${col.title}"...`);
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'xc-token': TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(col)
    });
    if (res.ok) {
        console.log(`✅ Column "${col.title}" added successfully.`);
    } else {
        console.log(`❌ Failed to add column "${col.title}":`, res.status, res.statusText);
        console.log(await res.text());
    }
}

async function addAll() {
    const columns = [
        { column_name: 'CityID', title: 'City ID', uidt: 'SingleLineText' },
        { column_name: 'TrackingNumber', title: 'Tracking Number', uidt: 'SingleLineText' },
        { column_name: 'ShippingLabelURL', title: 'Shipping Label URL', uidt: 'SingleLineText' }
    ];

    for (const col of columns) {
        await addColumn(col);
        // Wait 1 second between calls to avoid rate limit
        await new Promise(r => setTimeout(r, 1000));
    }
}

addAll();
