interface EnvConfig {
  storefrontUrl: string;
  apiUrl: string;
  apiKey: string;
}

interface Config {
  development: EnvConfig;
  production: EnvConfig;
}

// Ensure URLs are properly formatted with protocol
const formatUrl = (url: string): string => {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
};

// Never expose API keys or sensitive URLs directly in code
export const config: Config = {
  development: {
    storefrontUrl: formatUrl(import.meta.env.VITE_STOREFRONT_URL || 'localhost:5174'),
    apiUrl: formatUrl(import.meta.env.VITE_API_URL || 'localhost:3000'),
    apiKey: import.meta.env.VITE_API_KEY || ''  // Remove default value for security
  },
  production: {
    storefrontUrl: formatUrl(import.meta.env.VITE_STOREFRONT_URL),
    apiUrl: formatUrl(import.meta.env.VITE_API_URL),
    apiKey: import.meta.env.VITE_API_KEY
  }
};

export const getCurrentConfig = (): EnvConfig => {
  const mode = (import.meta.env.MODE || 'development') as keyof Config;
  const currentConfig = config[mode];

  // Validate required environment variables
  if (!currentConfig.apiKey) {
    console.error('Missing required API key configuration');
  }

  if (!currentConfig.storefrontUrl || !currentConfig.apiUrl) {
    console.error('Missing required URL configuration');
  }

  return currentConfig;
};
