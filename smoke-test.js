import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '30s'
}

export default function () {
  http.get('https://test.k6.io');
  // http.get('https://test.k6.local');
  sleep(1);
  http.get('https://test.k6.io/contacts.php');
  // http.get('https://test.k6.io/contact.php');
  sleep(2);
  http.get('https://test.k6.io/news.php');
  sleep(2);
}