# bable-plugin-p5-import
p5组件库的按需引入插件

## 安装
```
npm i @58fe/babel-plugin-p5-import -D
```
## 使用
在 **.babelrc** 中配置该插件
```javascript
{
    ...
    plugins:["@58fe/babel-plugin-p5-import", opts]
}
```
其中opts可以是一个对象 ，配置例子如下：
```
{
	libraryName:'@58fe/p5',
	libraryDirectory:'library/components',
	pluginNameRegExp:/^(.+)Plugin$/,
	libraryPluginDirectory:'library/plugin'
}
```