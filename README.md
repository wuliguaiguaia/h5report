h5report
====
# canvas使用
* 概述
  * 首页载入动画
  * 滑动切换页面
  * 九个内容页面  封页  核心理念  课程分布  移动课程 前端课程 后端课程   报名过万 后端课程 难度分布 尾页(点击可回到首页)


* 项目开发文档 
   >> 可行性确认；技术选型；开发/线上环境规划；技术开发设计方案；团队协作方案

* 组件：图文组件 + 图表组件
    >> html+css 柱图-垂直柱图  散点图
    >> canvas 折线图 雷达图 饼图-环图

* 前端开发
  * 设计稿标注 & 切图
    * 标注工具 markman 
  * 编写静态页，验证 fullpage.js 插件页面切换功能
    * 验证利用fullpage.js 事件，实现组件入场出场 动画
  * 开发测试
    * ‘基本图文组件’类 --- H5ComponentBase
    * 目的：实现‘实现入场出场’动画提取
  * 开发测试
    * ‘内容组织’类 --- H5
    * 目的：实现页面与组件的组织功能，方便任意添加 page,component内容

  * 开发各种图标组件
    H5ComponentBar 柱图
    H5ComponentPolyline 折线图
    H5ComponentRadar  雷达图
    H5ComponentPie 饼图
    H5ComponentRing 环图
    loading 功能开发
    功能整合   

* js类规划
  * 内容组织类：H5 》》 addPage addComponent
  * 图文组件类：H5ComponentBase  基本图片文字载入
  * 图表组件类：H5Component??? 》》 除了onleave 和 afterLoad ，还有图表的自身生长
                
* css样式规划
    * H5_page ： 页面
    * H5_Component : 表明一个组件
    * H5_Component_base ：表明某种类型的组件，base,pie,point
       * 用于某类样式的附加 {.}，还包括他们的状态 _load,_leave
    * H5_Component_name_myname : 自定义组件名，用于附加样式，例如                                                               H5_Component_name_caption 

* 图标组件
* 散点图
* 柱图，垂直柱图
* 折线图
* 雷达图
* 饼图，环图
  图表组件数据 ：var data = [];data.push('A项'{项目名称}， .5 {占比例：取值约定}， ‘#fff’{自定义颜色})

## 散点图：   
             a.以第一个为基准
             b.手动设置其他数据的偏移
             c.相对第一个数据进行缩放

## 折线图 ： 
            1>.canvas 画线，填充，简单画圆
            2>.网格绘制、项目文本
            3>.通用 canvas 动画(数据生长)
            4>.填充阴影  （循环之后在画笔停留位置继续绘制 lineTo 最后fill()）
        
        两层：一层是网格背景和x轴项目名称，一层是 圆点与连线 阴影，负责动画
PS:主要是 宽度增加一组，row_w = w/(cfg.data.length+1);


## 饼图 
    1.绘制一段圆弧先填充 
    2.定位数据文本
    三层动画，一层是底层 灰色 ，一个是中间数据层 一个是蒙版负责动画

## 环图,饼图的改造
    1>.数据只有一个


 
