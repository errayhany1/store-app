const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NOCODB_URL || 'https://app.nocodb.com';
const TOKEN = process.env.NOCODB_API_TOKEN;
const PROJECT_ID = process.env.NOCODB_PROJECT_ID;

async function checkProject() {
    console.log('Checking Project ID:', PROJECT_ID);

    try {
        // List Tables for this Project
        const endpoint = `/api/v1/db/meta/projects/${PROJECT_ID}/tables`;
        console.log(`Fetching ${endpoint}...`);

        const res = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'xc-token': TOKEN
            }
        });

        if (res.ok) {
            const tableData = await res.json();
            const tables = tableData.list || tableData;
            console.log('✅ Success! Tables found:');
            tables.forEach(t => console.log(` - ${t.title} (ID: ${t.id}, Name: ${t.table_name})`));
        } else {
            console.log(`❌ Failed: ${res.status} ${res.statusText}`);
            const text = await res.text();
            console.log('Response:', text);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

checkProject();
