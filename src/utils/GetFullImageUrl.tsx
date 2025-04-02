export const getFullImageUrl = (relativePath: string): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("Base URL is not defined in the environment variables.");
  }
  return `${baseUrl}/api/v1/uploads/${relativePath}`;
};