"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const childProcess = __importStar(require("child_process"));
const process = __importStar(require("process"));
/**
 * Run a specified command.
 * @param {string} cmd - command to run
 */
function runCmd(cmd) {
    try {
        console.log(`RUNNING: "${cmd}"`);
        childProcess.execSync(cmd);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const version = core.getInput('version');
        const outputFile = core.getInput('outputFile');
        const functionType = core.getInput('functionType');
        const validateMapping = core.getInput('validateMapping');
        const validateConcurrency = core.getInput('validateConcurrency');
        const source = core.getInput('source');
        const target = core.getInput('target');
        const runtime = core.getInput('runtime');
        const tag = core.getInput('tag');
        const useBuildpacks = core.getInput('useBuildpacks');
        const cmd = core.getInput('cmd');
        const startDelay = core.getInput('startDelay');
        const workingDirectory = core.getInput('workingDirectory');
        let cwd = process.cwd();
        // Build conformance client binary from source.
        // let repo = 'functions-framework-conformance';
        // if (!fs.existsSync(repo)) {
        //   runCmd(`git clone https://github.com/GoogleCloudPlatform/functions-framework-conformance.git`);
        // }
        // process.chdir('functions-framework-conformance/client');
        // if (version) {
        //   runCmd(`git fetch origin refs/tags/${version} && git checkout ${version}`);
        // } else {
        //   // Checkout latest release tag.
        //   runCmd('git fetch --tags && git checkout $(git describe --tags $(git rev-list --tags --max-count=1))')
        // }
        // runCmd(`go build -o ~/client`);
        process.chdir(cwd);
        if (workingDirectory) {
            process.chdir(workingDirectory);
        }
        // Run the client with the specified parameters.
        runCmd([
            `client`,
            `-output-file=${outputFile}`,
            `-type=${functionType}`,
            `-validate-mapping=${validateMapping}`,
            `-validate-concurrency=${validateConcurrency}`,
            `-builder-source=${source}`,
            `-builder-target=${target}`,
            `-builder-runtime=${runtime}`,
            `-builder-tag=${tag}`,
            `-buildpacks=${useBuildpacks}`,
            `-cmd=${cmd}`,
            `-start-delay=${startDelay}`,
        ].filter((x) => !!x).join(' '));
    });
}
run();
