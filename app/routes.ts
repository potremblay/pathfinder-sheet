import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route("character", "routes/character/index.tsx"),
] satisfies RouteConfig;
