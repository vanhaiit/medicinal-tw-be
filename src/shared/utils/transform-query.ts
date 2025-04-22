export const transformQuery = (s: string) =>
    s
        ?.trim()
        ?.toLowerCase()
        ?.replace(/['%]/g, (value: string) => `\\${value}`);
