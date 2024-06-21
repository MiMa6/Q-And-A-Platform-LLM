# Performance testing - k6

## Instructions

1. Start applicaiton with development configurations

```bash
docker compose up
```

2. Run k6 commands in root directory

## Testing

### Get Courses

     execution: local
        script: k6/performance-test-get-courses.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 15 MB  1.4 MB/s
     data_sent......................: 1.5 MB 146 kB/s
     http_req_blocked...............: avg=2.49µs  min=0s     med=1µs    max=921µs   p(90)=2µs    p(95)=3µs
     http_req_connecting............: avg=500ns   min=0s     med=0s     max=508µs   p(90)=0s     p(95)=0s
     http_req_duration..............: avg=6.37ms  min=1.89ms med=5.24ms max=25.22ms p(90)=9.48ms p(95)=17.29ms
       { expected_response:true }...: avg=6.37ms  min=1.89ms med=5.24ms max=25.22ms p(90)=9.48ms p(95)=17.29ms
     http_req_failed................: 0.00%  ✓ 0           ✗ 15562
     http_req_receiving.............: avg=29.58µs min=5µs    med=18µs   max=5.49ms  p(90)=51µs   p(95)=72µs
     http_req_sending...............: avg=8.81µs  min=1µs    med=5µs    max=6.82ms  p(90)=10µs   p(95)=14µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s     max=0s      p(90)=0s     p(95)=0s
     http_req_waiting...............: avg=6.33ms  min=1.86ms med=5.2ms  max=25.12ms p(90)=9.41ms p(95)=17.25ms
     http_reqs......................: 15562  1555.772163/s
     iteration_duration.............: avg=6.41ms  min=1.92ms med=5.28ms max=26.04ms p(90)=9.51ms p(95)=17.33ms
     iterations.....................: 15562  1555.772163/s
     vus............................: 10     min=10        max=10
     vus_max........................: 10     min=10        max=10

### Get quesitons

```bash
k6 run k6/performance-test-get-questions.js
```

        script: k6/performance-test-get-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 6.0 MB 576 kB/s
     data_sent......................: 22 kB  2.1 kB/s
     http_req_blocked...............: avg=40.24µs  min=0s       med=3µs      max=956µs    p(90)=5µs      p(95)=6.79µs
     http_req_connecting............: avg=19.32µs  min=0s       med=0s       max=529µs    p(90)=0s       p(95)=0s
     http_req_duration..............: avg=417.59ms min=172.5ms  med=419.36ms max=547.18ms p(90)=441.45ms p(95)=451.76ms
       { expected_response:true }...: avg=417.59ms min=172.5ms  med=419.36ms max=547.18ms p(90)=441.45ms p(95)=451.76ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 245
     http_req_receiving.............: avg=139.45µs min=29µs     med=111µs    max=845µs    p(90)=274µs    p(95)=399.99µs
     http_req_sending...............: avg=33.12µs  min=3µs      med=15µs     max=4.17ms   p(90)=21.6µs   p(95)=34.79µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=417.42ms min=172.32ms med=419.15ms max=547.05ms p(90)=441.36ms p(95)=451.6ms
     http_reqs......................: 245    23.558644/s
     iteration_duration.............: avg=417.76ms min=173.61ms med=419.67ms max=548.18ms p(90)=441.78ms p(95)=452.08ms
     iterations.....................: 245    23.558644/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10

### Get answers

```bash
k6 run k6/performance-test-get-answers.js
```

     execution: local
        script: k6/performance-test-get-answers.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 6.0 MB 582 kB/s
     data_sent......................: 23 kB  2.2 kB/s
     http_req_blocked...............: avg=37.31µs  min=0s       med=3µs      max=908µs    p(90)=6µs      p(95)=7.69µs
     http_req_connecting............: avg=16.65µs  min=0s       med=0s       max=437µs    p(90)=0s       p(95)=0s
     http_req_duration..............: avg=413.04ms min=233.44ms med=416.36ms max=510.44ms p(90)=433.65ms p(95)=435.95ms
       { expected_response:true }...: avg=413.04ms min=233.44ms med=416.36ms max=510.44ms p(90)=433.65ms p(95)=435.95ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 247
     http_req_receiving.............: avg=196.27µs min=18µs     med=90µs     max=14.84ms  p(90)=260.4µs  p(95)=347.49µs
     http_req_sending...............: avg=29.7µs   min=3µs      med=14µs     max=3.42ms   p(90)=24µs     p(95)=27µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=412.81ms min=233.34ms med=416.27ms max=510.38ms p(90)=432.78ms p(95)=435.79ms
     http_reqs......................: 247    23.799109/s
     iteration_duration.............: avg=413.16ms min=234.5ms  med=416.45ms max=511.35ms p(90)=433.73ms p(95)=436.12ms
     iterations.....................: 247    23.799109/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10

