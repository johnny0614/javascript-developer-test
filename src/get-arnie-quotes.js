const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await httpGet(url);
        const { status, body } = response;
        const parsed = JSON.parse(body);
        const message = parsed && parsed.message;

        if (status === 200) {
          return { 'Arnie Quote': message };
        }

        return { FAILURE: message };
      } catch (err) {
        return { FAILURE: (err && err.message) || 'Unknown error' };
      }
    })
  );

  return results;
};

module.exports = {
  getArnieQuotes,
};
