import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<500"],
    // http_req_duration: ["p(95)<500", "max<1000"],
    http_req_failed: ["rate<=0.02"],
    // http_reqs: ['count>20', 'rate>5'],
    // vus: ['value>9']
    checks: ["rate>=0.98"],
  },
};

export default function () {
  const res = http.get(
    `https://test.k6.io${exec.scenario.iterationInTest === 1 ? "/foo" : ""}`
  );
  console.log(exec.scenario.iterationInTest);

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
    "status is 200": (r) => r.status === 200,
    "page is startPage": (r) =>
      r.body.includes("Collection of simple web-pages"),
  });
  sleep(2);
}
