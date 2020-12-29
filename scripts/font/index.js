/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 字体目录
const fontBasePath = path.join(process.cwd(), 'public', 'font');

const logError = (msg) => console.log(chalk.red('[font-error:]'), msg);
const logSuccess = (msg) => console.log(chalk.green('[font-success:]'), msg);
const logInfo = (msg) => console.log('[font-info:]', msg);

/**
 * 静态资源字体文件版本所在的config文件
 */
const getConfigPath = () => {
  const configPath = path.join(process.cwd(), 'src', 'config', 'index.ts');

  if (!fs.existsSync(configPath)) {
    logError(`Can not find config file in '${configPath}'`);
    process.exit(0);
  }
  return configPath;
};

// 无用文件集合
const unlessFileList = ['demo_index.html', 'demo.css', 'iconfont.js', 'iconfont.json'];
// icon相关文件
const iconFileList = [
  'iconfont.css',
  'iconfont.eot',
  'iconfont.svg',
  'iconfont.ttf',
  'iconfont.woff',
  'iconfont.woff2',
];

const unlinkAllFilesAndDir = (dir) => {
  if (!fs.existsSync(dir)) {
    return;
  }
  const files = fs.readdirSync(path.join(dir));
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    fs.unlinkSync(filePath);
  });
  fs.rmdirSync(dir);
};

const rmExistsIconFont = () => {
  const files = fs.readdirSync(fontBasePath);
  files.forEach((file) => {
    const filePath = path.join(fontBasePath, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      unlinkAllFilesAndDir(filePath);
    }
  });
};

/**
 * 移动字体文件
 * @param {*} version
 */
const moveFontFile = (version) => {
  const newVersionPath = path.join(fontBasePath, version);

  logInfo(`start move file to '${newVersionPath}'`);
  try {
    if (!fs.existsSync(newVersionPath)) {
      logInfo(`create dir ${newVersionPath}`);
      fs.mkdirSync(newVersionPath);
    }
    iconFileList.forEach((fileName) => {
      fs.copyFileSync(path.join(fontBasePath, fileName), path.join(newVersionPath, fileName));
    });
    logSuccess(`move iconfont files to '${newVersionPath}' successfully`);
  } catch (error) {
    logError(error);
  }
};

/**
 * 删除无用文件
 */
const rmUnlessFiles = () => {
  [...iconFileList, ...unlessFileList].forEach((fileName) => {
    fs.unlinkSync(path.join(fontBasePath, fileName));
  });
};

/**
 * 更新主工程字体版本
 * @param {*} version
 */
const upgradeFontVersion = (version) => {
  const configPath = getConfigPath();
  try {
    logInfo(`start upgrade icon version to '${version}' in '${configPath}'`);
    const stream = fs.readFileSync(configPath, 'utf-8');
    const result = stream.replace(/iconfont: '\s*(\w*)'/, `iconfont: '${version}'`);
    fs.writeFileSync(configPath, result, 'utf8');
    logSuccess(`upgrade icon version successfully`);
  } catch (err) {
    logError(err);
  }
};

/**
 * 获取iconfont.json内容
 */
const getIconfontJson = () => {
  // 字体描述文件
  const iconJsonName = 'iconfont.json';

  // 最新字体描述文件
  let iconfontJson;
  try {
    // 最新字体描述文件
    iconfontJson = require(path.join(fontBasePath, iconJsonName));
  } catch (e) {
    logError(`Can not find '${iconJsonName}' in '${fontBasePath}', please check it`);
    process.exit(0);
  }
  return iconfontJson;
};

/**
 * 根据内容转md5
 * @param {*} content
 */
const content2md5 = (content) => {
  return crypto.createHash('md5').update(content).digest('hex');
};

/**
 * 根据iconfont.json通过md5生成文件版本号
 */
const generateNewVersionNo = () => {
  const iconfontJson = getIconfontJson();
  return content2md5(JSON.stringify(iconfontJson));
};

/**
 * 升级字体
 * @param {*} version
 */
const upgradeFont = (version) =>
  new Promise((resolve) => {
    rmExistsIconFont();
    moveFontFile(version);
    rmUnlessFiles();
    upgradeFontVersion(version);
    resolve();
  });

const newVersion = generateNewVersionNo();
upgradeFont(newVersion).then(() => {
  logSuccess(`The new font version is: ${newVersion}`);
});
