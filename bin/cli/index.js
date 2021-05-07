"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kratenki = exports.geo = exports.korpus = exports.searchCommon = void 0;
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var api_1 = require("../api");
var utils_1 = require("../utils");
var clear = require('clear');
var searchCommon = function (args, searchFn, noContent) { return __awaiter(void 0, void 0, void 0, function () {
    var page, answers, res, choices, isPaginate, _a, word, type, example, content, original;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                page = 1;
                answers = [];
                _b.label = 1;
            case 1: return [4 /*yield*/, searchFn(args.zbor, page)];
            case 2:
                res = _b.sent();
                clear();
                choices = __spreadArray([], res.words.map(function (r) { return ({
                    name: chalk_1.default.cyan(r.value) + " " + (r.desc ? chalk_1.default.gray("(" + r.desc + ")") : ''),
                    value: r.value,
                }); }));
                if (page !== 1)
                    choices = __spreadArray([{ name: 'Претходна страна...', value: 'prev' }], choices);
                if (page !== res.pages[1])
                    choices = __spreadArray(__spreadArray([], choices), [{ name: 'Следна страна...', value: 'next' }]);
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'rawlist',
                            name: 'page',
                            message: 'Кој збор би сакале да го посетите?',
                            choices: choices,
                        },
                    ])];
            case 3:
                answers = _b.sent();
                isPaginate = ['prev', 'next'].includes(answers.page);
                if (noContent && !isPaginate) {
                    console.error(chalk_1.default.red('Изворот кој го побаравте не содржи дефиниција'));
                    process.exit(1);
                }
                if (isPaginate)
                    page += answers.page === 'prev' ? -1 : 1;
                _b.label = 4;
            case 4:
                if (!answers.length && ['prev', 'next'].includes(answers.page)) return [3 /*break*/, 1];
                _b.label = 5;
            case 5:
                clear();
                return [4 /*yield*/, api_1.getPage(answers.page)];
            case 6:
                _a = _b.sent(), word = _a.word, type = _a.type, example = _a.example, content = _a.content, original = _a.original;
                console.log(chalk_1.default.bold(utils_1.cammilify(word)) + "\n" +
                    ("\u0412\u0438\u0434: " + chalk_1.default.green(type) + "\n") +
                    ("\u041F\u0440\u0438\u043C\u0435\u0440: " + (example ? chalk_1.default.yellow(example) : chalk_1.default.gray('Нема')) + "\n\n") +
                    (chalk_1.default.blueBright(content) + "\n\n") +
                    chalk_1.default.gray("\u041E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u043D\u0438 \u043F\u043E\u0434\u0430\u0442\u043E\u0446\u0438:\n" + original));
                return [2 /*return*/];
        }
    });
}); };
exports.searchCommon = searchCommon;
var korpus = function (args) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, exports.searchCommon(args, api_1.searchCorpus)];
}); }); };
exports.korpus = korpus;
var geo = function (args) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, exports.searchCommon(args, api_1.searchGeo)];
}); }); };
exports.geo = geo;
var kratenki = function (args) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, exports.searchCommon(args, api_1.searchAbbreviations, true)];
}); }); };
exports.kratenki = kratenki;
