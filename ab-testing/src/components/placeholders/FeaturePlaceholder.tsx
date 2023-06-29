const FeatureBlock: React.FC = () => {
    return (
        <div className="flex items-start space-x-8">
            <div className="w-10 h-10 rounded-md bg-fuchsia-500"></div>
            <div className="flex-1">
                <div className="w-[40%] h-4 mb-6 bg-gray-500 rounded-full" />
                <div className="w-[80%] h-3 mb-4 bg-gray-400 rounded-full" />
                <div className="w-[90%] h-3 mb-4 bg-gray-400 rounded-full" />
                <div className="w-[74%] h-3 mb-4 bg-gray-400 rounded-full" />
                <div className="w-[54%] h-3 mb-4 bg-gray-400 rounded-full" />
            </div>
        </div>
    );
};

export const FeaturePlaceholder: React.FC = () => {
    return (
        <div className="px-8 opacity-25 py-52">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center max-w-xl mx-auto mb-28">
                    <div className="h-3 mb-6 rounded-full w-28 bg-fuchsia-500" />
                    <div className="w-full h-5 mb-12 bg-gray-500 rounded-full" />
                    <div className="w-[82%] h-3 mb-6 bg-gray-500 rounded-full" />
                    <div className="w-[92%] h-3 bg-gray-500 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-16">
                    <FeatureBlock />
                    <FeatureBlock />
                    <FeatureBlock />
                    <FeatureBlock />
                </div>
            </div>
        </div>
    );
};
