/*
  文件名称：js/zyx1029_tab.js
  作者：赵雨欣
  建立时间：2026-11-02 13:40:56
  使用模型：GLM-5.3-Flash
  功能名称及简介：可复用选项卡（Tab）组件 —— 任意页面引入本文件后，
                  调用 zyx1029_initTabs(容器选择器) 即可为该容器内的
                  选项卡绑定点击切换逻辑，无需重复编写代码。
*/

/*
  ===================== 知识点：DOM 查找方式（课堂笔记） =====================
  1. 通过 ID 查找：getElementById()，返回匹配指定 id 的单个元素
  2. 通过类名查找：getElementsByClassName()，返回所有匹配类名的元素集合
  3. 通过标签名查找：getElementsByTagName()，返回所有匹配标签名的元素集合
  4. 通过选择器查找：querySelector()，返回第一个匹配的元素
  5. 通过选择器查找：querySelectorAll()，返回所有匹配的元素节点列表

  本文件中的应用：zyx1029_initTabs 使用第 4 种（querySelector 找容器）
  与第 5 种（querySelectorAll 找全部选项卡按钮和内容面板）。

  对应的清除选中状态函数课堂示例（wy_ 前缀版本，与本项目
  zyx1029_clearActive 逻辑一致）：

  // wy_clearActive：清除所有选项卡按钮和内容面板的选中状态（移除 wy_active 类）
  function wy_clearActive(buttons, panels) {
    buttons.forEach(function (btn) {
      btn.classList.remove("wy_active");
    });
    panels.forEach(function (panel) {
      panel.classList.remove("wy_active");
    });
  }
  ==========================================================================
*/

/*
  功能名称及简介：zyx1029_initTabs —— 可复用选项卡初始化函数。
  使用 addEventListener 为容器内每个选项卡按钮注册"点击"事件监听；
  点击时先清除所有选项卡的选中状态，再为当前选项卡与对应内容面板添加选中类。
  参数：containerSelector —— 选项卡容器的 CSS 选择器（字符串）。
  约定：选项卡按钮需带 class "zyx1029_tab-item"，并通过 data-tab 属性
        指向对应内容面板的 id；内容面板统一使用 class "zyx1029_tab-panel"。
  作者：赵雨欣  建立时间：2026-11-02  使用模型：GLM-5.3-Flash
*/
function zyx1029_initTabs(containerSelector) {
  // 获取选项卡容器，未找到则直接返回，保证函数在其他页面复用时不出错
  var zyx1029_container = document.querySelector(containerSelector);
  if (!zyx1029_container) {
    return;
  }
  // 获取容器内全部选项卡按钮与页面中全部内容面板
  var zyx1029_tabs = zyx1029_container.querySelectorAll(".zyx1029_tab-item");
  var zyx1029_panels = document.querySelectorAll(".zyx1029_tab-panel");

  // 遍历选项卡按钮，为每个按钮注册点击事件监听
  zyx1029_tabs.forEach(function (zyx1029_tab) {
    zyx1029_tab.addEventListener("click", function () {
      // 第一步：清除所有选项卡的选中状态（包括其他按钮与面板）
      zyx1029_clearActive(zyx1029_tabs, zyx1029_panels);
      // 第二步：为当前点击的选项卡添加选中状态
      this.classList.add("zyx1029_active");
      // 第三步：根据 data-tab 属性找到对应内容面板并显示
      var zyx1029_target = document.getElementById(this.getAttribute("data-tab"));
      if (zyx1029_target) {
        zyx1029_target.classList.add("zyx1029_active");
      }
    });
  });
}

/*
  功能名称及简介：zyx1029_clearActive —— 清除所有选项卡的选中状态。
  移除全部选项卡按钮的 zyx1029_active 类（取消选中高亮），
  同时隐藏全部内容面板，是切换选项卡前的"重置"步骤。
  参数：tabs —— 选项卡按钮集合；panels —— 内容面板集合。
  作者：赵雨欣  建立时间：2026-11-02  使用模型：GLM-5.3-Flash
*/
function zyx1029_clearActive(zyx1029_tabs, zyx1029_panels) {
  // 清除所有选项卡按钮的选中状态
  zyx1029_tabs.forEach(function (zyx1029_tab) {
    zyx1029_tab.classList.remove("zyx1029_active");
  });
  // 隐藏所有内容面板
  zyx1029_panels.forEach(function (zyx1029_panel) {
    zyx1029_panel.classList.remove("zyx1029_active");
  });
}
