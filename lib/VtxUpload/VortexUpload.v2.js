'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

require('antd/lib/upload/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

require('antd/lib/button/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

require('antd/lib/icon/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

require('antd/lib/modal/style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 默认上传文件接口
var defaultUploadURL = 'http://192.168.1.207:18084/cloudFile/common/uploadFile';
// 默认下载文件地址，与ID挂钩
var defaultDownloadURL = 'http://192.168.1.207:18084/cloudFile/common/downloadFile?id=';
// 默认nginx代理地址，兼容IE10以下的跨域情况
var proxyUploadURL = 'http://' + document.location.host + '/uploadFilesProxy/';

var VortexUpload = function (_React$Component) {
    _inherits(VortexUpload, _React$Component);

    function VortexUpload(props) {
        _classCallCheck(this, VortexUpload);

        var _this = _possibleConstructorReturn(this, (VortexUpload.__proto__ || Object.getPrototypeOf(VortexUpload)).call(this, props));

        var t = _this;
        // 初始化上传下载的地址
        _this.uploadURL = props.action || defaultUploadURL;
        _this.downLoadURL = props.downLoadURL || defaultDownloadURL;
        // 可在外部配置的属性，具体文档参考AntUI
        _this.configurableProperty = ['data', 'showUploadList', 'multiple', 'accept', 'listType', 'disabled', 'withCredentials', 'beforeUpload'];

        _this.state = {
            previewVisible: false,
            previewImage: '',
            previewName: '',
            fileList: _this.getSynFileList()
        };
        return _this;
    }

    _createClass(VortexUpload, [{
        key: 'getConfig',
        value: function getConfig() {
            var t = this;
            var props = this.props;
            // 重置上传下载的地址
            t.uploadURL = props.action || defaultUploadURL;
            t.downLoadURL = props.downLoadURL || defaultDownloadURL;
            var config = {
                action: t.uploadURL,
                fileList: t.state.fileList,
                onChange: function onChange(info) {
                    // 此处根据后台返回的数据结构取得文件ID             
                    var vtxId = info.file.response ? info.file.response.data[0].id : undefined;
                    var newFileList = info.fileList;
                    var newFile = vtxId ? _extends({}, info.file, {
                        id: vtxId,
                        url: t.downLoadURL + vtxId
                    }) : _extends({}, info.file);

                    if (info.file.status === 'done' && vtxId) {
                        newFileList = info.fileList.map(function (item) {
                            if (item.uid == info.file.uid) {
                                return _extends({}, item, {
                                    id: vtxId,
                                    url: t.downLoadURL + vtxId
                                });
                            }
                            return item;
                        });
                    }
                    // 更新组件状态
                    if (props.mode == 'single' && info.file.status === 'done') {
                        t.setState({ fileList: [newFile] });
                    } else {
                        t.setState({ fileList: newFileList });
                    }
                    // 触发外部方法
                    if (info.file.status === 'done') {
                        if (typeof props.onSuccess == 'function') {
                            props.onSuccess(newFile);
                        }
                    } else if (info.file.status === 'error') {
                        if (typeof props.onError == "function") {
                            props.onError(info.file);
                        }
                    }
                },
                onRemove: function onRemove(file) {
                    if (typeof props.onRemove == "function") {
                        return props.onRemove(file);
                    }
                }
            };

            // 判断浏览器是否<IE10, IE10以下需用代理跨域上传文件，其他使用CORS进行跨域上传文件
            // let matchRes = navigator.userAgent.match(/MSIE (\d+)/);
            // if(matchRes && matchRes[1]<10){
            //判断是否IE
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                config.action = proxyUploadURL;
            }

            // 继承相关配置
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = t.configurableProperty[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var p = _step.value;

                    if (props[p] !== undefined) {
                        config[p] = props[p];
                    }
                }
                // viewMode
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (props.viewMode && props.showUploadList !== false) {
                config.showUploadList = { showRemoveIcon: false };
            }
            if (props.listType == 'picture-card') {
                config.onPreview = t.handlePreview.bind(t);
                // if(typeof(config.showUploadList)=='object'){
                //     config.showUploadList.showPreviewIcon = false;
                // }
                // else{
                //     config.showUploadList = { showPreviewIcon: false }
                // }
            }

            return config;
        }
    }, {
        key: 'getSynFileList',
        value: function getSynFileList(props) {
            var t = this;
            props = props || this.props;
            var processedFileList = props.fileList || [];
            // 单文件模式只取第一个
            if (props.mode == 'single' && processedFileList.length > 1) {
                processedFileList = [processedFileList[0]];
            }
            processedFileList = processedFileList.map(function (item, index) {
                // 将外部传入的简易文件数组处理成为组件需要的数组结构
                if (item.name === undefined || item.id === undefined) {
                    console.error('文件列表的name和id属性不能为空');
                }
                var itemURL = item.url || t.downLoadURL + item.id;
                return _extends({}, item, {
                    uid: -1 - index,
                    status: 'done',
                    url: itemURL,
                    thumbUrl: itemURL
                });
            });
            return processedFileList;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.fileListVersion != nextProps.fileListVersion) {
                this.setState({
                    fileList: this.getSynFileList(nextProps)
                });
            }
        }
    }, {
        key: 'handlePreview',
        value: function handlePreview(file) {
            this.setState({
                previewImage: file.url || file.thumbUrl,
                previewName: file.name,
                previewVisible: true
            });
        }
    }, {
        key: 'handleCancel',
        value: function handleCancel() {
            this.setState({ previewVisible: false });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _upload2.default,
                    this.getConfig(),
                    this.props.viewMode ? null : this.props.customizedButton || (this.props.listType == 'picture-card' ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_icon2.default, { type: 'plus', style: { fontSize: '28px', color: '#999' } }),
                        _react2.default.createElement(
                            'div',
                            { className: 'ant-upload-text' },
                            '\u4E0A\u4F20'
                        )
                    ) : _react2.default.createElement(
                        _button2.default,
                        null,
                        _react2.default.createElement(_icon2.default, { type: 'upload' }),
                        '\u4E0A\u4F20'
                    ))
                ),
                this.props.listType == 'picture-card' ? _react2.default.createElement(
                    _modal2.default,
                    { visible: this.state.previewVisible, footer: null, onCancel: this.handleCancel.bind(this) },
                    _react2.default.createElement('img', { alt: this.state.previewName, style: { width: '100%' }, src: this.state.previewImage })
                ) : null
            );
        }
    }]);

    return VortexUpload;
}(_react2.default.Component);

exports.default = VortexUpload;
module.exports = exports['default'];