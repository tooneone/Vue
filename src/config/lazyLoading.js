// nodejs require 根据模块路径导入 webpack需要预编译，无法在动态路径中找到模块 `${templatePath}` 不起作用
export const generateComponentFunction = (path) => resolve => require([`@/template/page/${path}`], resolve)