### Add question

     execution: local
        script: k6/performance-test-add-question.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 2.8 MB 277 kB/s
     data_sent......................: 2.3 MB 231 kB/s
     http_req_blocked...............: avg=2.99µs   min=0s       med=1µs      max=1ms      p(90)=3µs      p(95)=3µs
     http_req_connecting............: avg=584ns    min=0s       med=0s       max=560µs    p(90)=0s       p(95)=0s
     http_req_duration..............: avg=7.9ms    min=2.14ms   med=6.33ms   max=465.49ms p(90)=12.14ms  p(95)=18.25ms
       { expected_response:true }...: avg=268.98ms min=268.98ms med=268.98ms max=268.98ms p(90)=268.98ms p(95)=268.98ms
     http_req_failed................: 99.99% ✓ 12538       ✗ 1
     http_req_receiving.............: avg=34.35µs  min=4µs      med=21µs     max=4.65ms   p(90)=59µs     p(95)=82µs
     http_req_sending...............: avg=13.82µs  min=1µs      med=7µs      max=18.19ms  p(90)=15µs     p(95)=24µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=7.85ms   min=2.1ms    med=6.29ms   max=465.44ms p(90)=12.1ms   p(95)=18.18ms
     http_reqs......................: 12539  1253.377342/s
     iteration_duration.............: avg=7.96ms   min=2.19ms   med=6.39ms   max=466.61ms p(90)=12.22ms  p(95)=18.3ms
     iterations.....................: 12539  1253.377342/s
     vus............................: 10     min=10        max=10
     vus_max........................: 10     min=10        max=10

### Del question

     execution: local
        script: k6/performance-test-del-question.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 3.2 MB 323 kB/s
     data_sent......................: 2.5 MB 254 kB/s
     http_req_blocked...............: avg=2.93µs  min=0s     med=1µs    max=3ms     p(90)=2µs     p(95)=3µs
     http_req_connecting............: avg=772ns   min=0s     med=0s     max=2.21ms  p(90)=0s      p(95)=0s
     http_req_duration..............: avg=7.3ms   min=2.07ms med=6.1ms  max=30.07ms p(90)=11.25ms p(95)=18.38ms
       { expected_response:true }...: avg=7.3ms   min=2.07ms med=6.1ms  max=30.07ms p(90)=11.25ms p(95)=18.38ms
     http_req_failed................: 0.00%  ✓ 0           ✗ 13568
     http_req_receiving.............: avg=29.04µs min=4µs    med=18µs   max=3.97ms  p(90)=50µs    p(95)=69µs
     http_req_sending...............: avg=10.51µs min=2µs    med=6µs    max=5.85ms  p(90)=14µs    p(95)=19µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s     max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=7.27ms  min=2.02ms med=6.07ms max=30.06ms p(90)=11.2ms  p(95)=18.35ms
     http_reqs......................: 13568  1356.156233/s
     iteration_duration.............: avg=7.36ms  min=2.14ms med=6.15ms max=30.12ms p(90)=11.32ms p(95)=18.42ms
     iterations.....................: 13568  1356.156233/s
     vus............................: 10     min=10        max=10
     vus_max........................: 10     min=10        max=10

## Summary and Analysis of the results

The performance test results show taht Get requests to courses, questions and answer endpoints perform well and. The requests were sccesfully completed and had reasonable response times. The Add Question endpoint failed all but 1 requestion as there is restriction that allows only 1 questions posted in 1 minute per user_uuid. 

### Get Courses:
The average duration of each HTTP request was 6.37ms, with a maximum duration of 25.22ms.
The test successfully received responses for all 15562 requests without any failures.

### Get Questions:
The average duration of each HTTP request was 417.59ms, with a maximum duration of 547.18ms.
Similarly, all 245 requests were successful without any failures.

### Get Answers:
The average duration of each HTTP request was 413.04ms, with a maximum duration of 510.44ms.
All 247 requests were successful without any failures.

### Add Question:
The average duration of each HTTP request was 7.9ms, with a maximum duration of 465.49ms.
However, most of the requests (all but 1) failed.

### Del Question
The average duration of each HTTP request was 7.3ms, with a maximum duration of 30.07ms.
The test successfully received responses for all 13568 requests without any failures.

