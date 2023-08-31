export const fileNameImage = (name: string, mimeType: string) => {
  return `steradian-${name}.${mimeType.split("/").at(1)}`.replace(/\s/g, "");
};
