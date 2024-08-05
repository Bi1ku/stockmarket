export const enhancedFetch = async (url: string, options: RequestInit) => {
  try {
    return await (await fetch(url, options)).json();
  } catch (e) {
    // notification
    console.error(e);
  }
};
