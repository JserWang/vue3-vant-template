# 字体生成脚本

## 使用方法

将`iconfont`中下载的文件将其解压，文件夹为`font_xxxxx`，将文件夹中的所有文件放置`public/font`中，执行`yarn font`即可。

## 脚本背后做了什么

会读取`iconfont.json`中的内容生成 md5，作为本次执行的 iconfont version，来保证当 icon 实际发生变化时，才会有所谓的新版本。

## 为什么需要版本号

保证当修改图标后，`iconfont.css`不被浏览器缓存。
