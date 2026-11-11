exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  let password = "";
  try {
    password = JSON.parse(event.body || "{}").password || "";
  } catch (e) {}

  const ok = Boolean(password) && password === process.env.SITE_PASSWORD;
  return {
    statusCode: ok ? 200 : 401,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok }),
  };
};
