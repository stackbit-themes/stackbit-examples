import { flattenObject } from '@/utils/flatten-object';
import { getNestedProperty } from '@/utils/get-nested-property';
import { MiddlewareRequest, MiddlewareResponse } from '@netlify/next';
import contentCache from 'content-cache' assert { type: 'json' };
import { NextRequest, NextResponse } from 'next/server';
import { Page, Test } from './content/content-types';

declare global {
    var Netlify: any;
}

export async function middleware(nextRequest: NextRequest) {
    // Only run this middleware on Netlify (or in netlify dev)
    if (typeof Netlify === 'undefined') return NextResponse.next();
    // Don't run this middleware in editor mode
    if (process.env.STACKBIT_PREVIEW === 'true') return NextResponse.next();
    // ---
    const pathname = nextRequest.nextUrl.pathname;
    const middlewareRequest = new MiddlewareRequest(nextRequest as any);

    // Get current page for the given URL path.
    const page = contentCache.pages.find((page) => page.urlPath === pathname) as Page;
    // Escape if we can't find a page for the given URL path.
    if (!page) return NextResponse.next();
    // Identify property paths for tests on the page
    const pageProperties = flattenObject(page);
    const propertyPathsToTests = pageProperties.filter((p) => p.path.endsWith('.type') && p.value === 'test').map((p) => p.path.replace(/\.type$/, ''));
    // Collect the tests for the page, along with the component they're testing
    const pageTests = propertyPathsToTests.map((propertyPath) => {
        const test = getNestedProperty(page, propertyPath) as Test;
        const componentPath = propertyPath.replace(/\.tests\.\d$/, '') + `.${test.field}`;
        return { test, componentPath };
    });
    // Init edge function response
    const response = await middlewareRequest.next();
    // Set test content on the page for each test
    for (const { test, componentPath } of pageTests) {
        console.log('[PageTest] Implementing page test:', test.id);
        setTestContent({ request: nextRequest, response, test, componentPath, page });
    }
    // Return the manipulated response
    return response;
}

/* ----- Content Swapper ----- */

type TestContentOptions = {
    request: NextRequest;
    response: MiddlewareResponse;
    page: Page;
    componentPath: string;
    test: Test;
};

function setTestContent({ request, response, test, page, componentPath }: TestContentOptions) {
    console.log('[PageTest] Setting test content:', test.id);
    // Look for cookie using the page test's ID
    let cookie = request.cookies.get(test.id);
    let value: string;
    // Find the existing cookie value by checking the type of the cookie.
    // Locally, the cookie is a string. On Netlify, the cookie is an object.
    let cookieValue;
    if (cookie) cookieValue = typeof cookie === 'string' ? cookie : cookie.value;
    // Use the value stored in the cookie if it matches one of the
    // test.values
    if (cookieValue && cookieValue.length > 0 && test.values.includes(cookieValue)) {
        console.log(`[PageTest] Found cookie (${test.name}):`, cookieValue);
        value = cookieValue;
    } else {
        console.log(`[PageTest] No cookie found (${test.name}). Choosing random value ...`);
        // Get random value from test.values
        value = test.values[Math.floor(Math.random() * test.values.length)];
        // Store value in cookie
        response.cookies.set(test.id, value);
        console.log(`[PageTest] Chose and stored cookie (${test.name}):`, value);
    }
    // Replace the content inside the existing component with the new value
    response.rewriteHTML(`[data-testable-id="${test.id}"]`, {
        element: (element) => {
            element.setInnerContent(value);
        }
    });
    // Set the new value on the page object by using the componentPath.
    set(page, componentPath, value);
    // Transform the response to include the new page props
    response.transformData((data: any) => {
        // This is a little weird -> Our page layout has a `pageProps` property,
        // but the data object from Netlify also has a `pageProps` property. So
        // one is nested inside the other.
        return {
            ...data,
            pageProps: {
                ...data.pageProps,
                pageProps: { ...data.pageProps.pageProps, page }
            }
        };
    });
}

/* ----- Helpers ----- */

/**
 * Uses dot notation to set a deeply-nested value on an object.
 *
 * Source: https://stackoverflow.com/a/18937118/114157
 */
function set(obj: { [key: string]: any }, path: string, value: string) {
    var schema = obj; // a moving reference to internal objects within obj
    var pList = path.split('.');
    var len = pList.length;
    for (var i = 0; i < len - 1; i++) {
        var elem = pList[i];
        if (!schema[elem]) schema[elem] = {};
        schema = schema[elem];
    }
    schema[pList[len - 1]] = value;
}
