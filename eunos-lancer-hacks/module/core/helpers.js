// #region ▮▮▮▮▮▮▮ IMPORTS ▮▮▮▮▮▮▮ ~
// import U from "./utilities.js";
// #endregion ▮▮▮▮[IMPORTS]▮▮▮▮
const isList = (ref) => ref === Object(ref) && !Array.isArray(ref);
// #region ████████ Handlebars: Handlebar Helpers Definitions ████████ ~
const handlebarHelpers = {
    // randString(param1 = 10) {
    //   return U.randString(param1);
    // },
    test(param1, operator, param2) {
        const stringMap = {
            true: true,
            false: false,
            null: null,
            undefined
        };
        if (["!", "not", "=??"].includes(String(param1))) {
            [operator, param1] = [String(param1), operator];
        }
        if (typeof param1 === "string" && param1 in stringMap) {
            param1 = stringMap[param1];
        }
        if (typeof param2 === "string" && param2 in stringMap) {
            param2 = stringMap[param2];
        }
        switch (operator) {
            case "!":
            case "not": {
                return !param1;
            }
            case "=??": {
                return [undefined, null].includes(param1);
            }
            case "&&": {
                return param1 && param2;
            }
            case "||": {
                return param1 || param2;
            }
            case "==": /* { return U.areFuzzyEqual(param1, param2); } */
            case "===": {
                return param1 === param2;
            }
            case "!=":
            case "!==": {
                return param1 !== param2;
            }
            case ">": {
                return typeof param1 === "number" && typeof param2 === "number" && param1 > param2;
            }
            case "<": {
                return typeof param1 === "number" && typeof param2 === "number" && param1 < param2;
            }
            case ">=": {
                return typeof param1 === "number" && typeof param2 === "number" && param1 >= param2;
            }
            case "<=": {
                return typeof param1 === "number" && typeof param2 === "number" && param1 <= param2;
            }
            case "??": {
                return param1 ?? param2;
            }
            case "includes": {
                return Array.isArray(param1) && param1.includes(param2);
            }
            case "in": {
                if (Array.isArray(param2)) {
                    return param2.includes(param1);
                }
                if (isList(param2) && (typeof param1 === "number" || typeof param1 === "string")) {
                    return param1 in param2;
                }
                if (typeof param2 === "string") {
                    return new RegExp(String(param1), "gu").test(String(param2));
                }
                return false;
            }
            default: {
                return false;
            }
        }
    },
    calc(...params) {
        const calcs = {
            "+": (p1, p2) => parseInt(`${p1}`, 10) + parseInt(`${p2}`, 10),
            "-": (p1, p2) => parseInt(`${p1}`, 10) - parseInt(`${p2}`, 10),
            "*": (p1, p2) => parseInt(`${p1}`, 10) * parseInt(`${p2}`, 10),
            "/": (p1, p2) => parseInt(`${p1}`, 10) / parseInt(`${p2}`, 10),
            "%": (p1, p2) => parseInt(`${p1}`, 10) % parseInt(`${p2}`, 10),
            max: (p1, p2) => Math.max(parseInt(`${p1}`, 10), parseInt(`${p2}`, 10)),
            min: (p1, p2) => Math.min(parseFloat(`${p1}`), parseFloat(`${p2}`)),
            ceil: (p1) => Math.ceil(parseFloat(`${p1}`)),
            floor: (p1) => Math.floor(parseFloat(`${p1}`))
        };
        const [param1, operator, param2] = typeof params[0] === "string" && params[0] in calcs
            ? [params[1], params[0]]
            : params;
        return calcs[operator](param1, param2);
    },
    isIn(...args) {
        const [testStr, ...contents] = args;
        return contents.includes(testStr);
    },
    case(mode, str) {
        switch (mode) {
            case "upper": return str.toUpperCase();
            case "lower": return str.toLowerCase();
            case "sentence": return str[0].toUpperCase() + str.slice(1);
            case "title": return str[0].toUpperCase() + str.slice(1);
            default: return str;
        }
    },
    // romanize(val: number): string {
    //   return U.romanizeNum(U.pInt(val));
    // },
    count(param) {
        if (Array.isArray(param) || isList(param)) {
            return Object.values(param).filter((val) => val !== null && val !== undefined).length;
        }
        else if (typeof param === "string") {
            return param.length;
        }
        return param ? 1 : 0;
    },
    // Concat helper
    // Usage: (concat 'first 'second')
    concat(...args) {
        let outStr = "";
        for (const arg of args) {
            if (typeof arg === "string" || typeof arg === "number") {
                outStr += arg;
            }
        }
        return outStr;
    },
    // Merge helper - To merge additional properties into a template's context
    merge(context, ...args) {
        args.pop();
        return args.reduce((acc, val) => Object.assign(acc, val), context);
    },
    // For loop: {{#for [from = 0, to, stepSize = 1]}}<html content, this = index>{{/for}}
    forloop: (...args) => {
        const options = args.pop();
        let [from, to, stepSize] = args;
        from = parseInt(`${from}`, 10);
        to = parseInt(`${to}`, 10);
        stepSize = parseInt(`${stepSize}`, 10) || 1;
        if (from > to) {
            return "";
        }
        let html = "";
        for (let i = parseInt(from || 0, 10); i <= parseInt(to || 0, 10); i += stepSize) {
            html += options.fn(i);
        }
        return html;
    },
    signNum(num) {
        return Math.sign(num);
    },
    // compileSvg(...args): string {
    //   const [svgDotKey, svgPaths]: [string, string] = args as [string, string];
    //   return U.getSvgCode(svgDotKey, svgPaths);
    // },
    eLog(...args) {
        args.pop();
        let dbLevel = 3;
        if ([0, 1, 2, 3, 4, 5].includes(args[0])) {
            dbLevel = args.shift();
        }
        eLog.hbsLog(...args, dbLevel);
    },
    // Does the name of this turf block represent a standard 'Turf' claim?
    // isTurfBlock: (name: string): boolean => U.fuzzyMatch(name, "Turf"),
    // Which other connection does this connector overlap with?
    getConnectorPartner: (index, direction) => {
        index = parseInt(`${index}`, 10);
        const partners = {
            1: { right: 2, bottom: 6 },
            2: { left: 1, right: 3, bottom: 7 },
            3: { left: 2, right: 4, bottom: 8 },
            4: { left: 3, right: 5, bottom: 9 },
            5: { left: 4, bottom: 10 },
            6: { top: 1, right: 7, bottom: 11 },
            7: { top: 2, left: 6, right: 8, bottom: 12 },
            8: { top: 3, left: 7, right: 9, bottom: 13 },
            9: { top: 4, left: 8, right: 10, bottom: 14 },
            10: { top: 5, left: 9, bottom: 15 },
            11: { top: 6, right: 12 },
            12: { top: 7, left: 11, right: 13 },
            13: { top: 8, left: 12, right: 14 },
            14: { top: 9, left: 13, right: 15 },
            15: { top: 10, left: 14 }
        };
        const partnerDir = { left: "right", right: "left", top: "bottom", bottom: "top" }[direction];
        const partnerNum = partners[index][direction] ?? 0;
        if (partnerNum) {
            return `${partnerNum}-${partnerDir}`;
        }
        return null;
    },
    // Is the value Turf side.
    isTurfOnEdge: (index, direction) => {
        index = parseInt(`${index}`, 10);
        const edges = {
            1: ["top", "left"],
            2: ["top"],
            3: ["top"],
            4: ["top"],
            5: ["top", "right"],
            6: ["left"],
            7: [],
            8: [],
            9: [],
            10: ["right"],
            11: ["left", "bottom"],
            12: ["bottom"],
            13: ["bottom"],
            14: ["bottom"],
            15: ["right", "bottom"]
        };
        if (!(index in edges)) {
            return true;
        }
        return edges[index].includes(direction);
    },
    // Multiboxes
    multiboxes(selected, options) {
        let html = options.fn(this);
        selected = [selected].flat(1);
        selected.forEach((selectedVal) => {
            if (selectedVal !== false) {
                const escapedValue = RegExp.escape(Handlebars.escapeExpression(String(selectedVal)));
                const rgx = new RegExp(` value="${escapedValue}"`);
                html = html.replace(rgx, "$& checked=\"checked\"");
            }
        });
        return html;
    },
    repturf: (turfsAmount, options) => {
        let html = options.fn(this);
        let turfsAmountInt = parseInt(turfsAmount, 10);
        // Can't be more than 6.
        if (turfsAmountInt > 6) {
            turfsAmountInt = 6;
        }
        for (let i = 13 - turfsAmountInt; i <= 12; i++) {
            const rgx = new RegExp(` value="${i}"`);
            html = html.replace(rgx, "$& disabled=\"disabled\"");
        }
        return html;
    }
};
handlebarHelpers.eLog1 = function (...args) { handlebarHelpers.eLog(...[1, ...args.slice(0, 7)]); };
handlebarHelpers.eLog2 = function (...args) { handlebarHelpers.eLog(...[2, ...args.slice(0, 7)]); };
handlebarHelpers.eLog3 = function (...args) { handlebarHelpers.eLog(...[3, ...args.slice(0, 7)]); };
handlebarHelpers.eLog4 = function (...args) { handlebarHelpers.eLog(...[4, ...args.slice(0, 7)]); };
handlebarHelpers.eLog5 = function (...args) { handlebarHelpers.eLog(...[5, ...args.slice(0, 7)]); };
Object.assign(handlebarHelpers);
/**
 *
 */
export function registerHandlebarHelpers() {
    Object.entries(handlebarHelpers).forEach(([name, func]) => Handlebars.registerHelper(name, func));
}
// #endregion ▄▄▄▄▄ Handlebars ▄▄▄▄▄