import { AssociationHome } from "../pages/associations/Home";
import { AssociationShowPage } from "../pages/associations/page/Show";
import {
    AssociationCreatePage,
    AssociationEditPage
} from "../pages/associations/page/Edit";
import { AssociationFilesystemList } from "../pages/associations/files/List";
import { AssociationFilesystemDetail } from "../pages/associations/files/Detail";
import { AssociationFilesystemEdit } from "../pages/associations/files/Edit";
import { AssociationFilesystemUpload } from "../pages/associations/files/Upload";
import { AssociationMarketplaceHome } from "../pages/associations/marketplace/Home";
import { AssociationMarketplaceHistory } from "../pages/associations/marketplace/History";

export const routes = association => [
    {
        path: `/`,
        component: AssociationHome,
        exact: true,
        props: { association: association }
    },
    {
        path: `/pages/new`,
        component: AssociationCreatePage,
        exact: true,
        props: { association: association }
    },
    {
        path: `/pages/:pageId`,
        component: AssociationShowPage,
        exact: true,
        props: { association: association }
    },
    {
        path: `/pages/:pageId/edit`,
        component: AssociationEditPage,
        exact: true,
        props: { association: association }
    },

    {
        path: `/files`,
        component: AssociationFilesystemList,
        exact: true,
        props: { association: association }
    },
    {
        path: `/files/upload`,
        component: AssociationFilesystemUpload,
        exact: true,
        props: { association: association }
    },
    {
        path: `/files/:fileId`,
        component: AssociationFilesystemDetail,
        exact: true,
        props: { association: association }
    },
    {
        path: `/files/:fileId/edit`,
        component: AssociationFilesystemEdit,
        exact: true,
        props: { association: association }
    },

    {
        path: `/marketplace`,
        component: AssociationMarketplaceHome,
        exact: true,
        props: { association: association }
    },

    {
        path: `/marketplace/history`,
        component: AssociationMarketplaceHistory,
        exact: true,
        props: { association: association }
    },
];
