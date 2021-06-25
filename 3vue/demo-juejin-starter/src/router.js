import { LIST_TYPE} from './store';

export const routes = [
  {
    name: LIST_TYPE.TOP,
    path: `${LIST_TYPE.TOP}`,
    component: () => import("./views/UTopic.vue"),
    props: { type: LIST_TYPE.TOP}
  }
];


