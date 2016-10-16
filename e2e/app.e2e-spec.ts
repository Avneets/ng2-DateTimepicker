import { Ng2DateTimepickerPage } from './app.po';

describe('ng2-date-timepicker App', function() {
  let page: Ng2DateTimepickerPage;

  beforeEach(() => {
    page = new Ng2DateTimepickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
