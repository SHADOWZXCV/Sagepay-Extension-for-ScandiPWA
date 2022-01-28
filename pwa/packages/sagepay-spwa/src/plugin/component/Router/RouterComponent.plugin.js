/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
import {
    lazy
} from 'react';
import { Route } from 'react-router-dom';

import { MY_SAVED_CREDIT_CARDS } from '../../route/MyAccount/MyAccountPlugin.config';

export const MyAccount = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "account" */ 'SourceRoute/MyAccount'));

export const MY_SAVED_CREDIT_CARDS_NAME = 'My Saved Credit Cards';
const withStoreRegex = (path) => window.storeRegexText.concat(path);

export const SWITCH_ITEMS_TYPE = (originalMember) => [
    ...originalMember,
    {
        component: <Route path={ withStoreRegex('/saved-credit-cards') } render={ (props) => <MyAccount { ...props } selectedTab={ MY_SAVED_CREDIT_CARDS } /> } />,
        position: 77,
        name: MY_SAVED_CREDIT_CARDS_NAME
    }
];

export default {
    'Component/Router/Component': {
        'member-property': {
            SWITCH_ITEMS_TYPE
        }
    }
};
