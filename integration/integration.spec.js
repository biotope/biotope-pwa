const chai = require('chai');
chai.use(require('chai-fs'));
const expect = chai.expect;
const cmd = require('./cmd');
const cli = cmd.create(__dirname + '/mock.js');
const rimraf = require('rimraf');

const testFolder = 'integration/testing';

describe('pwa', () => {
  afterEach(async () => {  
    rimraf(testFolder, () => {});
  });

  it('asks the user for features', async () => {
    const response = await cli.execute();
    expect(response).to.contain('Which features do you want');
  })

  it('does not allow empty feature request', async () => {
    const responseInitial = await cli.execute();
    const responseWithEmpty = await cli.execute([], [
      cmd.PRESS.ENTER
    ]);
    expect(responseWithEmpty).to.eq(responseInitial + cmd.out.removeLines(5) + cmd.out.setGreen() + responseInitial);
  })

  describe('push notifications', () => {
    it('asks the user for the product name', async () => {
      const responseWithPush = await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER
      ]);
      expect(responseWithPush).to.contain("What's the name of your product?");
    })

    it('asks for a path to an icon', async () => {
      const responseWithPush = await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithPush).to.contain("icon");
    })

    it('asks the user for the path to put the workers', async () => {
      const responseWithPush = await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithPush).to.contain('Where should we put the service worker?');
    })
    

    it('creates a registration file', async () => {
      await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        testFolder,
        cmd.PRESS.ENTER
      ]);
      expect(testFolder).to.be.a.directory();
      expect(testFolder + '/register.js').to.be.a.file();
    }).timeout(3000)

    it('creates a worker file', async () => {
      await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        testFolder,
        cmd.PRESS.ENTER
      ]);
      expect(testFolder).to.be.a.directory();
      expect(testFolder + '/serviceworker.js').to.be.a.file();
    }).timeout(3000)
  })

  describe('offline worker', () => {
    it('asks the user for a product name', async () => {
      const responseWithOffline = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithOffline).to.contain("What's the name of your product?");
    })

    it('asks the user for a path to put service worker', async () => {
      const responseWithOffline = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithOffline).to.contain('Where should we put the service worker?');
    })

    it('creates a registration file', async () => {
      await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        testFolder,
        cmd.PRESS.ENTER,
      ]);
      expect(testFolder).to.be.a.directory();
      expect(testFolder + '/register.js').to.be.a.file();
    }).timeout(3000)

    it('creates a worker file', async () => {
      await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        testFolder,
        cmd.PRESS.ENTER,
      ]);
      expect(testFolder).to.be.a.directory();
      expect(testFolder + '/serviceworker.js').to.be.a.file();
    }).timeout(3000)
  })

  describe('manifest', () => {
    it('asks the user for a product name', async () => {
      const responseWithManifest = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithManifest).to.contain("What's the name of your product?");
    })

    it('asks the user for a display value with the four possible values', async () => {
      const responseWithManifest = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithManifest).to.contain('display');
      expect(responseWithManifest).to.contain('browser');
      expect(responseWithManifest).to.contain('minimal-ui');
      expect(responseWithManifest).to.contain('fullscreen');
      expect(responseWithManifest).to.contain('standalone');
    })

    it('asks the user for an orientation with the three possible values', async () => {
      const responseWithManifest = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithManifest).to.contain('orientation');
      expect(responseWithManifest).to.contain('any');
      expect(responseWithManifest).to.contain('portrait');
      expect(responseWithManifest).to.contain('landscape');
    }).timeout(3000)

    it('asks the user for a theme color', async () => {
      const responseWithManifest = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithManifest).to.contain('theme color');
    }).timeout(3000)

    it('asks the user for a background color', async () => {
      const responseWithManifest = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithManifest).to.contain('background color');
    }).timeout(3000)

    it('asks the user for an 192 icon', async () => {
      const responseWithManifest = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithManifest).to.contain('192x192');
      expect(responseWithManifest).to.contain('icon');
    }).timeout(3000)

    it('asks the user for an 512 icon', async () => {
      const responseWithManifest = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithManifest).to.contain('512x512');
      expect(responseWithManifest).to.contain('icon');
    }).timeout(3000)

    it('asks the user for an entry point', async () => {
      const responseWithManifest = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithManifest).to.contain('Which page should be initially opened?');
    }).timeout(3000)

    it('asks the user for the path to put the manifest', async () => {
      const responseWithManifest = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithManifest).to.contain('Where should we put the manifest.json?');
    }).timeout(3000)

    it('creates a manifest file', async () => {
      await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        testFolder,
        cmd.PRESS.ENTER,
      ]);
      expect(testFolder).to.be.a.directory();
      expect(testFolder + '/manifest.json').to.be.a.file();
    }).timeout(3000)
  })
});