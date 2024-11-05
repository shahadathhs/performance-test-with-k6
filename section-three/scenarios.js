import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://test.k6.io');

  // const res = http.get('https://test.k6.io/contacts.php');

  // console.log(res.status);
  // check(true, {
  //   'true is true': (value) => value === true
  // })

  // check(false, {
  //   'false is true': (value) => value === true
  // })

  // * Status checks
  check(res, {
    'status is 200': (r) => r.status === 200,
    'page is startPage': (r) => r.body.includes('Collection of simple web-pages')
  });
}