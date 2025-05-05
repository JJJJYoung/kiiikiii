// 필요한 모듈 가져오기
const express = require('express'); // express 웹 프레임워크
const app = express(); // express 애플리케이션 생성
const port = 3000; // 서버가 사용할 포트 번호 (예: 3000)

// --- 여기서부터 네 프로젝트 관련 변수나 로직 ---
let motionDetectedStatus = 'no_motion'; // 움직임 감지 상태 저장 변수 (초기값: 움직임 없음)

// ESP32에서 움직임 감지 알림을 받을 주소 (예: /motion-detected)
// ESP32 코드는 이 주소로 HTTP GET 또는 POST 요청을 보낼 거야.
app.get('/motion-detected', (req, res) => {
    console.log('ESP32로부터 움직임 감지 알림을 받았습니다!');
    motionDetectedStatus = 'detected'; // 상태를 'detected'로 업데이트

    // ESP32에게 응답 (선택 사항)
    res.send('Status Updated to Detected');
});

// 웹페이지에서 현재 상태를 요청할 주소 (예: /get-motion-status)
// 네 웹페이지의 JavaScript 코드는 이 주소로 HTTP GET 요청을 보낼 거야.
app.get('/get-motion-status', (req, res) => {
    console.log('웹페이지로부터 상태 요청을 받았습니다.');

    // 현재 상태를 응답으로 보냄
    res.send(motionDetectedStatus); // 'detected' 또는 'no_motion' 문자열을 응답
});

// --- 여기까지 네 프로젝트 관련 로직 ---

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
    console.log(`ESP32 알림 주소: http://localhost:${port}/motion-detected`);
    console.log(`웹페이지 상태 확인 주소: http://localhost:${port}/get-motion-status`);
});
