// api/get-motion-status.js
const { createClient } = require('@vercel/kv');

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// 이 함수가 Vercel에 의해 /api/get-motion-status 경로로 실행될 거야
module.exports = async (req, res) => {
  console.log('웹페이지로부터 상태 요청을 받았습니다.');

  try {
      const motionStatus = await kv.get('motion_status');
      const currentStatus = motionStatus || 'no_motion';
      console.log('Vercel KV에서 읽은 상태:', currentStatus);
      // Vercel 서버리스 함수는 req, res 객체를 받아서 바로 응답을 보내는 방식이야

      // 여기서 res.send 대신 res.json 사용! 응답을 JSON 객체에 담아 보내자!
      res.status(200).json({ status: currentStatus });

  } catch (error) {
      console.error('Vercel KV 읽기 오류:', error);
      // 에러 발생 시에도 JSON으로 응답하는 게 좋아
      res.status(500).json({ status: 'error', message: 'Error reading status from KV', error: error.message });
  }
};
