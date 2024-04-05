// #region ▮▮▮▮▮▮▮ IMPORTS ▮▮▮▮▮▮▮ ~
// import U from "./utilities";
// #endregion ▮▮▮▮[IMPORTS]▮▮▮▮
const isList = <T>(ref: T): ref is Record<key, unknown> & T => ref === Object(ref) && !Array.isArray(ref);

// #region ████████ Handlebars: Handlebar Helpers Definitions ████████ ~
const HandlebarHelpers: {
  Initialize: () => Promise<void>;
  Delegates: Record<string, Handlebars.HelperDelegate>;
} = {
  Initialize: async () => {
    Object.entries(HandlebarHelpers.Delegates).forEach(([name, func]) => Handlebars.registerHelper(name, func));
  },
  Delegates: {
    test(param1: unknown, operator: string, param2: unknown) {
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
        param1 = stringMap[param1 as keyof typeof stringMap];
      }
      if (typeof param2 === "string" && param2 in stringMap) {
        param2 = stringMap[param2 as keyof typeof stringMap];
      }
      switch (operator) {
        case "!": case "not": { return !param1; }
        case "=??": { return ([undefined, null] as unknown[]).includes(param1); }
        case "&&": { return param1 && param2; }
        case "||": { return param1 || param2; }
        case "==": /* { return U.areFuzzyEqual(param1, param2); } */
        case "===": { return param1 === param2; }
        case "!=":
        case "!==": { return param1 !== param2; }
        case ">": { return typeof param1 === "number" && typeof param2 === "number" && param1 > param2; }
        case "<": { return typeof param1 === "number" && typeof param2 === "number" && param1 < param2; }
        case ">=": { return typeof param1 === "number" && typeof param2 === "number" && param1 >= param2; }
        case "<=": { return typeof param1 === "number" && typeof param2 === "number" && param1 <= param2; }
        case "??": { return param1 ?? param2; }
        case "includes": { return Array.isArray(param1) && param1.includes(param2); }
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
        default: { return false; }
      }
    },
    calc(...params: unknown[]) {
      const calcs: Record<string, (...args: Array<number|string>) => number|string> = {
        "+": (p1, p2) => parseInt(`${p1}`, 10) + parseInt(`${p2}`, 10),
        "-": (p1, p2) => parseInt(`${p1}`, 10) - parseInt(`${p2}`, 10),
        "*": (p1, p2) => parseInt(`${p1}`, 10) * parseInt(`${p2}`, 10),
        "/": (p1, p2) => parseInt(`${p1}`, 10) / parseInt(`${p2}`, 10),
        "%": (p1, p2) => parseInt(`${p1}`, 10) % parseInt(`${p2}`, 10),
        "max": (p1, p2) => Math.max(parseInt(`${p1}`, 10), parseInt(`${p2}`, 10)),
        "min": (p1, p2) => Math.min(parseFloat(`${p1}`), parseFloat(`${p2}`)),
        "ceil": (p1) => Math.ceil(parseFloat(`${p1}`)),
        "floor": (p1) => Math.floor(parseFloat(`${p1}`))
      };
      const [param1, operator, param2] = typeof params[0] === "string" && params[0] in calcs
        ? [params[1], params[0]]
        : params;
      return calcs[operator as KeyOf<typeof calcs>](param1 as string|number, param2 as string|number);
    },
    isIn(...args: unknown[]) {
      const [testStr, ...contents] = args;
      return contents.includes(testStr);
    },
    case(mode: StringCase, str: string) {
      switch (mode) {
        case "upper": return str.toUpperCase();
        case "lower": return str.toLowerCase();
        case "sentence": return str[0].toUpperCase() + str.slice(1);
        case "title": return str[0].toUpperCase() + str.slice(1);
        default: return str;
      }
    },
    count(param: unknown): number {
      if (Array.isArray(param) || isList(param)) {
        return Object.values(param).filter((val: unknown) => val !== null && val !== undefined).length;
      } else if (typeof param === "string") {
        return param.length;
      }
      return param ? 1 : 0;
    },
    // Concat helper
    // Usage: (concat 'first 'second')
    concat(...args: unknown[]) {
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
      if (from > to) { return ""; }
      let html = "";
      for (let i = parseInt(from || 0, 10); i <= parseInt(to || 0, 10); i += stepSize) {
        html += options.fn(i);
      }
      return html;
    },
    signNum(num: number) {
      return Math.sign(num);
    }
  }
};

export default HandlebarHelpers;
// #endregion ▄▄▄▄▄ Handlebars ▄▄▄▄▄
