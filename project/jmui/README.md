## jmui

`已停止维护更新`

JMUI是一款由UDC开发的移动端框架。
目标：代码简单、易用、齐全，处理部分移动端bug，涵盖机型广，大大减少开发交互型组件的工作量。

## 目录结构

### css文件夹

```javascript
- css/
	- 1.0.0/		存放定制版本的jm.css
	- common/		存放公用样式，包含变量样式和基础样式
	- components/	存放组件样式
	- fonts/		存放字体文件
	- img/			存放背景图
```

### data文件夹

```javascript
- data/			存放模拟数据
```

### demo文件夹

```javascript
- demo/			存放demo实例
```

### dist文件夹

```javascript
- dist/			存放对外发布文件
```

### doc文件夹

```javascript
- doc/			存放js和css代码规范
```

### images文件夹

```javascript
- images/			存放图片
```

### js文件夹

```javascript
- js/
	- dist/			存放运行sea之后的js
	- lib/			存放依赖，目前是sea.js
	- main/			存放模块引用实例js
	- modules/		存放独立js模块
	- config.js     seajs配置文件
```

### 版本管理

版本格式：主版本号.次版本号.修订号，版本号递增规则：

主版本号：整体改版

次版本号：功能性新增，bug修复

修订号：bug或新功能的调试版本，只作为开发版本，不做正式发布

当前版本在第一个使用的业务发布后不再修改，新增版本会新增一个离线包。

业务上使用时升级版本需要通知到开发，以及是否有dom修改，会不会影响到js

维护

### more

Npm安装:

屏幕适配： jm中已引_rem.scss

iconfont使用： jm中已引入_iconfont.scss

### License

MIT License