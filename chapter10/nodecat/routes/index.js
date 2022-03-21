const express = require("express");
const axios = require("axios");

const router = express.Router();
const URL = "http://localhost:8002/v1";
axios.defaults.headers.origin = "http://localhost:4000";

const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      // 세션에 토큰이 없으면
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = token.data.token;
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    });
  } catch (error) {
    if (error.response.status === 419) {
      // 토큰 만료 시 토큰 재발급 받기
      delete req.session.jwt;
      return request(req, api);
    }
    return error.response;
  }
};

router.get("/test", async (req, res, next) => {
  // 토큰 테스트 라우터
  try {
    if (!req.session.jwt) {
      // 세션에 토큰이 없으면 토큰 발급 시도
      const tokenResult = await axios.post("http://localhost:8002/v1/token", {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data && tokenResult.data.code === 200) {
        // 토큰 발급 성공
        req.session.jwt = tokenResult.data.token;
      } else {
        return res.json(tokenResult.data); // 발급 실패 사유 응답
      }
    }
    // 발급 받은 토큰 테스트
    const result = await axios.get("http://localhost:8002/v1/test", {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response.status === 419) {
      return res.json(error.response.data);
    }
    return next(error);
  }
});

router.get("/mypost", async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my");
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
