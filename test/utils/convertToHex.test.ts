// allow usage of env
import dotenv from 'dotenv';
dotenv.config();

import { describe } from '@jest/globals';
import { convertToHex } from '../../src/utils/convertToHex';

describe('convertToHex', () => {
  it('should convert a utf8 string to hex encoded', async () => {
    const input = 'Hello, World!';
    const hexString = convertToHex(input);
    expect(hexString).toBe('0x48656c6c6f2c20576f726c6421');
  });

  it('should convert a hex encoded string to hex encoded -- pass through', async () => {
    const input = '0x48656c6c6f2c20576f726c6421';
    const hexString = convertToHex(input);
    expect(hexString).toBe('0x48656c6c6f2c20576f726c6421');
  });

  it('should convert a uint8array to hex encoded', async () => {
    const input = new Uint8Array([1, 2, 3]);
    const hexString = convertToHex(input);
    expect(hexString).toBe('0x010203');
  });

  it('should convert a string with unicode characters to hex encoded', async () => {
    const input = `Only sign this request if you\u2019ve initiated an action with Immutable X.`;
    const hexString = convertToHex(input);
    const input2 = 'Only sign this request if you’ve initiated an action with Immutable X.';
    const hexString2 = convertToHex(input2);
    expect(hexString).toBe(hexString2);
  });
});
