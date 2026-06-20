const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NOCODB_URL || 'https://app.nocodb.com';
const TOKEN = process.env.NOCODB_API_TOKEN;
const PROJECT_ID = process.env.NOCODB_PROJECT_ID;
const TABLE_ID = process.env.NOCODB_TABLE_ORDERS;

async function getOrders(retries = 3) {
    const url = `${BASE_URL}/api/v2/tables/${TABLE_ID}/records?limit=10`;
    console.log("Fetching url:", url);
    try {
        const res = await fetch(url, {
            headers: { 'xc-token': TOKEN }
        });
        if (res.ok) {
            const data = await res.json();
            console.log("Total orders:", data.list.length);
            data.list.forEach(o => {
                console.log(` - ID: ${o.Id}, Customer: ${o.CustomerName || o['Customer Name']}, Status: ${o.Status}, Notes: ${o.Notes}`);
            });
        } else if (res.status === 429 && retries > 0) {
            console.log("429 rate limit hit. Waiting 3 seconds before retry...");
            await new Promise(resolve => setTimeout(resolve, 3000));
            return getOrders(retries - 1);
        } else {
            console.log("Error fetching orders:", res.status, res.statusText);
            console.log(await res.text());
        }
    } catch (e) {
        console.error(e);
    }
}

getOrders();
