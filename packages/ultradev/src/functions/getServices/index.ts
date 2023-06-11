/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
// import { type BaseService } from '../../services';
import {
  type ImportContractConfig,
  type SignerMap,
  type UltraTest,
} from '../../types';

const getServices = (
  contracts: ImportContractConfig[] | undefined,
  _ultratest: UltraTest,
  _accounts: SignerMap,
): Record<string, any> => {
  if (!contracts) {
    throw new Error('contracts not found');
  }

  const servicesPath = path.join(process.cwd(), 'cache/typegen');
  const serviceFiles = fs
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
    const importedModule = require(path.join(servicesPath, file));
    const ServiceClass = importedModule.default;

    if (contract) {
      const newName = contract.contract;

      const newService = new ServiceClass({
        rpcEndpoint: _ultratest.endpoint,
        signer: Object.values(_accounts)[0],
        name: contract.account,
      });

      serviceInstances[newName] = newService;
    }
  }

  return serviceInstances;
};

export default getServices;
