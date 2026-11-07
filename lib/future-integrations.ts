import {estimatorPath} from './estimator-path.mjs';
/** One public, pre-launch calculator; commercial activity remains gated separately. */
export const kitchenEstimatorIntegration={path:estimatorPath,publicEnabled:true,status:'production-estimator',testingPath:'/testing'} as const;
