// @ts-nocheck
// Preventing TS checks with files presented in the video for a better presentation.
import { getAPIKey, getBaseURL } from '~/lib/.server/llm/api-key';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { ollama } from 'ollama-ai-provider';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { createMistral } from '@ai-sdk/mistral';
import type { ModelInfo, OllamaApiResponse, OllamaModel } from '~/utils/types';

export function getAnthropicModel(apiKey: string, model: string) {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic(model);
}

export function getOpenAILikeModel(baseURL: string, apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL,
    apiKey,
  });

  return openai(model);
}

export function getOpenAIModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    apiKey,
  });

  return openai(model);
}

export function getMistralModel(apiKey: string, model: string) {
  const mistral = createMistral({
    apiKey,
  });

  return mistral(model);
}

export function getGoogleModel(apiKey: string, model: string) {
  const google = createGoogleGenerativeAI(apiKey);

  return google(model);
}

export function getGroqModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey,
  });

  return openai(model);
}

export function getOllamaModel(baseURL: string, model: string) {
  let Ollama = ollama(model, {
    numCtx: 32768,
  });

  Ollama.config.baseURL = `${baseURL}/api`;
  return Ollama;
}

export function getDeepseekModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://api.deepseek.com/beta',
    apiKey,
  });

  return openai(model);
}

export function getOpenRouterModel(apiKey: string, model: string) {
  const openRouter = createOpenRouter({
    apiKey,
  });

  return openRouter.chat(model);
}

export function getLMStudioModel(baseURL: string, model: string) {
  const lmstudio = createOpenAI({
    baseUrl: `${baseURL}/v1`,
    apiKey: '',
  });

  return lmstudio(model);
}

export function getXAIModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://api.x.ai/v1',
    apiKey,
  });

  return openai(model);
}

export function getModel(provider: string, model: string, env: Env, apiKeys?: Record<string, string>): ModelInfo {
  const apiKey = getAPIKey(env, provider, apiKeys);
  const baseURL = getBaseURL(env, provider);

  switch (provider) {
    case 'Anthropic':
      return getAnthropicModel(apiKey, model);
    case 'OpenAI':
      return getOpenAIModel(apiKey, model);
    case 'Groq':
      return getGroqModel(apiKey, model);
    case 'OpenRouter':
      return getOpenRouterModel(apiKey, model);
    case 'Google':
      return getGoogleModel(apiKey, model);
    case 'OpenAILike':
      return getOpenAILikeModel(baseURL, apiKey, model);
    case 'Deepseek':
      return getDeepseekModel(apiKey, model);
    case 'Mistral':
      return getMistralModel(apiKey, model);
    case 'LMStudio':
      return getLMStudioModel(baseURL, model);
    case 'xAI':
      return getXAIModel(apiKey, model);
    default:
      return getOllamaModel(baseURL, model);
  }
}

export async function getAnthropicModels(apiKey: string): Promise<ModelInfo[]> {
  const anthropic = createAnthropic({
    apiKey,
  });

  return await anthropic.listModels();
}

export async function getOpenAIModels(apiKey: string): Promise<ModelInfo[]> {
  const openai = createOpenAI({
    apiKey,
  });

  return await openai.listModels();
}

export async function getMistralModels(apiKey: string): Promise<IAModel[]> {
  try {
    const response = await fetch(`https://api.mistral.ai/v1/models`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Erreur HTTP ${response.status}: ${body}`);
    }

    const data = await response.json();

    return data.data.map((model: any) => ({
      id: model.id,
      name: model.id,
      provider: 'Mistral',
    }));
  } catch (error) {
    console.error('Erreur lors de la communication avec Mistral:', error);
    throw new Error('Impossible de récupérer la liste des modèles Mistral. Vérifiez votre configuration.');
  }
}

export async function getGoogleModels(apiKey: string): Promise<ModelInfo[]> {
  const google = createGoogleGenerativeAI(apiKey);

  return await google.listModels();
}

export async function getGroqModels(apiKey: string): Promise<ModelInfo[]> {
  const openai = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey,
  });

  return await openai.listModels();
}

export async function getOllamaModels(baseURL: string): Promise<IAModel[]> {
  try {
    const response = await fetch(`${baseURL}/api/tags`, {
      method: 'GET',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Erreur HTTP ${response.status}: ${body}`);
    }

    const data = await response.json();

    return data.models.map((model: any) => ({
      id: model.name,
      name: model.name,
      provider: 'Ollama',
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des modèles Ollama:', error);
    throw new Error('Impossible de récupérer la liste des modèles Ollama. Vérifiez votre configuration.');
  }
}

export async function getOpenAILikeModels(baseURL: string, apiKey: string): Promise<ModelInfo[]> {
  try {
    const response = await fetch(`${baseURL}/v1/models`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Erreur HTTP ${response.status}: ${body}`);
    }

    const data = await response.json();

    return data.data.map((model: any) => ({
      id: model.id,
      name: model.id,
      provider: 'OpenAILike',
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des modèles OpenAILike:', error);
    throw new Error('Impossible de récupérer la liste des modèles OpenAILike. Vérifiez votre configuration.');
  }
}

export async function getDeepseekModels(apiKey: string): Promise<ModelInfo[]> {
  const openai = createOpenAI({
    baseURL: 'https://api.deepseek.com/beta',
    apiKey,
  });

  return await openai.listModels();
}

export async function getOpenRouterModels(apiKey: string): Promise<IAModel[]> {
  try {
    const response = await fetch(`https://openrouter.ai/api/v1/models`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Erreur HTTP ${response.status}: ${body}`);
    }

    const data = await response.json();

    console.log('OpenRouter models:', data.data[0]);

    return data.data.map((model: any) => ({
      id: model.id,
      name: model.id,
      provider: 'OpenRouter',
    }));
  } catch (error) {
    console.error('Erreur lors de la communication avec OpenRouter:', error);
    throw new Error("Erreur lors de la communication avec l'IA. Vérifiez votre configuration OpenRouter.");
  }
}

export async function getModels(provider: string, env: Env, apiKeys?: Record<string, string>): Promise<ModelInfo[]> {
  const apiKey = getAPIKey(env, provider, apiKeys);
  const baseURL = getBaseURL(env, provider);

  console.log(`Fetching models for provider: ${provider}, baseURL: ${baseURL}, key: ${apiKey}`);

  let models: ModelInfo[] = [];

  switch (provider) {
    case 'Anthropic':
      models = await getAnthropicModels(apiKey);
      break;
    case 'OpenAI':
      models = await getOpenAIModels(apiKey);
      break;
    case 'Groq':
      models = await getGroqModels(apiKey);
      break;
    case 'OpenRouter':
      models = await getOpenRouterModels(apiKey);
      break;
    case 'Google':
      models = await getGoogleModels(apiKey);
      break;
    case 'OpenAILike':
      models = await getOpenAILikeModels(baseURL, apiKey); // Assuming OpenAILike uses the same API as OpenAI
      break;
    case 'Deepseek':
      models = await getDeepseekModels(apiKey);
      break;
    case 'Mistral':
      models = await getMistralModels(apiKey);
      break;
    default:
      models = await getOllamaModels(baseURL);
  }

  console.log(`Fetched models for provider ${provider}:`, models);

  return models;
}
