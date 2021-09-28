import Vue from 'vue'

import {
    Button,
    Message,
    Container,
    Aside,
    Main,
    Footer,
    Header,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Image,
    Scrollbar,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Avatar,
    Input,
    Tag,
<<<<<<< HEAD
    Carousel,
    CarouselItem
=======
    Tabs,
    TabPane
>>>>>>> singer


} from 'element-ui'

Vue.use(Button)
Vue.use(Tag)
<<<<<<< HEAD
Vue.use(Carousel)
Vue.use(CarouselItem)
=======
Vue.use(Tabs)
Vue.use(TabPane)
>>>>>>> singer
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(BreadcrumbItem)
Vue.use(Pagination)
Vue.use(Scrollbar)
Vue.use(Image)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)


Vue.prototype.$message = Message