const {execSync} = require('child_process');

let raw = '';
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return process.stdout.write('{}');
  }

  const file =
    input.tool_input?.file_path || input.tool_response?.filePath || '';

  if (!/\.tsx?$/.test(file)) {
    return process.stdout.write('{}');
  }

  let out = '';
  try {
    execSync('npx tsc --noEmit', {encoding: 'utf8', stdio: 'pipe'});
  } catch (err) {
    out = (err.stdout || '') + (err.stderr || '');
  }

  if (out.trim()) {
    process.stdout.write(
      JSON.stringify({
        decision: 'block',
        reason: `TypeScript errors after editing ${file}:\n${out}`,
      }),
    );
  } else {
    process.stdout.write('{}');
  }
});
