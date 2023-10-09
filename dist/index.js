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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
var puppeteer_1 = __importDefault(require("puppeteer"));
var cheerio_1 = require("cheerio");
var delay = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
exports.delay = delay;
var LinkedInScrapper = /** @class */ (function () {
    function LinkedInScrapper(cookie, profileLink) {
        this.cookie = cookie;
        this.profileLink = profileLink;
    }
    LinkedInScrapper.prototype.getPageInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, puppeteer_1.default.launch({ headless: "new" })];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.setCookie({
                                name: "li_at",
                                value: this.cookie,
                                domain: ".linkedin.com",
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                browser: browser,
                                page: page,
                            }];
                }
            });
        });
    };
    LinkedInScrapper.prototype.getProfileInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, browser, pageContent, $, name, heading, address, about;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getPageInfo()];
                    case 1:
                        _a = _b.sent(), page = _a.page, browser = _a.browser;
                        return [4 /*yield*/, page.goto(this.profileLink)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, page.waitForSelector("img", { timeout: 10000 })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, page.content()];
                    case 4:
                        pageContent = _b.sent();
                        return [4 /*yield*/, browser.close()];
                    case 5:
                        _b.sent();
                        $ = (0, cheerio_1.load)(pageContent);
                        name = $("#ember27").text().trim();
                        heading = $("#ember28").text().trim();
                        address = $(".pv-text-details__left-panel.mt2 span.text-body-small")
                            .text()
                            .trim();
                        about = $('.pv-shared-text-with-see-more div.inline-show-more-text span[aria-hidden="true"]')
                            .first()
                            .text()
                            .trim();
                        return [2 /*return*/, {
                                name: name,
                                heading: heading,
                                address: address,
                                about: about,
                            }];
                }
            });
        });
    };
    LinkedInScrapper.prototype.getExperiences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, browser, pageContent, $, experiences;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, exports.delay)(1000)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getPageInfo()];
                    case 2:
                        _a = _b.sent(), page = _a.page, browser = _a.browser;
                        return [4 /*yield*/, page.goto(this.profileLink + "/details/experience")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, page.waitForSelector("h2.t-20.t-bold.ph3.pt3.pb2", {
                                timeout: 20000,
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, page.content()];
                    case 5:
                        pageContent = _b.sent();
                        return [4 /*yield*/, browser.close()];
                    case 6:
                        _b.sent();
                        $ = (0, cheerio_1.load)(pageContent);
                        experiences = [];
                        $(".pvs-entity").each(function (_, elem) {
                            var position = $(elem)
                                .find("div.display-flex.align-items-center.mr1.t-bold span[aria-hidden='true']")
                                .first()
                                .text()
                                .trim();
                            // For Company
                            var company = $(elem)
                                .find("span.t-14.t-normal span[aria-hidden='true']")
                                .first()
                                .text()
                                .trim();
                            // For Duration
                            var duration = $(elem)
                                .find("span.t-14.t-normal.t-black--light span[aria-hidden='true']")
                                .first()
                                .text()
                                .trim();
                            // For About
                            var about = $(elem)
                                .find("div.display-flex.align-items-center.t-14.t-normal.t-black span[aria-hidden='true']")
                                .first()
                                .text()
                                .trim();
                            experiences.push({
                                position: position,
                                company: company,
                                duration: duration,
                                about: about,
                            });
                        });
                        return [2 /*return*/, experiences];
                }
            });
        });
    };
    LinkedInScrapper.prototype.getEducations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, browser, pageContent, $, educations;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, exports.delay)(2000)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getPageInfo()];
                    case 2:
                        _a = _b.sent(), page = _a.page, browser = _a.browser;
                        return [4 /*yield*/, page.goto(this.profileLink + "/details/education")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, page.waitForSelector("h2.t-20.t-bold.ph3.pt3.pb2", {
                                timeout: 20000,
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, page.content()];
                    case 5:
                        pageContent = _b.sent();
                        return [4 /*yield*/, browser.close()];
                    case 6:
                        _b.sent();
                        $ = (0, cheerio_1.load)(pageContent);
                        educations = [];
                        $(".pvs-entity").each(function (_, elem) {
                            var schoolName = $(elem)
                                .find("div.display-flex.align-items-center.mr1.t-bold span[aria-hidden='true']")
                                .first()
                                .text()
                                .trim();
                            // For Degree/Field
                            var degreeField = $(elem)
                                .find("span.t-14.t-normal span[aria-hidden='true']")
                                .first()
                                .text()
                                .trim();
                            // For Duration
                            var duration = $(elem)
                                .find("span.t-14.t-normal.t-black--light span[aria-hidden='true']")
                                .first()
                                .text()
                                .trim();
                            educations.push({
                                schoolName: schoolName,
                                degreeField: degreeField,
                                duration: duration,
                            });
                        });
                        return [2 /*return*/, educations];
                }
            });
        });
    };
    LinkedInScrapper.prototype.getSkills = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, browser, pageContent, $, skills;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, exports.delay)(3000)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getPageInfo()];
                    case 2:
                        _a = _b.sent(), page = _a.page, browser = _a.browser;
                        return [4 /*yield*/, page.goto(this.profileLink + "/details/skills")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, page.waitForSelector("h2.t-20.t-bold.ph3.pt3.pb2", {
                                timeout: 20000,
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, page.content()];
                    case 5:
                        pageContent = _b.sent();
                        return [4 /*yield*/, browser.close()];
                    case 6:
                        _b.sent();
                        $ = (0, cheerio_1.load)(pageContent);
                        skills = [];
                        $(".pvs-entity").each(function (_, elem) {
                            var skill = $(elem)
                                .find("div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold span[aria-hidden='true']")
                                .first()
                                .text()
                                .trim();
                            if (skill) {
                                skills.push(skill);
                            }
                        });
                        return [2 /*return*/, skills];
                }
            });
        });
    };
    return LinkedInScrapper;
}());
exports.default = LinkedInScrapper;
