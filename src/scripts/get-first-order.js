const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NOCODB_URL || 'https://app.nocodb.com';
const TOKEN = process.env.NOCODB_API_TOKEN;
const PROJECT_ID = process.env.NOCODB_PROJECT_ID;
const TABLE_ID = process.env.NOCODB_TABLE_ORDERS;

async function getFirstOrder(retries = 3) {
    const url = `${BASE_URL}/api/v2/tables/${TABLE_ID}/records?limit=1`;
    try {
        const res = await fetch(url, {
            headers: { 'xc-token': TOKEN }
        });
        if (res.ok) {
            const data = await res.json();
            console.log("First order raw JSON:");
            console.log(JSON.stringify(data.list[0], null, 2));
        } else if (res.status === 429 && retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            return getFirstOrder(retries - 1);
        } else {
            console.log("Error:", res.status, res.statusText);
        }
    } catch (e) {
        console.error(e);
    }
}

getFirstOrder();
