'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FuzzySearch = require('./FuzzySearch');

var _FuzzySearch2 = _interopRequireDefault(_FuzzySearch);

var _text_filter = require('./text_filter');

var _text_filter2 = _interopRequireDefault(_text_filter);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _modalContent = require('./modalContent');

var _modalContent2 = _interopRequireDefault(_modalContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  keys: ['story', 'kind']
};

var StorybookControls = function (_React$Component) {
  (0, _inherits3.default)(StorybookControls, _React$Component);

  function StorybookControls(props) {
    (0, _classCallCheck3.default)(this, StorybookControls);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(StorybookControls).call(this, props));

    _this.state = {
      filterText: '',
      isModalOpen: false
    };
    _this.formatStoryForSearch = _this.formatStoryForSearch.bind(_this);
    _this.fireOnStory = _this.fireOnStory.bind(_this);
    _this.fireOnKind = _this.fireOnKind.bind(_this);
    _this.openModal = _this.openModal.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(StorybookControls, [{
    key: 'getKindNames',
    value: function getKindNames() {
      var _this2 = this;

      var storyStore = this.props.storyStore;

      if (!storyStore) {
        return [];
      }
      var kindNames = storyStore.map(function (_ref) {
        var kind = _ref.kind;
        return kind;
      });

      var filterdKindNames = kindNames.filter(function (kind) {
        var selectedKind = _this2.props.selectedKind;
        var filterText = _this2.state.filterText;


        if (kind === selectedKind) {
          // Always keep the selected kind name
          return true;
        }

        return kind.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
      });

      return filterdKindNames;
    }
  }, {
    key: 'getStories',
    value: function getStories(kind) {
      var storyStore = this.props.storyStore;

      var storiesInfo = storyStore.find(function (item) {
        return item.kind === kind;
      });

      if (!storiesInfo) {
        return [];
      }
      return storiesInfo.stories;
    }
  }, {
    key: 'fireOnKind',
    value: function fireOnKind(kind, story) {
      var onKind = this.props.onKind;

      if (onKind) onKind(kind, story);
    }
  }, {
    key: 'fireOnStory',
    value: function fireOnStory(story) {
      var onStory = this.props.onStory;

      if (onStory) onStory(story);
    }
  }, {
    key: 'filterStoryList',
    value: function filterStoryList(filterText) {
      this.setState({ filterText: filterText });
    }
  }, {
    key: 'clearFilterText',
    value: function clearFilterText() {
      this.setState({ filterText: '' });
    }
  }, {
    key: 'formatStoryForSearch',
    value: function formatStoryForSearch() {
      var storyStore = this.props.storyStore;

      if (!storyStore) {
        return [];
      }
      var formattedStories = [];

      storyStore.forEach(function (kindData) {
        var stories = kindData.stories.map(function (story) {
          return {
            story: story,
            kind: kindData.kind
          };
        });
        formattedStories = formattedStories.concat(stories);
      });
      return formattedStories;
    }
  }, {
    key: 'openModal',
    value: function openModal() {
      this.setState({
        isModalOpen: true
      });
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      this.setState({
        isModalOpen: false
      });
    }
  }, {
    key: 'renderStory',
    value: function renderStory(story) {
      var selectedStory = this.props.selectedStory;

      var storyStyle = {
        fontSize: 13,
        padding: '8px 0px 8px 10px',
        cursor: 'pointer'
      };

      if (story === selectedStory) {
        storyStyle.fontWeight = 'bold';
      }
      return _react2.default.createElement(
        'div',
        {
          key: story,
          style: storyStyle,
          onClick: this.fireOnStory.bind(this, story)
        },
        story
      );
    }
  }, {
    key: 'renderKind',
    value: function renderKind(kind) {
      var kindStyle = {
        fontSize: 15,
        padding: '10px 0px',
        cursor: 'pointer',
        borderBottom: '1px solid #EEE'
      };

      var selectedKind = this.props.selectedKind;

      if (kind === selectedKind) {
        var stories = this.getStories(selectedKind);
        kindStyle.fontWeight = 'bold';
        return _react2.default.createElement(
          'div',
          { key: kind },
          _react2.default.createElement(
            'div',
            {
              style: kindStyle,
              onClick: this.fireOnKind.bind(this, kind, null)
            },
            kind
          ),
          _react2.default.createElement(
            'div',
            null,
            stories.map(this.renderStory.bind(this))
          )
        );
      }

      return _react2.default.createElement(
        'div',
        {
          key: kind,
          style: kindStyle,
          onClick: this.fireOnKind.bind(this, kind, null)
        },
        kind
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var kindNames = this.getKindNames();
      var mainStyle = {
        fontFamily: '\n        -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto",\n        "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif\n      ',
        color: '#444'
      };

      var h1WrapStyle = {
        background: '#F7F7F7',
        paddingBottom: '20px',
        position: 'absolute',
        top: '20px',
        right: '10px',
        left: '20px'
      };

      var h1Style = {
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        fontSize: '12px',
        fontWeight: 'bolder',
        color: '#828282',
        border: '1px solid #C1C1C1',
        textAlign: 'center',
        borderRadius: '2px',
        padding: '5px',
        cursor: 'pointer',
        margin: 0,
        float: 'none',
        overflow: 'hidden'
      };

      var filterTextWrapStyle = {
        position: 'absolute',
        top: '68px',
        right: '10px',
        left: '20px'
      };

      var listStyle = {
        overflowY: 'auto',
        position: 'absolute',
        top: '108px',
        right: '10px',
        bottom: 0,
        left: '20px'
      };

      var shortcutIcon = {
        textTransform: 'uppercase',
        letterSpacing: '3.5px',
        fontSize: 12,
        fontWeight: 'bolder',
        color: 'rgb(130, 130, 130)',
        border: '1px solid rgb(193, 193, 193)',
        textAlign: 'center',
        borderRadius: 2,
        padding: 5,
        cursor: 'pointer',
        margin: 0,
        display: 'inlineBlock',
        paddingLeft: 8,
        float: 'right',
        marginLeft: 5
      };

      var modalStyles = {
        content: {
          left: '50%',
          bottom: 'initial',
          right: 'initial',
          width: 350,
          marginLeft: -175,
          border: 'none',
          overflow: 'visible',
          fontFamily: 'sans-serif',
          fontSize: 14
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.74902)'
        }
      };

      var closeButtonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        position: 'absolute',
        right: -30,
        top: -6,
        color: '#fff',
        fontSize: 22,
        cursor: 'pointer',
        outline: 'none'
      };

      var linkStyle = {
        textDecoration: 'none'
      };

      var linkTarget = 'https://github.com/kadirahq/react-storybook';

      return _react2.default.createElement(
        'div',
        { style: mainStyle },
        _react2.default.createElement(
          'div',
          { style: h1WrapStyle },
          _react2.default.createElement(
            'div',
            { style: shortcutIcon, onClick: this.openModal, className: 'btn' },
            '⌘'
          ),
          _react2.default.createElement(
            'a',
            { style: linkStyle, href: linkTarget, target: '_blank' },
            _react2.default.createElement(
              'h3',
              { style: h1Style },
              'React Storybook'
            )
          )
        ),
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: this.state.isModalOpen,
            onRequestClose: this.closeModal,
            style: modalStyles
          },
          (0, _modalContent2.default)(),
          _react2.default.createElement(
            'button',
            { onClick: this.closeModal, style: closeButtonStyle },
            '✕'
          )
        ),
        _react2.default.createElement(_FuzzySearch2.default, {
          list: this.formatStoryForSearch(),
          options: options,
          width: 430,
          onSelect: this.fireOnKind,
          placeholder: 'Search by Story or Kind'
        }),
        _react2.default.createElement(
          'div',
          { style: filterTextWrapStyle },
          _react2.default.createElement(_text_filter2.default, {
            filterText: this.state.filterText,
            onChange: this.filterStoryList.bind(this),
            onClear: this.clearFilterText.bind(this)
          })
        ),
        _react2.default.createElement(
          'div',
          { style: listStyle },
          kindNames.map(this.renderKind.bind(this))
        )
      );
    }
  }]);
  return StorybookControls;
}(_react2.default.Component);

exports.default = StorybookControls;


StorybookControls.propTypes = {
  storyStore: _react2.default.PropTypes.array,
  selectedKind: _react2.default.PropTypes.string,
  selectedStory: _react2.default.PropTypes.string,
  onKind: _react2.default.PropTypes.func,
  onStory: _react2.default.PropTypes.func
};