import { Input } from '../../../domain/input';
import { constructMockPluginPlatform } from './mock-plugin-platform';
import { constructContext } from '../../../context-manager';
import { getConsoleHostingPluginInfo } from '../../../extensions/amplify-helpers/get-console-hosting-pluginInfo';

test('getCategoryPluginInfo', () => {
  const mockPluginPlatform = constructMockPluginPlatform();
  const mockProcessArgv = [
    '/Users/userName/.nvm/versions/node/v12.16.1/bin/node',
    '/Users/userName/.nvm/versions/node/v12.16.1/bin/amplify',
    'hosting',
    'add',
  ];

  const mockInput = new Input(mockProcessArgv);
  const mockContext = constructContext(mockPluginPlatform, mockInput);
  const consoleHostingPluginInfo = getConsoleHostingPluginInfo(mockContext);
  expect(consoleHostingPluginInfo).toBeDefined();
});
