import Vue from 'vue'
import VueRouter from 'vue-router'



//import Login from '../views/login.vue'
const Login = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../views/login.vue')
    //import Home from '../views/Home.vue'
const Home = () =>
    import ( /* webpackChunkName: "home" */ '../views/Home.vue')
    //import Song_list from '../components/song-list/song-list.vue'
const Song_list = () =>
    import ( /* webpackChunkName: "song-list" */ '../components/song-list/song-list.vue')
    //import Song_list_Detail from '../components/song-list/song-list-detail.vue'
const Song_list_Detail = () =>
    import ( /* webpackChunkName: "song-list" */ '../components/song-list/song-list-detail.vue')
    //import userInfo from '../components/userInfo/userInfo.vue'
const userInfo = () =>
    import ( /* webpackChunkName: "userInfo" */ '../components/userInfo/userInfo.vue')
    //import Mysong_list_detail from '../components/songlist.vue'
const Mysong_list_detail = () =>
    import ( /* webpackChunkName: "song-list" */ '../components/songlist.vue')
    //import SearchItem from '../components/search/searchItem.vue'
const SearchItem = () =>
    import ( /* webpackChunkName: "search" */ '../components/search/searchItem.vue')
    //import Singer from '../components/singer/singer.vue'
const Singer = () =>
    import ( /* webpackChunkName: "singer" */ '../components/singer/singer.vue')
    //import Mv from '../components/mv/mv.vue'
const Mv = () =>
    import ( /* webpackChunkName: "mv" */ '../components/mv/mv.vue')
    //import MvPlay from '../components/mv/mvPlay.vue'
const MvPlay = () =>
    import ( /* webpackChunkName: "mv" */ '../components/mv/mvPlay.vue')
    //import MusicDetail from '../components/musicDetails/detail.vue'
const MusicDetail = () =>
    import ( /* webpackChunkName: "detaile" */ '../components/musicDetails/detail.vue')
    //import StartInterface from '../components/startInterface/startInterface.vue'
const StartInterface = () =>
    import ( /* webpackChunkName: "home" */ '../components/startInterface/startInterface.vue')
    //import SongListZhuan from '../components/song-list/songListZhuan.vue'
const SongListZhuan = () =>
    import ( /* webpackChunkName: "song-list" */ '../components/song-list/songListZhuan.vue')
    //import vedio from '../components/video/vedio.vue'
const vedio = () =>
    import ( /* webpackChunkName: "vedio" */ '../components/video/vedio.vue')
    //import vedioFace from '../components/video/vedioface.vue'
const vedioFace = () =>
    import ( /* webpackChunkName: "vedio" */ '../components/video/vedioface.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/login',
    component: Login
}, {
    path: '/home',
    component: Home,
    redirect: '/StartInterface/',
    children: [{
            path: '/song_list/:name',
            component: Song_list,
            props: true
        }, {
            path: '/song_list_detail/:id',
            component: Song_list_Detail,
            props: true
        }, {
            path: '/userInfo/',
            component: userInfo

        }, {
            path: '/Mysong_list_detail/:id',
            component: Mysong_list_detail,
            props: true
        }, {
            path: '/searchMusic/',
            component: SearchItem,
            props: true
        },
        {
            path: '/singer/',
            component: Singer,
        },
        {
            path: '/mv/',
            component: Mv,
        },
        {
            path: '/mvPlay/:id',
            component: MvPlay,
            props: true
        },
        {
            path: '/StartInterface/',
            component: StartInterface,

        },
        {
            path: '/musicDetail/',
            component: MusicDetail,

        },
        {
            path: '/zhuanSongList/:id',
            component: SongListZhuan,
            props: true
        },
        {
            path: '/vedio/:id',
            component: vedio,
            props: true
        },
        {
            path: '/vedioface/',
            component: vedioFace,

        },
    ]
}]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) return next('/login')
    next()
})
export default router