interface D1RemoteResponse {
    success: boolean;
    results: any[];
    meta: any;
}

const PROXY_URL = process.env.D1_PROXY_URL;
const API_KEY = process.env.D1_PROXY_API_KEY;

export async function queryRemoteD1(sql: string, params: any[] = []): Promise<D1RemoteResponse> {

    if (!PROXY_URL || !API_KEY) {
        throw new Error('D1 proxy server url or API key is not configured correctly.');
    }

    const response = await fetch(`${PROXY_URL}/api/all`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ sql, params })
    });

    if (!response.ok) {
        throw new Error(`D1 Proxy Error: ${response.statusText}`);
    }

    const data = await response.json() as D1RemoteResponse;

    return {
        success: data.success,
        results: data.results || [],
        meta: data.meta
    };
}

export async function executeRemoteD1(sql: string, params: any[] = []): Promise<any> {

    if (!PROXY_URL || !API_KEY) {
        throw new Error('D1_PROXY_URL and D1_PROXY_API_KEY not configured');
    }

    const response = await fetch(`${PROXY_URL}/api/exec`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ sql, params })
    });

    if (!response.ok) {
        throw new Error(`D1 Proxy Error: ${response.statusText}`);
    }

    return response.json();
}

export function createProxyD1Database(): D1Database {
    return {
        prepare(sql: string) {
            const boundParams: any[] = [];
            const statement = {
                bind(...params: any[]) {
                    boundParams.push(...params);
                    return statement;
                },
                async all() {
                    const result = await queryRemoteD1(sql, boundParams);

                    return {
                        success: result.success,
                        results: result,
                        meta: result.meta
                    };
                },
                async run() {
                    return await executeRemoteD1(sql, boundParams);
                },
                async raw() {
                    const result = await queryRemoteD1(sql, boundParams);
                    return result.results.map((row: any) => Object.values(row));
                },
                async values() {
                    return await statement.raw();
                }
            };

            return statement as any;
        },
        async exec(sql: string) {
            await queryRemoteD1(sql, []);
        }
    } as unknown as D1Database;
}