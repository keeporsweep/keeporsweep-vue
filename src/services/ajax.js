// https://codeburst.io/dependency-injection-with-vue-js-f6b44a0dae6d

export default function ajax(url, data = {}) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => response.json());
}
