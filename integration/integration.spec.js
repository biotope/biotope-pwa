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
    expect(responseWithEmpty).to.eq(responseInitial + cmd.out.removeLines(4) + cmd.out.setGreen() + responseInitial);
  })

  describe('push notifications', () => {
    it('asks the user for a path to put service worker', async () => {
      const responseWithPush = await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER
      ]);
      expect(responseWithPush).to.contain('Where should we put the service worker?');
    })

    it('asks the user for a path to put service worker', async () => {
      const responseWithPush = await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER
      ]);
      expect(responseWithPush).to.contain('Where should we put the service worker?');
    })

    it('asks the user for the product name', async () => {
      const responseWithPush = await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithPush).to.contain("What's the name of your product?");
    })

    it('asks for a path to an icon', async () => {
      const responseWithPush = await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithPush).to.contain("Path to your app icon?");
    })

    it('creates a registration file', async () => {
      await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        testFolder,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER
      ]);
      expect(testFolder).to.be.a.directory();
      expect(testFolder + '/register.js').to.be.a.file();
    }).timeout(3000)

    it('creates a worker file', async () => {
      await cli.execute([], [
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        testFolder,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER
      ]);
      expect(testFolder).to.be.a.directory();
      expect(testFolder + '/serviceworker.js').to.be.a.file();
    }).timeout(3000)
  })

  describe('offline worker', () => {
    it('asks the user for a path to put service worker', async () => {
      const responseWithPush = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER
      ]);
      expect(responseWithPush).to.contain('Where should we put the service worker?');
    })

    it('asks the user for a product name', async () => {
      const responseWithPush = await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(responseWithPush).to.contain("What's the name of your product?");
    })

    it('creates a registration file', async () => {
      await cli.execute([], [
        cmd.PRESS.DOWN,
        cmd.PRESS.SPACE,
        cmd.PRESS.ENTER,
        testFolder,
        cmd.PRESS.ENTER,
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
        testFolder,
        cmd.PRESS.ENTER,
        cmd.PRESS.ENTER,
      ]);
      expect(testFolder).to.be.a.directory();
      expect(testFolder + '/serviceworker.js').to.be.a.file();
    }).timeout(3000)
  })
});