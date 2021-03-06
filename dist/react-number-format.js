/*!
 * react-number-format - 0.1.3
 * Author : Sudhanshu Yadav
 * Copyright (c) 2016 to Sudhanshu Yadav - ignitersworld.com , released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["NumberFormat"] = factory(require("react"));
	else
		root["NumberFormat"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);

	var NumberFormat = React.createClass({
	  displayName: 'NumberFormat',
	  getInitialState: function getInitialState() {
	    return {
	      value: this.formatInput(this.props.value).formattedValue
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      displayType: 'input'
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this.setState({
	      value: this.formatInput(newProps.value).formattedValue
	    });
	  },
	  setCaretPosition: function setCaretPosition(caretPos) {
	    var el = this.refs.input;
	    el.value = el.value;
	    // ^ this is used to not only get "focus", but
	    // to make sure we don't have it everything -selected-
	    // (it causes an issue in chrome, and having it doesn't hurt any other browser)
	    if (el !== null) {
	      if (el.createTextRange) {
	        var range = el.createTextRange();
	        range.move('character', caretPos);
	        range.select();
	        return true;
	      }
	      // (el.selectionStart === 0 added for Firefox bug)
	      if (el.selectionStart || el.selectionStart === 0) {
	        el.focus();
	        el.setSelectionRange(caretPos, caretPos);
	        return true;
	      }

	      // fail city, fortunately this never happens (as far as I've tested) :)
	      el.focus();
	      return false;
	    }
	  },
	  formatWithPattern: function formatWithPattern(str) {
	    var _props = this.props;
	    var format = _props.format;
	    var mask = _props.mask;

	    if (!format) return str;
	    var hashCount = format.split('#').length - 1;
	    var hashIdx = 0;
	    var frmtdStr = format;

	    for (var i = 0, ln = str.length; i < ln; i++) {
	      if (i < hashCount) {
	        hashIdx = frmtdStr.indexOf('#');
	        frmtdStr = frmtdStr.replace('#', str[i]);
	      }
	    }

	    var lastIdx = frmtdStr.lastIndexOf('#');

	    if (mask) {
	      return frmtdStr.replace(/#/g, mask);
	    }
	    return frmtdStr.substring(0, hashIdx + 1) + (lastIdx !== -1 ? frmtdStr.substring(lastIdx + 1, frmtdStr.length) : '');
	  },
	  formatInput: function formatInput(val) {
	    var _props2 = this.props;
	    var prefix = _props2.prefix;
	    var thousandSeparator = _props2.thousandSeparator;
	    var suffix = _props2.suffix;
	    var mask = _props2.mask;
	    var format = _props2.format;

	    var maskPattern = format && typeof format == "string" && !!mask;

	    if (!val || !(val + "").match(/\d/g)) return { value: "", formattedValue: maskPattern ? "" : "" };
	    var num = (val + "").match(/\d/g).join("");

	    var formattedValue = num;

	    if (format) {
	      if (typeof format == 'string') {
	        formattedValue = this.formatWithPattern(formattedValue);
	      } else if (typeof format == "function") {
	        formattedValue = format(formattedValue);
	      }
	    } else {
	      if (thousandSeparator) formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

	      //add prefix and suffix
	      if (prefix) formattedValue = prefix + formattedValue;
	      if (suffix) formattedValue = formattedValue + suffix;
	    }

	    return {
	      value: formattedValue.match(/\d/g).join(""),
	      formattedValue: formattedValue
	    };
	  },
	  getCursorPosition: function getCursorPosition(inputValue, formattedValue, cursorPos) {
	    var j = 0;
	    for (var i = 0; i < cursorPos; i++) {
	      if (!inputValue[i].match(/\d/) && inputValue[i] !== formattedValue[j]) continue;
	      while (inputValue[i] !== formattedValue[j] && j < formattedValue.length) {
	        j++;
	      }j++;
	    }

	    //check if there is no number before caret position
	    while (j > 0 && formattedValue[j]) {
	      if (!formattedValue[j - 1].match(/\d/)) j--;else break;
	    }
	    return j;
	  },
	  onChangeHandler: function onChangeHandler(e, callback) {
	    var _this = this;

	    var inputValue = e.target.value;

	    var _formatInput = this.formatInput(inputValue);

	    var formattedValue = _formatInput.formattedValue;
	    var value = _formatInput.value;

	    var cursorPos = this.refs.input.selectionStart;

	    //change the state
	    this.setState({ value: formattedValue }, function () {
	      cursorPos = _this.getCursorPosition(inputValue, formattedValue, cursorPos);
	      _this.setCaretPosition(cursorPos);
	      if (callback) callback(e, value);
	    });

	    return value;
	  },
	  onChange: function onChange(e) {
	    this.onChangeHandler(e, this.props.onChange);
	  },
	  onInput: function onInput(e) {
	    this.onChangeHandler(e, this.props.onInput);
	  },
	  render: function render() {
	    var props = _extends({}, this.props);

	    ['thousandSeparator', 'displayType', 'prefix', 'suffix', 'format', 'mask', 'value'].forEach(function (key) {
	      delete props[key];
	    });

	    if (this.props.displayType === "text") {
	      return React.createElement(
	        'span',
	        props,
	        this.state.value
	      );
	    }
	    return React.createElement('input', _extends({}, props, {
	      type: 'tel',
	      value: this.state.value,
	      ref: 'input',
	      onInput: this.onChange,
	      onChange: this.onChange
	    }));
	  }
	});

	module.exports = NumberFormat;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
