const baseData = {
  title: "タイトル",
  description: "トップページ",
};

const pageData = {
  "/index.html": {
    title: baseData.title + "top",
    description: baseData.description,
  },
  "/sample/index.html": {
    title: baseData.title + "sample",
    description: baseData.description,
  },
};

export default pageData;
