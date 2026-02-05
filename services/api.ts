export const saveCV = async (cvData: string) => {
  await fetch('http://localhost:3000/save-cv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: cvData }),
  });
};