const fs = require('fs');
const path = require('path');

const brainDir = "C:\\Users\\pc\\.gemini\\antigravity\\brain";
const keywords = ['رفض', 'reject', 'decline', 'cancel', 'discard', 'rollback', 'git', 'تغيير', 'تعديل'];

if (fs.existsSync(brainDir)) {
    const folders = fs.readdirSync(brainDir);
    folders.forEach(folder => {
        ['transcript.jsonl', 'transcript_full.jsonl'].forEach(file => {
            const fullPath = path.join(brainDir, folder, '.system_generated', 'logs', file);
            if (fs.existsSync(fullPath)) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    const lines = content.split('\n');
                    lines.forEach(line => {
                        if (!line.trim()) return;
                        const data = JSON.parse(line);
                        if (data.type === 'USER_INPUT') {
                            const text = data.content || '';
                            const matches = keywords.filter(w => text.includes(w));
                            if (matches.length > 0) {
                                // print if it's NOT the current conversation ID or if it contains "رفض"
                                if (folder !== '2d37d12b-44ee-4b28-ae78-28cbcd0f1e6a' || text.includes('رفض')) {
                                    console.log(`[Brain: ${folder}] [File: ${file}] [Step: ${data.step_index}] [Matches: ${matches.join(',')}]`);
                                    console.log(text.substring(0, 300));
                                    console.log("=".repeat(80));
                                }
                            }
                        }
                    });
                } catch (e) {
                    // ignore
                }
            }
        });
    });
} else {
    console.log("Brain directory not found");
}
