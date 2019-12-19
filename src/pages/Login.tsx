import React from 'react';
import Auth from '../base/auth/Auth';
import Layout from '../base/layout/Layout';
import HeadTag from '../base/_common/HeadTag';

const Login = () => (
    <Layout>
        <HeadTag title="Login" />
        <Auth />
    </Layout>
);

export default Login;
