/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';
import ora, { type Options } from 'ora';
const { log } = console;

enum eColors {
  PURPLE = '#A481F0',
  BLACK = '#000000',
}

const { PURPLE } = eColors;

class LoggerService {
  chalk = chalk;
  ora = ora;

  print(text: any) {
    log(text);
  }

  blue(text: string) {
    log(chalk.blueBright(text));
  }

  italicBlue(text: string) {
    log(chalk.italic.blueBright(text));
  }

  boldBlue(text: string) {
    log(chalk.bold.blueBright(text));
  }

  ultraBg(txt: string) {
    return chalk.bgHex(PURPLE).white.bold(`\n    ${txt}    \n`);
  }

  ultra(txt: string) {
    return chalk.hex(PURPLE).bold(txt);
  }

  ultraLight(txt: string) {
    return chalk.hex(PURPLE).italic(txt);
  }

  title(title: string): void {
    log(this.ultraBg(title));
  }

  start(text: string) {
    const spinner = ora({
      text,
      color: 'magenta',
      spinner: 'dots',
    }).start();
    return spinner;
  }

  fail(text: string) {
    ora().fail(chalk.redBright(text));
  }

  info(text: string) {
    ora().info(chalk.blueBright(text));
  }

  warn(text: string) {
    ora().warn(chalk.yellowBright(text));
  }

  boldWarn(text: string) {
    ora().warn(chalk.bold.yellowBright(text));
  }

  spin(options?: string | Options) {
    return ora(options);
  }

  boldSuccess(text: string) {
    log(chalk.bold.greenBright(text));
  }

  success(text: string) {
    log(chalk.greenBright(text));
  }

  error(text: string) {
    log(chalk.bold.redBright(text));
  }

  boldError(text: string) {
    log(chalk.bold.redBright(text));
  }

  lightError(text: string) {
    log(chalk.italic.redBright(text));
  }

  purple(text: string) {
    log(chalk.hex(PURPLE)(text));
  }

  boldPurple(text: string) {
    log(chalk.bold.hex(PURPLE)(text));
  }

  art() {
    log(
      chalk.hex(PURPLE)(`

          /  |   /  |
 __    __ ᕫᕫ |  _ᕫᕫ |_   ______    _____
/  |  /  |ᕫᕫ | / ᕫᕫ   | /      \\ /      \\
ᕫᕫ |  ᕫᕫ |ᕫᕫ |ᕫᕫᕫᕫᕫᕫ/  /ᕫᕫᕫᕫᕫᕫᕫ |ᕫᕫᕫᕫᕫᕫ |
ᕫᕫ |  ᕫᕫ |ᕫᕫ |  ᕫᕫ | __ ᕫᕫ |  ᕫᕫ/ /   ᕫᕫ |
ᕫᕫ \\__ᕫᕫ |ᕫᕫ |  ᕫᕫ |/  |ᕫᕫ |    /ᕫᕫᕫᕫᕫᕫᕫ |
ᕫᕫ    ᕫᕫ/ ᕫᕫ |  ᕫᕫ  ᕫᕫ/ ᕫᕫ |   ᕫᕫ     ᕫᕫ |
 ᕫᕫᕫᕫᕫᕫ/  ᕫᕫ/   ᕫᕫᕫᕫ/   ᕫᕫ/     ᕫᕫᕫᕫᕫᕫ/
                             `),
    );
  }
}

export default LoggerService;
