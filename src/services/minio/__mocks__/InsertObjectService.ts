/* eslint-env jest */
export default jest.fn().mockImplementation(async () => await Promise.resolve(true));
