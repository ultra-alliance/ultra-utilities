#!/usr/bin/env node

import { IS_LINUX } from './constants';
import { loadCommands, loadProgram } from './generators';
import { LogService } from './services';

const log = new LogService();

(async () => {
  log.art();
  if (!IS_LINUX) {
    log.boldError('Ultra Dev is only supported on Linux\n');
    return;
  }

  const program = loadProgram(log);
  await loadCommands(program);
})();
