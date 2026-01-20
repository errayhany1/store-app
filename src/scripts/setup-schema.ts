const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NOCODB_URL || 'https://app.nocodb.com';
const TOKEN = process.env.NOCODB_API_TOKEN;
const PROJECT_ID = process.env.NOCODB_PROJECT_ID;

async function createTables() {
    console.log('Creating tables in Project:', PROJECT_ID);

    const headers = {
        'xc-token': TOKEN,
        'Content-Type': 'application/json'
    };

    // 1. Create Orders Table
    const ordersTable = {
        table_name: 'Orders',
        title: 'Orders',
        columns: [
            { column_name: 'CustomerName', title: 'Customer Name', uidt: 'SingleLineText' },
            { column_name: 'CustomerPhone', title: 'Customer Phone', uidt: 'PhoneNumber' },
            { column_name: 'SalePrice', title: 'Sale Price', uidt: 'Currency' },
            { column_name: 'ShippingCost', title: 'Shipping Cost', uidt: 'Currency' },
            { column_name: 'ShippingPaidBy', title: 'Shipping Paid By', uidt: 'SingleSelect', colOptions: { options: [{ title: 'Merchant', id: 'merchant' }, { title: 'Customer', id: 'customer' }] } },
            { column_name: 'Status', title: 'Status', uidt: 'SingleSelect', colOptions: { options: [{ title: 'Pending', id: 'pending' }, { title: 'Shipped', id: 'shipped' }, { title: 'Delivered', id: 'delivered' }, { title: 'Returned', id: 'returned' }] } },
            { column_name: 'Notes', title: 'Notes', uidt: 'LongText' },
            // Link to Products (Table-1) will be a separate API call usually, or we add a text field for Product Reference for now if linking is complex via API v1
            { column_name: 'ProductSKU', title: 'Product SKU', uidt: 'SingleLineText' }
        ]
    };

    // 2. Create Expenses Table
    const expensesTable = {
        table_name: 'Expenses',
        title: 'Expenses',
        columns: [
            { column_name: 'Description', title: 'Description', uidt: 'SingleLineText' },
            { column_name: 'Amount', title: 'Amount', uidt: 'Currency' },
            { column_name: 'PaidBy', title: 'Paid By', uidt: 'SingleSelect', colOptions: { options: [{ title: 'User', id: 'user' }, { title: 'Partner', id: 'partner' }] } },
            { column_name: 'Date', title: 'Date', uidt: 'Date' }
        ]
    };

    try {
        // Create Orders
        console.log('Creating Orders table...');
        const orderRes = await fetch(`${BASE_URL}/api/v1/db/meta/projects/${PROJECT_ID}/tables`, {
            method: 'POST',
            headers,
            body: JSON.stringify(ordersTable)
        });

        if (orderRes.ok) {
            console.log('✅ Orders table created.');
        } else {
            const txt = await orderRes.text();
            console.log('⚠️ Failed to create Orders table:', txt);
        }

        // Create Expenses
        console.log('Creating Expenses table...');
        const expRes = await fetch(`${BASE_URL}/api/v1/db/meta/projects/${PROJECT_ID}/tables`, {
            method: 'POST',
            headers,
            body: JSON.stringify(expensesTable)
        });

        if (expRes.ok) {
            console.log('✅ Expenses table created.');
        } else {
            const txt = await expRes.text();
            console.log('⚠️ Failed to create Expenses table:', txt);
        }

    } catch (error) {
        console.error('Error creating tables:', error);
    }
}

createTables();
