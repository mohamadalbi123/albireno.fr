/** Reserved integration contract only: public integration stays disabled; the standalone prototype has a separate unlisted test URL. */
export const kitchenEstimatorIntegration = {
  path: '/simulateur-pose-cuisine',
  publicEnabled: false,
  status: 'unlisted-testing-only',
  testingPath: '/testing',
} as const;
