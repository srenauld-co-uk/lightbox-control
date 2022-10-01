import axios from 'axios';
import * as actions from './actions/log-in';
import { HtmlClient } from './html-client';
describe('HtmlClient', () => {
    describe('logIn()', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        })
        it('Properly logs in before attempting a use case', async () => {
            
            jest.spyOn(actions, 'logIn').mockImplementation(async () => 'foobar');

            class TempClient extends HtmlClient {}

            const credentials = { email: 'foo@bar.com', password: 'foobar'};
            const client = new TempClient(axios.create({ baseURL: 'http://foo.bar'}));

            client.setCredentials(credentials);
            await client.logIn();
            expect(actions.logIn).toHaveBeenCalledWith(expect.anything(), credentials, expect.anything());
            
        })
    })
})