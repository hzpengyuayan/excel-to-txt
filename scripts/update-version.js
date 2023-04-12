const path = require("path");
const fs = require("fs");

const argv = process.argv[2];

if (process.argv.length !== 3) {
  console.log(
    "请利用此命令 npm run version <version> 输入新版本号,版本号需要符合语义化版本（Semantic Versioning）规范，例如1.0.0、1.0.1、1.1.0等格式。"
  );
  process.exit(1);
}

const newVersion = process.argv[2]; // 获取命令行参数中的新版本号
const versionRegexp = /^(?:\d+\.){2}\d+$/;

if (!versionRegexp.test(newVersion)) {
  console.log(
    "版本号需要符合语义化版本（Semantic Versioning）规范，例如1.0.0、1.0.1、1.1.0等格式。"
  );
  process.exit(1);
}


//获取当前命令行上下文路径
const currentDirectory = process.cwd();

// 获取 package.json 文件中的版本号
const packageJsonPath = path.join(currentDirectory, "package.json");
const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
const packageJson = JSON.parse(packageJsonContent);
const currentVersion = packageJson.version;

// 更新 package.json 文件中的版本号
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`version: ${currentVersion} -> ${newVersion}`);
