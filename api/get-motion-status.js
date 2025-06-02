// api/get-motion-status.js
const { createClient } = require('@vercel/kv');

const kv = createClient({
  url: process.env.VERCEL_KV_URL,
  token: process.env.VERCEL_KV_REST_TOKEN,
});

// 이 함수가 Vercel에 의해 /api/get-motion-status 경로로 실행될 거야
module.exports = async (req, res) => {
  console.log('웹페이지로부터 상태 요청을 받았습니다.');

  try {
      const motionStatus = await kv.get('motion_status');
      const currentStatus = motionStatus || 'no_motion';
      console.log('Vercel KV에서 읽은 상태:', currentStatus);
      // Vercel 서버리스 함수는 req, res 객체를 받아서 바로 응답을 보내는 방식이야
      res.status(200).send(currentStatus);
  } catch (error) {
      console.error('Vercel KV 읽기 오류:', error);
      res.status(500).send('Error reading status from KV');
  }
};
