const semver = require('semver');

function getConsoleHostingPluginInfo(context) {
  let result;
  const pluginInfos = context.pluginPlatform.plugins['hosting'].filter(pluginInfo => {
    return pluginInfo.packageName === 'amplify-console-hosting';
  });

  if (pluginInfos.length > 0) {
    result = pluginInfos[0];
    let i = 1;
    while (i < pluginInfos.length) {
      if (semver.compare(result.packageVersion, pluginInfos[i].packageVersion) < 0) {
        result = pluginInfos[i];
      }
      i++;
    }
  }

  return result;
}

module.exports = {
  getConsoleHostingPluginInfo,
};
