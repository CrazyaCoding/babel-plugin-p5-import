'use strict';
// 单词首字母小写
var _require = require('path'),
	join = _require.join;

var toLowerCase = function toLowerCase(word) {
	return Array.from(word).map(function (char, index) {
		return !index ? char.toLowerCase() : char;
	}).join('');
};
module.exports = function (babel) {
	var types = babel.types;
	return {
		visitor: {
				/**
				 * 更改引入路径
				 * @param {Object} path
				 * @param {Object} ref
				 * ImportDeclaration的第二个参数，
				 * 这里的值是.babelrc中的{
				 *      libraryName:'@58fe/v5',
				 *      libraryDirectory:'src/components',
				 *      pluginNameRegExp:/^(.+)Plugin$/,
				 *      libraryPluginDirectory:'src/plugins'
				 * },
				 * 这里是指定我们在引用哪个库的时候使用这个插件
				 */
			ImportDeclaration: function ImportDeclaration(path, { opts = {} }) {
				
				var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var opts = ref.opts;
				var node = path.node;
				var specifiers = node.specifiers;

				var libraryName = opts.libraryName || '@58fe/p5';
				var libraryDirectory = opts.libraryDirectory || 'library/components';
				var pluginNameRegExp = opts.pluginNameRegExp || /^(.+)Plugin$/;
				var libraryPluginDirectory = opts.libraryPluginDirectory || 'library/plugin';

				// 过滤掉默认引用，如 import antd from 'antd'
				var importSpecifiers = specifiers.filter(function (specifier) {
					return types.isImportSpecifier(specifier);
				});

				if (libraryName == node.source.value) {
					var newImport = importSpecifiers.map(function (specifier) {
						// 判断是否是导入的插件还是组件
						if (pluginNameRegExp.test(specifier.local.name)) {
							return types.importDeclaration([types.ImportDefaultSpecifier(specifier.local)], types.stringLiteral(join(libraryName, libraryPluginDirectory, toLowerCase(specifier.local.name.match(pluginNameRegExp)[1]))));
						} else {
							return types.importDeclaration([types.ImportDefaultSpecifier(specifier.local)], types.stringLiteral(join(libraryName, libraryDirectory, toLowerCase(specifier.local.name))));
						}
					});
					path.replaceWithMultiple(newImport);
				}
			}
		}
	};
};
