import type { ModelInfo } from '~/utils/types';

export interface Provider {
  id: string;
  apiKey: string;
  models: ModelInfo[];
}
