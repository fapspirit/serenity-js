import { JSONObject } from 'tiny-types';

import { JSONData } from './JSONData';

/**
 * @desc
 *  The value of the {@link HTTPRequestResponse} {@link Artifact} describing a HTTP request/response pair.
 *
 * @public
 */
export interface RequestAndResponse extends JSONObject {
    request: {
        url: string;
        method: string;
        headers: Record<string, string | number | boolean>;
        data?: any;
    };
    response: {
        status: number;
        data?: any;
        headers?: Record<string, string> & {
            'set-cookie'?: string[]
        };
    };
}

/**
 * @desc
 *  An {@link Artifact} describing a HTTP request/response pair.
 *
 * @public
 */
export class HTTPRequestResponse extends JSONData {
    static fromJSON(value: RequestAndResponse): HTTPRequestResponse {
        return new HTTPRequestResponse(Buffer.from(JSON.stringify(value, undefined, 0), 'utf8').toString('base64'));
    }
}
