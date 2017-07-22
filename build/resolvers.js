'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('./rethinkdb/models');

var _models2 = _interopRequireDefault(_models);

var _connector = require('./connector');

var _connector2 = _interopRequireDefault(_connector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new _connector2.default();
// import { UserError } from 'graphql-errors'
// const r = new rethinkdbModel()


var resolver = {
  Query: {
    novels: function novels(root, _ref, context, info) {
      var filter = _ref.filter,
          orderBy = _ref.orderBy,
          pagination = _ref.pagination;

      var _this = this;

      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var fields, novels;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fields = [];

                info.fieldNodes[0].selectionSet.selections.map(function (field) {
                  // I am getting fields requested from query
                  fields.push(field.name.value);
                });
                _context.prev = 2;
                _context.next = 5;
                return r.getNovels(fields, orderBy, pagination, filter);

              case 5:
                novels = _context.sent;
                return _context.abrupt('return', novels);

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);
                throw _context.t0;

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[2, 9]]);
      }))();
    },
    novel: function novel(root, _ref2, context, info) {
      var uuid = _ref2.uuid;

      var _this2 = this;

      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var fields, novel;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fields = [];

                info.fieldNodes[0].selectionSet.selections.map(function (field) {
                  // I am getting fields requested from query
                  fields.push(field.name.value);
                });
                _context2.prev = 2;
                _context2.next = 5;
                return r.getNovel(uuid, fields);

              case 5:
                novel = _context2.sent;
                return _context2.abrupt('return', novel);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](2);
                throw _context2.t0;

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[2, 9]]);
      }))();
    },
    chapter: function chapter(root, _ref3, context) {
      var _this3 = this;

      var novel_uuid = _ref3.novel_uuid,
          chapter_id = _ref3.chapter_id,
          type = _ref3.type;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var chapter;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return r.getChapter(novel_uuid, chapter_id, type);

              case 3:
                chapter = _context3.sent;
                return _context3.abrupt('return', chapter);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);
                throw _context3.t0;

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3, [[0, 7]]);
      }))();
    },
    chapters: function chapters(root, _ref4, context) {
      var _this4 = this;

      var novel_uuid = _ref4.novel_uuid,
          pagination = _ref4.pagination,
          type = _ref4.type;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var chapters;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return r.getChapters(novel_uuid, pagination, type);

              case 3:
                chapters = _context4.sent;
                return _context4.abrupt('return', chapters);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](0);
                throw _context4.t0;

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this4, [[0, 7]]);
      }))();
    }
  },
  Chapters: {
    __resolveType: function __resolveType(obj, context, info) {
      return 'ChaptersCrawler';
    }
  },

  Chapter: {
    __resolveType: function __resolveType(obj, context, info) {
      return 'ChapterCrawler';
    }
  }

};

exports.default = resolver;