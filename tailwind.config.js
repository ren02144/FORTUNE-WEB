/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",   // 扫描 pages 文件夹下所有文件
    "./components/**/*.{js,ts,jsx,tsx}" // 扫描 components 文件夹下所有文件
  ],
  theme: {
    extend: {}  // 可在此处扩展定制主题
  },
  plugins: []   // 可根据需要添加 Tailwind 插件
};

