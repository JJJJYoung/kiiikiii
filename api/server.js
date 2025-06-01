// express 웹 프레임워크
const express = require('express');
const app = express();

// Vercel KV 사용을 위해 @vercel/kv 라이브러리 import
// 설치: npm install @vercel/kv 또는 yarn add @vercel/kv
const { createClient } = require('@vercel/kv');

// Vercel KV 클라이언트 초기화
// Vercel 대시보드에서 KV 설정 후 제공되는 환경 변수를 사용
const kv = createClient({
  url: process.env.VERCEL_KV_URL,
  token: process.env.VERCEL_KV_REST_TOKEN,
});

// --- Vercel KV를 사용하는 로직 ---

// ESP32에서 움직임 감지 알림을 받을 주소 (/api/motion-detected)
app.get('/api/motion-detected', async (req, res) => {
    console.log('ESP32로부터 움직임 감지 알림을 받았습니다!');
    
    try {
        // Vercel KV에 'motion_status' 키로 'detected' 상태 저장 (60초 만료)
        await kv.set('motion_status', 'detected', { ex: 60 });
        console.log('Vercel KV에 상태 업데이트 완료: detected');
        res.send('Status Updated to Detected in KV');
    } catch (error) {
        console.error('Vercel KV 업데이트 오류:', error);
        res.status(500).send('Error updating status in KV');
    }
});

// 웹페이지에서 현재 상태를 요청할 주소 (/api/get-motion-status)
app.get('/api/get-motion-status', async (req, res) => {
    console.log('웹페이지로부터 상태 요청을 받았습니다.');

    try {
        // Vercel KV에서 'motion_status' 키의 값 읽어오기
        const motionStatus = await kv.get('motion_status');

        // 값이 없거나 만료되었으면 'no_motion'으로 간주
        const currentStatus = motionStatus || 'no_motion'; 
        console.log('Vercel KV에서 읽은 상태:', currentStatus);

        // 현재 상태를 응답으로 보냄
        res.send(currentStatus);
    } catch (error) {
        console.error('Vercel KV 읽기 오류:', error);
        res.status(500).send('Error reading status from KV');
    }
});

// --- Vercel KV 사용 로직 끝 ---

// Express 앱을 Vercel 함수로 내보내기
module.exports = app;
