import axios from 'axios';
import AbstractStardustAPI from '../../src/stardust/AbstractStardustAPI';
import { HttpStatusCode } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const baseUrl = 'https://custodial-wallet.stardust.gg';
describe('AbstractStardustAPI', () => {
  let api: AbstractStardustAPI;

  beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.post.mockReset();
    api = new AbstractStardustAPI('test-api-key');
  });

  it('should call axios.get with the correct params', async () => {
    mockedAxios.get.mockResolvedValue({ status: HttpStatusCode.Ok, data: {} });
    await api.apiGet('endpoint', { query: 'test' });
    expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/endpoint`, {
      headers: { 'x-api-key': 'test-api-key' },
      params: { query: 'test' },
    });
  });

  it('should throw an error if the response status is not 200 on get', async () => {
    mockedAxios.get.mockResolvedValue({ status: HttpStatusCode.BadRequest, data: {} });
    await expect(api.apiGet('endpoint')).rejects.toThrow(
      'Failed to GET from endpoint with query: {}'
    );
  });

  it('should call axios.post with the correct params', async () => {
    const postData = { postDataKey: 'postDataValue' };
    mockedAxios.post.mockResolvedValue({ status: HttpStatusCode.Created, data: postData });
    const resp = await api.apiPost('endpoint', postData);
    expect(mockedAxios.post).toHaveBeenCalledWith(`${baseUrl}/endpoint`, postData, {
      headers: { 'x-api-key': 'test-api-key' },
    });
    expect(resp).toEqual(postData);
  });

  it('should throw an error if the response status is not 200 on post', async () => {
    mockedAxios.post.mockResolvedValue({ status: HttpStatusCode.BadRequest, data: {} });
    await expect(api.apiPost('endpoint')).rejects.toThrow(
      'Failed to POST to endpoint with data: {}'
    );
  });

  it('should return data on success for static post', async () => {
    const postData = { postDataKey: 'postDataValue' };
    mockedAxios.post.mockResolvedValue({ status: HttpStatusCode.Created, data: postData });
    const response = await AbstractStardustAPI.Post('endpoint', postData, 'test-api-key');
    expect(response).toEqual(postData);
    expect(mockedAxios.post).toHaveBeenCalledWith(`${baseUrl}/endpoint`, postData, {
      headers: { 'x-api-key': 'test-api-key' },
    });
  });

  it('should throw error on failure for static post', async () => {
    const postData = { postDataKey: 'postDataValue' };
    mockedAxios.post.mockResolvedValue({ status: HttpStatusCode.BadRequest });
    await expect(AbstractStardustAPI.Post('endpoint', postData, 'test-api-key')).rejects.toThrow();
  });
});
