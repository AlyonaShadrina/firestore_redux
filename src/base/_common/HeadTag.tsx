import React from 'react';
import { Helmet } from 'react-helmet';


const DEFAULT_PAGE_TITLE = 'todo:';
const DEFAULT_HEAD_DESCRIPTION = 'React, Redux, TypeScript, Firebase, Firestore, CircleCI, PWA';

type OwnProps = {
    title?: string;
    description?: string;
};

const HeadTag = ({ title, description = DEFAULT_HEAD_DESCRIPTION }: OwnProps) => (
    <Helmet>
        <title>
            {
                title ? `${title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE
            }
        </title>
        <meta
            key="description"
            name="description"
            content={description}
        />
        {/* <link */}
        {/*    rel="shortcut icon" */}
        {/*    href={logoShort} */}
        {/* /> */}
    </Helmet>
);

export default HeadTag;
