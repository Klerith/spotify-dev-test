import { SpotiappPage } from './app.po';

describe('spotiapp App', () => {
  let page: SpotiappPage;

  beforeEach(() => {
    page = new SpotiappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
