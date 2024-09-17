
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <h2>Admin layout</h2>
            {children}
        </div>
    );
};

export default layout;