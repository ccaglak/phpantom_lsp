#!/bin/bash
cargo build 2>/dev/null

PROJECT_DIR="$PWD/projects/luxplus-backoffice"
FILE_URI="file://${PROJECT_DIR}/app/TestThrowNew.php"

send() {
    local body="$1"
    local len=${#body}
    printf "Content-Length: %d\r\n\r\n%s" "$len" "$body"
}

ESCAPED=$(python3 -c "import json; print(json.dumps('<?php\n\nnamespace App;\n\nclass TestThrowNew {\n    public function doWork(): void {\n        throw new ExpectedRel\n    }\n}\n'))")

ROOT_URI="file://${PROJECT_DIR}"

{
    send "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"initialize\",\"params\":{\"capabilities\":{},\"processId\":null,\"rootUri\":\"${ROOT_URI}\",\"workspaceFolders\":[{\"uri\":\"${ROOT_URI}\",\"name\":\"luxplus-backoffice\"}]}}"
    sleep 1
    send '{"jsonrpc":"2.0","method":"initialized","params":{}}'
    sleep 8
    send "{\"jsonrpc\":\"2.0\",\"method\":\"textDocument/didOpen\",\"params\":{\"textDocument\":{\"uri\":\"${FILE_URI}\",\"languageId\":\"php\",\"version\":1,\"text\":${ESCAPED}}}}"
    sleep 0.5
    send "{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"textDocument/completion\",\"params\":{\"textDocument\":{\"uri\":\"${FILE_URI}\"},\"position\":{\"line\":6,\"character\":29}}}"
    sleep 2
    send '{"jsonrpc":"2.0","id":3,"method":"shutdown"}'
    sleep 0.5
    send '{"jsonrpc":"2.0","method":"exit","params":{}}'
} | RUST_LOG=info cargo run 2>/tmp/phpantom_trace.log > /tmp/phpantom_stdout.bin

echo "=== Completion response (id:2) ==="
python3 -c "
import re, json
data = open('/tmp/phpantom_stdout.bin','rb').read().decode('utf-8','replace')
# Split on Content-Length headers
parts = re.split(r'Content-Length: \d+\r\n\r\n', data)
for p in parts:
    p = p.strip()
    if not p: continue
    try:
        j = json.loads(p)
        if j.get('id') == 2:
            items = j.get('result',{}).get('items',[])
            print(f'Got {len(items)} items')
            for it in items[:5]:
                print(f'  - {it[\"label\"]} ({it.get(\"detail\",\"\")})')
            if len(items) > 5:
                print(f'  ... and {len(items)-5} more')
    except:
        pass
"

echo "=== Trace ==="
grep -i "ExpectedRelation" /tmp/phpantom_trace.log | head -5
