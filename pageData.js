const baseData = {
  title: "タイトル",
  description: "トップページ",
  url: "https://www.xxxx",
};

const pageData = {
  "/index.html": {
    title: baseData.title + "top",
    description: baseData.description,
    url: baseData.url,
  },
  "/sample/index.html": {
    title: baseData.title + "sample",
    description: baseData.description,
    url: baseData.url,
  },
};

export default pageData;
