// @ts-nocheck
// Preventing TS checks with files presented in the video for a better presentation.
import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getModel } from '~/lib/.server/llm/model';
import { MAX_TOKENS } from './constants';
import { getSystemPrompt } from './prompts';
import { MODEL_LIST, DEFAULT_MODEL, DEFAULT_PROVIDER } from '~/utils/constants';
import type { ModelInfo } from '~/utils/types';

interface ToolResult<Name extends string, Args, Result> {
  toolCallId: string;
  toolName: Name;
  args: Args;
  result: Result;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolResult<string, unknown, unknown>[];
  model?: string;
}

export type Messages = Message[];

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model'>;

// function extractModelFromMessage(message: Message): { model: string; content: string } {
//   const modelRegex = /^\[Model: (.*?)\]\n\n/;
//   const match = message.content.match(modelRegex);

//   if (match) {
//     const model = match[1];
//     const content = message.content.replace(modelRegex, '');
//     return { model, content };
//   }

//   // Default model if not specified
//   return { model: DEFAULT_MODEL, content: message.content };
// }

export function streamText(
  model: ModelInfo,
  messages: Messages,
  env: Env,
  options?: StreamingOptions,
  apiKeys?: Record<string, string>,
) {
  // const processedMessages = messages.map((message) => {
  //   if (message.role === 'user') {
  //     const { model, content } = extractModelFromMessage(message);
  //     // if (model && MODEL_LIST.find((m) => m.name === model)) {
  //     //   currentModel = model; // Update the current model
  //     // }
  //     return { ...message, content };
  //   }
  //   return message;
  // });

  // const provider = MODEL_LIST.find((model) => model.name === currentModel)?.provider || DEFAULT_PROVIDER;

  return _streamText({
    model: getModel(model.provider, model.name, env, apiKeys),
    system: getSystemPrompt(),
    maxTokens: MAX_TOKENS,
    messages: convertToCoreMessages(messages),
    ...options,
  });
}
