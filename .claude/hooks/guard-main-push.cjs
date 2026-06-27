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

  const command = input.tool_input?.command || '';
  const isMainPush = /\bgit\s+push\b/.test(command) && /\bmain\b/.test(command);

  if (!isMainPush) {
    return process.stdout.write('{}');
  }

  function deny(reason) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: reason,
        },
      }),
    );
  }

  try {
    execSync('npx tsc --noEmit', {encoding: 'utf8', stdio: 'pipe'});
  } catch (err) {
    return deny(
      `Blocked push to main: typecheck failed.\n${(err.stdout || '') + (err.stderr || '')}`,
    );
  }

  try {
    execSync('npm run build', {encoding: 'utf8', stdio: 'pipe'});
  } catch (err) {
    return deny(
      `Blocked push to main: build failed.\n${(err.stdout || '') + (err.stderr || '')}`,
    );
  }

  process.stdout.write('{}');
});
