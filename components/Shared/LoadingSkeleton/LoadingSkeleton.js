import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingSkeleton = () => {
    return (
        <div>
            <Skeleton height={50} width={200} />
            <Skeleton count={5} />
        </div>
    );
};

export default LoadingSkeleton;