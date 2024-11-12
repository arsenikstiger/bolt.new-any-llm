// Preventing TS checks with files presented in the video for a better presentation.
import { getModels } from '~/lib/.server/llm/model';
import { type ActionFunctionArgs } from '@remix-run/cloudflare';

export async function action(args: ActionFunctionArgs) {
  return modelsAction(args);
}

async function modelsAction({ context, request }: ActionFunctionArgs) {
  const { provider, apiKeys } = await request.json<{
    provider: string;
    apiKeys: Record<string, string>;
  }>();

  if (!provider || !context.cloudflare.env) {
    throw new Response('Provider and environment are required', { status: 400 });
  }

  try {
    const models = await getModels(provider, context.cloudflare.env, apiKeys);
    return new Response(JSON.stringify(models), { status: 200 });
  } catch (error) {
    return new Response(`Error fetching models: ${error}`, { status: 500 });
  }
}
