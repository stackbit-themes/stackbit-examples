import * as React from 'react';

// Draw the given children inside a "terminal window" visual element
export function TerminalWindow(props) {
    // Adapted from https://tailwindcomponents.com/component/terminal
    return (
        <div className="justify-center">
            <div
                className="coding px-3 pt-4 pb-6 shadow-lg text-gray-100 text-lg font-mono
                             bg-gray-800 rounded-lg overflow-hidden"
            >
                <div className="top mb-2 flex">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="ml-2 h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="mt-4 flex">
                    <p className="flex-1 typing items-center pl-2">
                        {props.children}
                    </p>
                </div>
            </div>
        </div>
    );
}
