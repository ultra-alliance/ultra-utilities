import { LogService } from '../../services';

type tData = {
  title: string;
  value: string;
};

export type tLogRecap = {
  title?: string;
  data: tData[];
};

const log = new LogService();

function logRecap({ title, data }: tLogRecap) {
  log.print('\n');
  if (title) {
    log.print(log.chalk.bold(title + ':'));
  }

  data.forEach(({ title, value }) => {
    log.print(
      `${log.chalk.italic(`${title}: `)} ${log.chalk.bold.green(value)}`,
    );
  });
  log.print('\n');
}

export default logRecap;
