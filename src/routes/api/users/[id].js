import { getRequestEvent } from "solid-js/web"

const getEnv = () => {
  const event = getRequestEvent()
  // fallback to process.env for local development
  const env = event?.nativeEvent?.context?.cloudflare?.env ?? process.env
  return env
}


export async function GET(event) {
  const env = getEnv();
  const eventUrl = new URL(event.request.url);
  const id = event.params?.id ?? 1

  const url = 'https://jsonplaceholder.typicode.com/users/' + id;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };

  const res = await fetch(url, options);
  const json = await res.json();

  return json
}
