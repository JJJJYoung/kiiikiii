// api/motion-detected.js
const { createClient } = require('@vercel/kv');

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

 // 이 함수가 Vercel에 의해 /api/motion-detected 경로로 실행될 거야
module.exports = async (req, res) => {
    console.log('ESP32로부터 움직임 감지 알림을 받았습니다!');

    try {
        await kv.set('motion_status', 'detected', { ex: 60 }); // 60초 만료
        console.log('Vercel KV에 상태 업데이트 완료: detected');
         // Vercel 서버리스 함수는 req, res 객체를 받아서 바로 응답을 보내는 방식이야

        // 여기서 res.send 대신 res.json 사용!
        res.status(200).json({ status: 'success', message: 'Status Updated to Detected in KV' });

    } catch (error) {
        console.error('Vercel KV 업데이트 오류:', error);
        // 에러 발생 시에도 JSON으로 응답하는 게 좋아
        res.status(500).json({ status: 'error', message: 'Error updating status in KV', error: error.message });
    }
};