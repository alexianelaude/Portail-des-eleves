import { AssociationHome } from "../pages/associations/home";
import { AssociationShowPage } from "../pages/associations/page/show";
import { AssociationCreatePage, AssociationEditPage } from "../pages/associations/page/edit";

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
    }
];
