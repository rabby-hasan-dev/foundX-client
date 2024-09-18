
import Container from '@/src/components/UI/Container';
import Sidebar from '@/src/components/UI/Sidebar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container>
            <div className="my-3 flex w-full gap-12">
                <div className="w-2/5">
                    <Sidebar />
                </div>
                <div className="w-4/5">{children}</div>
            </div>
        </Container>
    );
};

export default layout;