
export async function fetchSongs(term) {
  const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song`);
  if (!response.ok) {
    throw new Error("Error al buscar canciones");
  }
  return response.json();
}

