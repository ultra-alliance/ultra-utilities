/* eslint-disable @typescript-eslint/no-explicit-any */
import { type BaseService, FileService, LogService } from '../../services';
import {
  type ImportContractConfig,
  type SignerMap,
  type UltraTest,
} from '../../types';

const log = new LogService();
const fileService = new FileService();

export default function getServices(
  contracts: ImportContractConfig[] | undefined,
  _ultratest: UltraTest,
  _accounts: SignerMap,
): Record<string, any> {
  if (!contracts) {
    log.boldError('Error loading contract services.');
    throw new Error('contracts not found');
  }

  const servicesPath = fileService.joinPaths(process.cwd(), 'typegen');
  const serviceFiles = fileService.fs
    .readdirSync(servicesPath)
    .filter(file => file.includes('Service'));

  const serviceInstances: Record<string, unknown> = {};

  for (const file of serviceFiles) {
    const serviceName = file.split('.')[0];
    const shortName = serviceName.split('Service')[0].toLowerCase();

    const contract = contracts.find(
      contract => contract.contract === shortName,
    );
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const importedModule = require(fileService.joinPaths(
      servicesPath,
      file,
    )) as unknown;
    const ServiceClass = (importedModule as any).default as typeof BaseService;
    const newName = contract?.contract ?? contracts[0].contract;

    const newService = new ServiceClass({
      rpcEndpoint: _ultratest.endpoint,
      signer: Object.values(_accounts)[0],
      name: contract?.account ?? contracts[0].account,
    });

    serviceInstances[newName] = newService;
    log.boldSuccess(`Successfully loaded ${serviceName}`);
  }

  return serviceInstances;
}
