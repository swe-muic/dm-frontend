/* eslint-env jest */

import getBackgroundColor from './NavBarBackGroundSelector';

describe('getBackgroundColor', () => {
	it('should return #043551 when page is home', () => {
		const page = 'home';
		const result = getBackgroundColor(page);
		expect(result).toEqual('#043551');
	});

	it('should return #494B4D when page is not home', () => {
		const page = 'about';
		const result = getBackgroundColor(page);
		expect(result).toEqual('#494B4D');
	});
});
