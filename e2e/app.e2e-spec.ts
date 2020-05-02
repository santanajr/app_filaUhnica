import { CursoangularPage } from './app.po';

describe('cursoangular App', () => {
  let page: CursoangularPage;

  beforeEach(() => {
    page = new CursoangularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
